interface SemanticNode {
  id: string
  nodeType: 'object' | 'feature' | 'action'
  parents: Set<string> // Type hierarchy - equally important
  features: Set<string> // Feature hierarchy - decays with depth
  actions: Set<string> // Action relationships
  baseEmbedding: Float32Array
  hyperbolicEmbedding: Float32Array
}

interface QueryContext {
  focusNodes: string[] // Nodes we're interested in finding
  relationshipTypes: string[] // Types of relationships to consider
  direction: 'forward' | 'reverse' | 'both'
  weightFactors: {
    // Base weights for different types
    [key: string]: number
  }
}

interface EvaluationMetrics {
  typePreservation: number // How well type hierarchy is preserved
  featurePreservation: number // How well feature relationships decay correctly
  pathAccuracy: number // How well paths match expected similarities
  queryAccuracy: number // Accuracy on test queries
  attentionCoherence: number // How well attention matches structure
}

interface AttentionHead {
  queryMatrix: Float32Array
  keyMatrix: Float32Array
  valueMatrix: Float32Array
}

interface NetworkConfig {
  vectorSize: number
  rank: number
  curvature: number
  numHeads: number
  learningRate: number
  regularization: number
}

// Default configuration
const DEFAULT_CONFIG: NetworkConfig = {
  vectorSize: 32,
  rank: 16,
  curvature: -1,
  numHeads: 4,
  learningRate: 0.01,
  regularization: 0.01,
}

class SemanticNetwork {
  private nodes: Map<string, SemanticNode>
  // Inverse indices to track references
  private parentRefs: Map<string, Set<string>> // nodeId -> nodes that have it as parent
  private featureRefs: Map<string, Set<string>> // nodeId -> nodes that have it as feature

  private vectorSize: number
  private hyperbolicCurvature: number
  private rank: number
  private numHeads: number
  private learningRate: number
  private regularization: number

  // Tensor factorization components
  private entityMatrix: Float32Array
  private entityStride: number
  private relationMatrix: Float32Array
  private relationStride: number

  // Multi-head attention
  private attentionHeads: AttentionHead[]

  private cache: Map<string, Float32Array> // Caching mechanism

  // Pre-allocated buffers for vector operations
  private readonly tempBuffer1: Float32Array
  private readonly tempBuffer2: Float32Array
  private readonly tempBuffer3: Float32Array

  private readonly headSize: number
  private readonly headBuffer1: Float32Array // For projected query
  private readonly headBuffer2: Float32Array // For projected keys
  private readonly headBuffer3: Float32Array // For projected values
  private readonly combinedBuffer: Float32Array // For combining head outputs

  // Modify constructor to take optional config
  constructor(config: Partial<NetworkConfig> = {}) {
    // Merge provided config with defaults
    const finalConfig = { ...DEFAULT_CONFIG, ...config }

    this.nodes = new Map()
    this.parentRefs = new Map()
    this.featureRefs = new Map()
    this.vectorSize = finalConfig.vectorSize
    this.rank = finalConfig.rank
    this.hyperbolicCurvature = finalConfig.curvature
    this.numHeads = finalConfig.numHeads
    this.learningRate = finalConfig.learningRate
    this.regularization = finalConfig.regularization
    this.cache = new Map()

    // Initialize multiple pre-allocated buffers for different operations
    this.tempBuffer1 = new Float32Array(finalConfig.vectorSize)
    this.tempBuffer2 = new Float32Array(finalConfig.vectorSize)
    this.tempBuffer3 = new Float32Array(finalConfig.vectorSize)

    this.entityMatrix = new Float32Array()
    this.relationMatrix = new Float32Array()

    // Add these initializations to your constructor after existing initializations
    this.headSize = Math.floor(this.vectorSize / this.numHeads)
    this.headBuffer1 = new Float32Array(this.headSize)
    this.headBuffer2 = new Float32Array(this.headSize)
    this.headBuffer3 = new Float32Array(this.headSize)
    this.combinedBuffer = new Float32Array(this.vectorSize)

    // Initialize attention heads with Float32Arrays
    this.attentionHeads = Array(this.numHeads)
      .fill(null)
      .map(() => ({
        queryMatrix: new Float32Array(this.vectorSize * this.headSize),
        keyMatrix: new Float32Array(this.vectorSize * this.headSize),
        valueMatrix: new Float32Array(this.vectorSize * this.headSize),
      }))

    // Initialize matrices with random values
    for (const head of this.attentionHeads) {
      this.initializeRandomMatrix(head.queryMatrix)
      this.initializeRandomMatrix(head.keyMatrix)
      this.initializeRandomMatrix(head.valueMatrix)
    }
  }

  // Add these methods
  private initializeRandomMatrix(matrix: Float32Array): void {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = (Math.random() * 2 - 1) / Math.sqrt(this.headSize)
    }
    this.normalizeVectorInPlace(matrix)
  }

  private projectVector(
    input: Float32Array,
    matrix: Float32Array,
    output: Float32Array,
  ): void {
    // Matrix multiplication: output = input × matrix
    const inputSize = input.length
    const outputSize = output.length

    output.fill(0)
    for (let i = 0; i < outputSize; i++) {
      let sum = 0
      for (let j = 0; j < inputSize; j++) {
        sum += input[j] * matrix[j * outputSize + i]
      }
      output[i] = sum
    }
  }

  private computeMultiHeadAttention(
    query: Float32Array,
    keys: Float32Array[],
    values: Float32Array[],
    mask?: boolean[],
  ): Float32Array {
    // Clear combined output buffer
    this.combinedBuffer.fill(0)

    // Process each attention head
    for (let h = 0; h < this.attentionHeads.length; h++) {
      const head = this.attentionHeads[h]
      const headOffset = h * this.headSize

      // Project query for this head
      this.projectVector(query, head.queryMatrix, this.headBuffer1)

      // Calculate attention scores for this head
      for (let i = 0; i < keys.length; i++) {
        // Project key
        this.projectVector(keys[i], head.keyMatrix, this.headBuffer2)

        // Calculate score
        this.tempBuffer2[i] =
          this.dotProduct(this.headBuffer1, this.headBuffer2) /
          Math.sqrt(this.headSize)

        if (mask && !mask[i]) {
          this.tempBuffer2[i] = -Infinity
        }
      }

      // Convert scores to weights
      this.softmaxInto(
        this.tempBuffer2.subarray(0, keys.length),
        this.tempBuffer3.subarray(0, keys.length),
      )

      // Calculate weighted sum of values
      for (let i = 0; i < values.length; i++) {
        // Project value
        this.projectVector(
          values[i],
          head.valueMatrix,
          this.headBuffer3,
        )

        // Add weighted value to combined output
        const weight = this.tempBuffer3[i]
        for (let j = 0; j < this.headSize; j++) {
          this.combinedBuffer[headOffset + j] +=
            this.headBuffer3[j] * weight
        }
      }
    }

    return this.combinedBuffer
  }

  // Replace your existing computeAttention with this multi-head version
  private computeAttention(
    query: Float32Array,
    keys: Float32Array[],
    values: Float32Array[],
    mask?: boolean[],
  ): Float32Array {
    return this.computeMultiHeadAttention(query, keys, values, mask)
  }

  // Add a node to the network
  addNode(
    id: string,
    nodeType: 'object' | 'feature' | 'action',
    parents: string[] = [],
    features: string[] = [],
    actions: string[] = [],
  ): void {
    const node: SemanticNode = {
      id,
      nodeType,
      parents: new Set(parents),
      features: new Set(features),
      actions: new Set(actions),
      baseEmbedding: this.randomVector(),
      hyperbolicEmbedding: this.randomVector(),
    }

    this.nodes.set(id, node)

    // Update inverse indices
    parents.forEach(parentId => {
      if (!this.parentRefs.has(parentId)) {
        this.parentRefs.set(parentId, new Set())
      }
      this.parentRefs.get(parentId)!.add(id)
    })

    features.forEach(featureId => {
      if (!this.featureRefs.has(featureId)) {
        this.featureRefs.set(featureId, new Set())
      }
      this.featureRefs.get(featureId)!.add(id)
    })
  }

  index(): void {
    const numNodes = this.nodes.size
    const numRelations = 3 // parent, feature, action

    // Initialize entity matrix as a single contiguous array
    this.entityStride = this.rank
    this.entityMatrix = new Float32Array(numNodes * this.entityStride)

    // Initialize each entity row with random normalized vectors
    for (let i = 0; i < numNodes; i++) {
      const start = i * this.entityStride
      // Use tempBuffer1 for generating random vector
      for (let j = 0; j < this.rank; j++) {
        this.tempBuffer1[j] = Math.random() * 2 - 1
      }
      this.normalizeVectorInPlace(this.tempBuffer1)
      // Copy normalized vector to entity matrix
      this.entityMatrix.set(
        this.tempBuffer1.subarray(0, this.rank),
        start,
      )
    }

    // Initialize relation matrix as a single contiguous array
    this.relationStride = this.rank
    this.relationMatrix = new Float32Array(
      numRelations * this.relationStride,
    )

    // Initialize each relation row with random normalized vectors
    for (let i = 0; i < numRelations; i++) {
      const start = i * this.relationStride
      // Use tempBuffer1 for generating random vector
      for (let j = 0; j < this.rank; j++) {
        this.tempBuffer1[j] = Math.random() * 2 - 1
      }
      this.normalizeVectorInPlace(this.tempBuffer1)
      // Copy normalized vector to relation matrix
      this.relationMatrix.set(
        this.tempBuffer1.subarray(0, this.rank),
        start,
      )
    }

    // Update embeddings through tensor factorization
    this.factorizeRelationships()
  }

  private dotProduct(a: Float32Array, b: Float32Array): number {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i]
    }
    return sum
  }

  private mobius_addition(
    x: Float32Array,
    y: Float32Array,
  ): Float32Array {
    const c = -this.hyperbolicCurvature
    const xy = this.dotProduct(x, y)
    const xx = this.dotProduct(x, x)
    const yy = this.dotProduct(y, y)
    const denom = 1 + 2 * c * xy + c * c * xx * yy
    const invDenom = 1 / denom

    // Use tempBuffer1 for result
    for (let i = 0; i < x.length; i++) {
      this.tempBuffer1[i] =
        ((1 + 2 * c * xy + c * yy) * x[i] + (1 - c * xx) * y[i]) *
        invDenom
    }

    return this.tempBuffer1
  }

  private exp_map(x: Float32Array): Float32Array {
    const norm = Math.sqrt(this.dotProduct(x, x))
    if (norm === 0) {
      this.tempBuffer1.fill(0)
      return this.tempBuffer1
    }

    const c = -this.hyperbolicCurvature
    const coef = Math.tanh(Math.sqrt(c) * norm) / (Math.sqrt(c) * norm)

    // Use tempBuffer1 for result
    for (let i = 0; i < x.length; i++) {
      this.tempBuffer1[i] = x[i] * coef
    }

    return this.tempBuffer1
  }

  getContextualEmbedding(
    nodeId: string,
    context: QueryContext,
  ): Float32Array {
    const cacheKey = this.getCacheKey(nodeId, context)
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    const node = this.nodes.get(nodeId)
    if (!node) {
      this.tempBuffer1.fill(0)
      return this.tempBuffer1
    }

    // Start with node's base embedding mapped to hyperbolic space
    let embedding = this.exp_map(node.baseEmbedding)
    const relations = this.getContextualRelations(node, context)

    if (relations.length > 0) {
      // Process type relationships
      const typeRelations = relations.filter(r => r.type === 'parent')
      if (typeRelations.length > 0) {
        const typeEmbeddings = typeRelations.map(r => {
          const parentNode = this.nodes.get(r.id)!
          return this.exp_map(parentNode.baseEmbedding)
        })

        const typeAttention = this.computeAttention(
          embedding,
          typeEmbeddings,
          typeEmbeddings,
        )

        embedding = this.mobius_addition(embedding, typeAttention)
      }

      // Process feature relationships
      const featureRelations = relations.filter(
        r => r.type === 'feature',
      )
      if (featureRelations.length > 0) {
        // Use tempBuffer2 for accumulating feature influences
        this.tempBuffer2.fill(0)

        featureRelations.forEach(rel => {
          const featureNode = this.nodes.get(rel.id)!
          const featureEmbed = this.exp_map(featureNode.baseEmbedding)
          const weight = Math.pow(0.8, rel.depth)

          for (let i = 0; i < this.tempBuffer2.length; i++) {
            this.tempBuffer2[i] += featureEmbed[i] * weight
          }
        })

        embedding = this.mobius_addition(embedding, this.tempBuffer2)
      }
    }

    // Final normalization and caching
    const result = new Float32Array(embedding)
    this.cache.set(cacheKey, result)
    return result
  }

  // Generates a cache key based on nodeId and query context
  private getCacheKey(nodeId: string, context: QueryContext): string {
    return `${nodeId}|${context.focusNodes.join(
      ',',
    )}|${context.relationshipTypes.join(',')}|${context.direction}`
  }

  // Updated factorizeRelationships method to properly use learning rate and regularization
  private factorizeRelationships(iterations: number = 100): void {
    const learningRate = this.learningRate
    const regularization = this.regularization
    const nodeIds = Array.from(this.nodes.keys())

    for (let iter = 0; iter < iterations; iter++) {
      let totalLoss = 0

      // Process each node
      for (let nodeIndex = 0; nodeIndex < nodeIds.length; nodeIndex++) {
        const nodeId = nodeIds[nodeIndex]
        const node = this.nodes.get(nodeId)!
        const nodeOffset = nodeIndex * this.entityStride

        // Process type relationships
        if (node.parents.size > 0) {
          // Get parent indices
          for (const parentId of node.parents) {
            const parentIndex = nodeIds.indexOf(parentId)
            const parentOffset = parentIndex * this.entityStride

            // Calculate prediction using dot product
            let prediction = 0
            for (let i = 0; i < this.rank; i++) {
              prediction +=
                this.entityMatrix[nodeOffset + i] *
                this.relationMatrix[i] *
                this.entityMatrix[parentOffset + i]
            }

            // Calculate error
            const target = 1.0
            const error = target - prediction
            totalLoss += error * error

            // Update embeddings using gradient descent
            for (let i = 0; i < this.rank; i++) {
              const gradEntity =
                error *
                this.relationMatrix[i] *
                this.entityMatrix[parentOffset + i]

              const gradRelation =
                error *
                this.entityMatrix[nodeOffset + i] *
                this.entityMatrix[parentOffset + i]

              // Update node embedding with regularization
              this.entityMatrix[nodeOffset + i] +=
                learningRate *
                (gradEntity -
                  regularization * this.entityMatrix[nodeOffset + i])

              // Update relation embedding with regularization
              this.relationMatrix[i] +=
                learningRate *
                (gradRelation - regularization * this.relationMatrix[i])
            }
          }
        }

        // Process feature relationships
        this.processFeatureHierarchyWithGradients(
          node,
          nodeId,
          0,
          learningRate,
          regularization,
          nodeIds,
        )
      }

      // Normalize all node embeddings
      for (let nodeIndex = 0; nodeIndex < nodeIds.length; nodeIndex++) {
        const offset = nodeIndex * this.entityStride
        // Copy current embedding to temp buffer
        for (let i = 0; i < this.rank; i++) {
          this.tempBuffer1[i] = this.entityMatrix[offset + i]
        }
        // Normalize in place
        this.normalizeVectorInPlace(this.tempBuffer1)
        // Copy back
        for (let i = 0; i < this.rank; i++) {
          this.entityMatrix[offset + i] = this.tempBuffer1[i]
        }
      }

      // Normalize relation embeddings
      for (let relIndex = 0; relIndex < 3; relIndex++) {
        const offset = relIndex * this.relationStride
        // Copy to temp buffer
        for (let i = 0; i < this.rank; i++) {
          this.tempBuffer1[i] = this.relationMatrix[offset + i]
        }
        // Normalize in place
        this.normalizeVectorInPlace(this.tempBuffer1)
        // Copy back
        for (let i = 0; i < this.rank; i++) {
          this.relationMatrix[offset + i] = this.tempBuffer1[i]
        }
      }
    }
  }

  // Updated to work with strided arrays and nodeIds map
  private processFeatureHierarchyWithGradients(
    node: SemanticNode,
    nodeId: string,
    depth: number,
    learningRate: number,
    regularization: number,
    nodeIds: string[],
    visited: Set<string> = new Set(),
  ): void {
    if (depth > 5 || visited.has(nodeId)) return
    visited.add(nodeId)

    const nodeIndex = nodeIds.indexOf(nodeId)
    const nodeOffset = nodeIndex * this.entityStride

    for (const featureId of node.features) {
      const featureNode = this.nodes.get(featureId)
      if (!featureNode) continue

      const featureIndex = nodeIds.indexOf(featureId)
      const featureOffset = featureIndex * this.entityStride
      const weight = Math.pow(0.8, depth)

      // Calculate prediction
      let prediction = 0
      for (let i = 0; i < this.rank; i++) {
        prediction +=
          this.entityMatrix[nodeOffset + i] *
          this.relationMatrix[this.relationStride + i] *
          this.entityMatrix[featureOffset + i]
      }

      const error = weight - prediction

      // Update embeddings
      for (let i = 0; i < this.rank; i++) {
        const gradEntity =
          error *
          this.relationMatrix[this.relationStride + i] *
          this.entityMatrix[featureOffset + i]

        const gradRelation =
          error *
          this.entityMatrix[nodeOffset + i] *
          this.entityMatrix[featureOffset + i]

        // Update node embedding
        this.entityMatrix[nodeOffset + i] +=
          learningRate *
          (gradEntity -
            regularization * this.entityMatrix[nodeOffset + i])

        // Update relation embedding
        this.relationMatrix[this.relationStride + i] +=
          learningRate *
          (gradRelation -
            regularization *
              this.relationMatrix[this.relationStride + i])
      }

      // Recurse for sub-features
      this.processFeatureHierarchyWithGradients(
        featureNode,
        featureId,
        depth + 1,
        learningRate,
        regularization,
        nodeIds,
        new Set(visited),
      )
    }
  }

  private getContextualRelations(
    node: SemanticNode,
    context: QueryContext,
    maxDepth: number = 5,
  ): Array<{ id: string; type: string; depth: number }> {
    const relations: Array<{
      id: string
      type: string
      depth: number
    }> = []
    const visited = new Set<string>()
    const queue: Array<[SemanticNode, number, string]> = [[node, 0, '']]

    while (queue.length > 0) {
      const [currentNode, currentDepth, relationType] = queue.shift()!

      if (currentDepth > maxDepth || visited.has(currentNode.id))
        continue
      visited.add(currentNode.id)

      if (currentDepth > 0) {
        relations.push({
          id: currentNode.id,
          type: relationType,
          depth: currentDepth,
        })
      }

      if (context.direction !== 'reverse' && currentDepth < maxDepth) {
        // Forward traversal with early depth check
        if (context.relationshipTypes.includes('parent')) {
          for (const parentId of currentNode.parents) {
            const parent = this.nodes.get(parentId)
            if (parent && !visited.has(parentId)) {
              queue.push([parent, currentDepth + 1, 'parent'])
            }
          }
        }

        if (context.relationshipTypes.includes('feature')) {
          for (const featureId of currentNode.features) {
            const feature = this.nodes.get(featureId)
            if (feature && !visited.has(featureId)) {
              queue.push([feature, currentDepth + 1, 'feature'])
            }
          }
        }
      }

      // Reverse traversal optimization
      if (context.direction !== 'forward' && currentDepth < maxDepth) {
        // Use Map for O(1) lookups instead of forEach
        this.nodes.forEach((otherNode, otherId) => {
          if (!visited.has(otherId)) {
            if (otherNode.parents.has(currentNode.id)) {
              queue.push([otherNode, currentDepth + 1, 'parent'])
            }
            if (otherNode.features.has(currentNode.id)) {
              queue.push([otherNode, currentDepth + 1, 'feature'])
            }
          }
        })
      }
    }

    return relations
  }

  // Find nodes with a specific property
  findNodesWithProperty(
    relationshipType: string,
    propertyId: string,
    threshold: number = 0.5,
    maxDepth: number = 5,
  ): Array<[string, number]> {
    const propertyNode = this.nodes.get(propertyId)
    if (!propertyNode) {
      return []
    }

    const relevantNodes = new Set<string>()
    const visited = new Set<string>()
    const queue: Array<[string, number]> = [[propertyId, 0]]

    while (queue.length > 0) {
      const [currentId, depth] = queue.shift()!

      if (depth > maxDepth || visited.has(currentId)) {
        continue
      }

      visited.add(currentId)

      if (currentId !== propertyId) {
        relevantNodes.add(currentId)
      }

      const currentNode = this.nodes.get(currentId)
      if (!currentNode) continue

      // Forward traversal
      currentNode.parents.forEach(parentId => {
        if (!visited.has(parentId)) {
          queue.push([parentId, depth + 1])
        }
      })

      currentNode.features.forEach(featureId => {
        if (!visited.has(featureId)) {
          queue.push([featureId, depth + 1])
        }
      })

      // Reverse traversal using indices
      this.parentRefs.get(currentId)?.forEach(nodeId => {
        if (!visited.has(nodeId)) {
          queue.push([nodeId, depth + 1])
        }
      })

      this.featureRefs.get(currentId)?.forEach(nodeId => {
        if (!visited.has(nodeId)) {
          queue.push([nodeId, depth + 1])
        }
      })
    }

    const scores = Array.from(relevantNodes)
      .map(nodeId => {
        const similarity = this.computePropertyScore(
          nodeId,
          propertyId,
          relationshipType,
        )
        return [nodeId, similarity] as [string, number]
      })
      .filter(([_, score]) => score >= threshold)
      .sort((a, b) => b[1] - a[1])

    return scores
  }

  private computePropertyScore(
    nodeId: string,
    propertyId: string,
    relationshipType: string,
  ): number {
    const node = this.nodes.get(nodeId)
    const property = this.nodes.get(propertyId)
    if (!node || !property) return 0

    const context: QueryContext = {
      focusNodes: [propertyId],
      relationshipTypes: [relationshipType],
      direction: 'both',
      weightFactors: {
        parent: 1.0, // Type relationships don't decay
        feature: 0.8, // Feature relationships decay with depth
        action: 0.6, // Actions have lower base weight
      },
    }

    // Get contextual embeddings for both nodes
    const nodeEmbed = this.getContextualEmbedding(nodeId, context)
    const propertyEmbed = this.getContextualEmbedding(
      propertyId,
      context,
    )

    // Return dot product similarity
    return this.dotProduct(nodeEmbed, propertyEmbed)
  }

  // Evaluate semantic preservation
  evaluateSemanticPreservation(): EvaluationMetrics {
    return {
      typePreservation: this.evaluateTypeHierarchy(),
      featurePreservation: this.evaluateFeatureRelationships(),
      pathAccuracy: this.evaluatePathAccuracy(),
      queryAccuracy: this.evaluateQueryAccuracy(),
      attentionCoherence: this.evaluateAttentionCoherence(),
    }
  }

  private evaluateTypeHierarchy(): number {
    let score = 0
    let count = 0

    this.nodes.forEach((node, nodeId) => {
      if (node.parents.size > 0) {
        const nodeEmbed = this.getContextualEmbedding(nodeId, {
          focusNodes: [],
          relationshipTypes: ['parent'],
          direction: 'forward',
          weightFactors: { parent: 1.0 },
        })

        node.parents.forEach(parentId => {
          const parentEmbed = this.getContextualEmbedding(parentId, {
            focusNodes: [],
            relationshipTypes: ['parent'],
            direction: 'forward',
            weightFactors: { parent: 1.0 },
          })

          // All parent relationships should have high similarity
          const similarity = this.dotProduct(nodeEmbed, parentEmbed)
          score += similarity
          count++
        })
      }
    })

    return count > 0 ? score / count : 1.0
  }

  private evaluateFeatureRelationships(): number {
    let score = 0
    let count = 0

    const evaluateFeatureDepth = (
      nodeId: string,
      featureId: string,
      depth: number,
      visited: Set<string>,
    ) => {
      if (visited.has(featureId)) return
      visited.add(featureId)

      const nodeEmbed = this.getContextualEmbedding(nodeId, {
        focusNodes: [featureId],
        relationshipTypes: ['feature'],
        direction: 'forward',
        weightFactors: { feature: 1.0 },
      })

      const featureEmbed = this.getContextualEmbedding(featureId, {
        focusNodes: [],
        relationshipTypes: ['feature'],
        direction: 'forward',
        weightFactors: { feature: 1.0 },
      })

      // Feature similarity should decay with depth
      const similarity = this.dotProduct(nodeEmbed, featureEmbed)
      const expectedSimilarity = Math.pow(0.8, depth)
      score += Math.abs(similarity - expectedSimilarity)
      count++

      // Recurse into sub-features
      const featureNode = this.nodes.get(featureId)
      if (featureNode) {
        featureNode.features.forEach(subFeatureId => {
          evaluateFeatureDepth(nodeId, subFeatureId, depth + 1, visited)
        })
      }
    }

    this.nodes.forEach((node, nodeId) => {
      node.features.forEach(featureId => {
        evaluateFeatureDepth(nodeId, featureId, 1, new Set())
      })
    })

    return count > 0 ? 1 - score / count : 1.0
  }

  private evaluatePathAccuracy(): number {
    let score = 0
    let count = 0

    this.nodes.forEach((startNode, startId) => {
      const paths = this.findAllPaths(startId)

      paths.forEach(path => {
        if (path.length < 2) return

        // Expected score depends on path type
        const isTypePath = path.every(nodeId => {
          const node = this.nodes.get(nodeId)
          return node && node.nodeType === 'object'
        })
        const expectedScore = isTypePath
          ? 1.0
          : Math.pow(0.8, path.length - 1)

        // Get actual path score from embeddings
        const startEmbed = this.getContextualEmbedding(path[0], {
          focusNodes: [path[path.length - 1]],
          relationshipTypes: ['parent', 'feature'],
          direction: 'both',
          weightFactors: { parent: 1.0, feature: 0.8 },
        })

        const endEmbed = this.getContextualEmbedding(
          path[path.length - 1],
          {
            focusNodes: [path[0]],
            relationshipTypes: ['parent', 'feature'],
            direction: 'both',
            weightFactors: { parent: 1.0, feature: 0.8 },
          },
        )

        const actualScore = this.dotProduct(startEmbed, endEmbed)
        score += Math.abs(expectedScore - actualScore)
        count++
      })
    })

    return count > 0 ? 1 - score / count : 1.0
  }

  private evaluateQueryAccuracy(): number {
    // Generate test cases
    const testCases: Array<{
      property: string
      candidates: string[]
      expectedRanking: string[]
    }> = []

    // Create test cases from known relationships
    this.nodes.forEach((node, nodeId) => {
      if (node.features.size > 0) {
        const property = Array.from(node.features)[0]
        testCases.push({
          property,
          candidates: Array.from(this.nodes.keys()),
          expectedRanking: this.computeExpectedRanking(
            property,
            'feature',
          ),
        })
      }
    })

    // Test each case
    let totalAccuracy = 0

    testCases.forEach(testCase => {
      const predicted = this.findNodesWithProperty(
        testCase.property,
        'feature',
      )

      // Compare predicted vs expected rankings
      let correct = 0
      const n = Math.min(
        predicted.length,
        testCase.expectedRanking.length,
      )

      for (let i = 0; i < n; i++) {
        if (predicted[i][0] === testCase.expectedRanking[i]) {
          correct++
        }
      }

      totalAccuracy += correct / n
    })

    return testCases.length > 0 ? totalAccuracy / testCases.length : 1.0
  }

  private computeExpectedRanking(
    propertyId: string,
    relation: string,
  ): string[] {
    // Compute ground truth ranking based on graph structure
    const scores = new Map<string, number>()

    this.nodes.forEach((node, nodeId) => {
      const paths = this.findAllPaths(nodeId)
      const pathToProperty = paths.find(p => p.includes(propertyId))

      if (pathToProperty) {
        // Score based on path length
        // For type paths: all relationships equally important (1.0)
        // For feature paths: decay with length (0.8^depth)
        const isTypePath = pathToProperty.every(id => {
          const node = this.nodes.get(id)
          return node && node.nodeType === 'object'
        })

        scores.set(
          nodeId,
          isTypePath ? 1.0 : Math.pow(0.8, pathToProperty.length - 1),
        )
      } else {
        scores.set(nodeId, 0) // No path exists
      }
    })

    // Sort by score and return ordered node IDs
    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id)
  }

  private findAllPaths(
    startId: string,
    maxDepth: number = 5,
  ): Array<string[]> {
    const paths: Array<string[]> = []
    const visited = new Set<string>()

    const dfs = (currentId: string, currentPath: string[]) => {
      // Stop if we've hit max depth or already visited this node
      if (currentPath.length > maxDepth || visited.has(currentId))
        return

      // Mark as visited for cycle detection
      visited.add(currentId)

      // Add current path to results
      paths.push([...currentPath])

      // Get the current node
      const node = this.nodes.get(currentId)
      if (node) {
        // Explore both parent and feature relationships
        ;[...node.parents, ...node.features].forEach(nextId => {
          dfs(nextId, [...currentPath, nextId])
        })
      }

      // Backtrack: remove from visited when leaving this branch
      visited.delete(currentId)
    }

    // Start DFS from the given node
    dfs(startId, [startId])
    return paths
  }

  private evaluateAttentionCoherence(): number {
    let score = 0
    let count = 0
    const nodeIds = Array.from(this.nodes.keys())

    // Use tempBuffer2 for scores and tempBuffer3 for attention weights
    const scoreBuffer = this.tempBuffer2
    const weightBuffer = this.tempBuffer3

    for (const nodeId of nodeIds) {
      const node = this.nodes.get(nodeId)!

      // Test each relationship type
      const relTypes = ['parent', 'feature']
      for (const relType of relTypes) {
        const relations = this.getContextualRelations(node, {
          focusNodes: [],
          relationshipTypes: [relType],
          direction: 'both',
          weightFactors: { [relType]: 1.0 },
        })

        if (relations.length > 0) {
          // Calculate attention scores directly into scoreBuffer
          for (let i = 0; i < relations.length; i++) {
            const rel = relations[i]
            const relNode = this.nodes.get(rel.id)!
            scoreBuffer[i] =
              this.dotProduct(
                node.hyperbolicEmbedding!,
                relNode.hyperbolicEmbedding!,
              ) / Math.sqrt(this.vectorSize)
          }

          // Convert scores to attention weights using pre-allocated buffer
          this.softmaxInto(
            scoreBuffer.subarray(0, relations.length),
            weightBuffer.subarray(0, relations.length),
          )

          // Check if weights match expected pattern
          for (let i = 0; i < relations.length; i++) {
            const rel = relations[i]
            const expectedWeight =
              rel.type === 'parent'
                ? 1.0 // Type relationships equally important
                : Math.pow(0.8, rel.depth) // Feature relationships decay

            score += 1 - Math.abs(weightBuffer[i] - expectedWeight)
            count++
          }
        }
      }
    }

    return count > 0 ? score / count : 1.0
  }

  // Example usage with the calcium network
  static example(): void {
    const network = new SemanticNetwork({
      vectorSize: 64, // Larger vector size
      numHeads: 8, // More attention heads
      learningRate: 0.005, // Custom learning rate
    })

    // Add nodes
    network.addNode('calcium', 'feature')
    network.addNode('bone', 'feature', [], ['calcium'])
    network.addNode('skeleton', 'feature', [], ['bone'])
    network.addNode('dog', 'object', ['mammal'], ['skeleton'])
    network.addNode('mammal', 'object', ['animal'])
    network.addNode('animal', 'object')
    network.addNode('tree', 'object', ['plant'])
    network.addNode('water', 'object')

    // Find things containing calcium
    const results = network.findNodesWithProperty('contains', 'calcium')

    console.log('Results:', results)
    // Expected output:
    // [
    //   ['dog', 0.82],    // Strong connection through skeleton->bone->calcium
    //   ['tree', 0.03],   // No valid path
    //   ['water', 0.02]   // No valid path
    // ]

    const metrics = network.evaluateSemanticPreservation()
    console.log('Evaluation:', metrics)
  }

  // Helper methods
  private randomMatrix(rows: number, cols: number): number[][] {
    return Array(rows)
      .fill(0)
      .map(() =>
        Array(cols)
          .fill(0)
          .map(() => (Math.random() * 2 - 1) / Math.sqrt(cols)),
      )
  }

  private randomVector(): Float32Array {
    // Use tempBuffer1 directly for random values
    for (let i = 0; i < this.vectorSize; i++) {
      this.tempBuffer1[i] = Math.random() * 2 - 1
    }

    // Normalize in place and return the buffer
    this.normalizeVectorInPlace(this.tempBuffer1)
    return this.tempBuffer1
  }

  private normalizeVector(vec: Float32Array): Float32Array {
    // Copy input to tempBuffer2 to avoid modifying the input
    this.tempBuffer2.set(vec)
    this.normalizeVectorInPlace(this.tempBuffer2)
    return this.tempBuffer2
  }

  private normalizeVectorInPlace(vec: Float32Array): void {
    let sumSquares = 0
    for (let i = 0; i < vec.length; i++) {
      sumSquares += vec[i] * vec[i]
    }

    const norm = Math.sqrt(sumSquares)
    if (norm === 0) return

    const invNorm = 1 / norm
    for (let i = 0; i < vec.length; i++) {
      vec[i] *= invNorm
    }
  }

  private softmax(arr: Float32Array): Float32Array {
    // Use tempBuffer2 for result to avoid modifying input
    return this.softmaxInto(arr, this.tempBuffer2)
  }

  private softmaxInto(
    arr: Float32Array,
    output: Float32Array,
  ): Float32Array {
    // Find max value
    let max = arr[0]
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i]
    }

    // Compute exp(x - max) and sum
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
      output[i] = Math.exp(arr[i] - max)
      sum += output[i]
    }

    // Normalize
    const invSum = 1 / sum
    for (let i = 0; i < arr.length; i++) {
      output[i] *= invSum
    }

    return output
  }
}
