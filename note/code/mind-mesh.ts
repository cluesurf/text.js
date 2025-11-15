// Type definitions for the Base structure
type Base = {
  sorts: Array<Sort>
}

type Sort = {
  name: string
  sorts?: Array<Sort>
  likes?: Array<Like>
  links?: Array<Link>
  deeds?: Array<Deed>
}

type Deed = {
  name: string
  likes?: Array<Like>
  binds?: Array<Bind>
  links?: Array<Link>
}

type Like = {
  name: string
  binds?: Array<Bind>
  links?: Array<Link>
  deeds?: Array<Deed>
}

type Bind = {
  name: string
  bonds?: Array<Bond>
}

type Bond = BondMark | BondText | BondCase | Like

type BondMark = {
  take: number
}

type BondText = {
  take: string
}

type BondCase = {
  name: string
}

type Link = {
  name: string
  likes?: Array<Like>
  cases?: Array<Case>
  binds?: Array<Bind>
}

type Case = {
  name: string
  binds?: Array<Bind>
  links?: Array<Link>
}

interface NetworkConfig {
  vectorSize: number
  numHeads: number
  learningRate: number
  regularization: number
}

const DEFAULT_CONFIG: NetworkConfig = {
  vectorSize: 64,
  numHeads: 8,
  learningRate: 0.005,
  regularization: 0.01,
}

class BaseSemanticNetwork {
  private base: Base
  private embeddings: Map<string, Float32Array>
  private attentionHeads: AttentionHead[]
  private vectorSize: number
  private numHeads: number
  private learningRate: number
  private regularization: number
  private cache: Map<string, Float32Array>

  // Pre-allocated buffers for vector operations
  private readonly tempBuffer1: Float32Array
  private readonly tempBuffer2: Float32Array
  private readonly tempBuffer3: Float32Array
  private readonly headBuffer1: Float32Array
  private readonly headBuffer2: Float32Array
  private readonly headBuffer3: Float32Array
  private readonly combinedBuffer: Float32Array

  constructor(base: Base, config: Partial<NetworkConfig> = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config }

    this.base = base
    this.embeddings = new Map()
    this.vectorSize = finalConfig.vectorSize
    this.numHeads = finalConfig.numHeads
    this.learningRate = finalConfig.learningRate
    this.regularization = finalConfig.regularization
    this.cache = new Map()

    // Initialize buffers
    this.tempBuffer1 = new Float32Array(this.vectorSize)
    this.tempBuffer2 = new Float32Array(this.vectorSize)
    this.tempBuffer3 = new Float32Array(this.vectorSize)

    const headSize = Math.floor(this.vectorSize / this.numHeads)
    this.headBuffer1 = new Float32Array(headSize)
    this.headBuffer2 = new Float32Array(headSize)
    this.headBuffer3 = new Float32Array(headSize)
    this.combinedBuffer = new Float32Array(this.vectorSize)

    // Initialize attention heads
    this.attentionHeads = Array(this.numHeads)
      .fill(null)
      .map(() => ({
        queryMatrix: new Float32Array(this.vectorSize * headSize),
        keyMatrix: new Float32Array(this.vectorSize * headSize),
        valueMatrix: new Float32Array(this.vectorSize * headSize),
      }))

    // Initialize attention matrices
    this.attentionHeads.forEach(head => {
      this.initializeRandomMatrix(head.queryMatrix)
      this.initializeRandomMatrix(head.keyMatrix)
      this.initializeRandomMatrix(head.valueMatrix)
    })

    // Initialize embeddings for all sorts and their relationships
    this.initializeEmbeddings()
  }

  private initializeEmbeddings(): void {
    const processSort = (
      sort: Sort,
      visited: Set<string> = new Set(),
    ): void => {
      if (visited.has(sort.name)) return
      visited.add(sort.name)

      // Initialize embedding for the sort itself
      if (!this.embeddings.has(sort.name)) {
        this.embeddings.set(sort.name, this.randomVector())
      }

      // Process nested sorts
      sort.sorts?.forEach(nestedSort =>
        processSort(nestedSort, visited),
      )

      // Process likes
      sort.likes?.forEach(like => {
        if (!this.embeddings.has(like.name)) {
          this.embeddings.set(like.name, this.randomVector())
        }
      })

      // Process links
      sort.links?.forEach(link => {
        if (!this.embeddings.has(link.name)) {
          this.embeddings.set(link.name, this.randomVector())
        }
      })

      // Process deeds
      sort.deeds?.forEach(deed => {
        if (!this.embeddings.has(deed.name)) {
          this.embeddings.set(deed.name, this.randomVector())
        }
      })
    }

    // Start processing from root sorts
    this.base.sorts.forEach(sort => processSort(sort))
  }

  private findAllPaths(
    startName: string,
    endName: string,
    maxDepth: number = 5,
  ): Array<Array<string>> {
    const paths: Array<Array<string>> = []
    const visited = new Set<string>()

    const findPaths = (
      currentSort: Sort,
      currentPath: Array<string>,
      depth: number,
    ): void => {
      if (depth > maxDepth || visited.has(currentSort.name)) return
      visited.add(currentSort.name)
      currentPath.push(currentSort.name)

      if (currentSort.name === endName) {
        paths.push([...currentPath])
      } else {
        // Explore all possible connections
        currentSort.sorts?.forEach(sort => {
          if (!visited.has(sort.name)) {
            findPaths(sort, [...currentPath], depth + 1)
          }
        })

        currentSort.likes?.forEach(like => {
          if (!visited.has(like.name)) {
            const likeSort = this.findSortByName(like.name)
            if (likeSort) {
              findPaths(likeSort, [...currentPath], depth + 1)
            }
          }
        })

        currentSort.links?.forEach(link => {
          if (!visited.has(link.name)) {
            const linkSort = this.findSortByName(link.name)
            if (linkSort) {
              findPaths(linkSort, [...currentPath], depth + 1)
            }
          }
        })
      }

      visited.delete(currentSort.name)
    }

    const startSort = this.findSortByName(startName)
    if (startSort) {
      findPaths(startSort, [], 0)
    }

    return paths
  }

  private findSortByName(name: string): Sort | undefined {
    const findInSorts = (sorts: Array<Sort>): Sort | undefined => {
      for (const sort of sorts) {
        if (sort.name === name) return sort
        if (sort.sorts) {
          const found = findInSorts(sort.sorts)
          if (found) return found
        }
      }
      return undefined
    }
    return findInSorts(this.base.sorts)
  }

  // Get contextual embedding considering the full relationship graph
  getContextualEmbedding(sortName: string): Float32Array {
    if (this.cache.has(sortName)) {
      return this.cache.get(sortName)!
    }

    const sort = this.findSortByName(sortName)
    if (!sort || !this.embeddings.has(sortName)) {
      return new Float32Array(this.vectorSize)
    }

    const baseEmbedding = this.embeddings.get(sortName)!
    let contextualEmbedding = new Float32Array(baseEmbedding)

    // Collect all related embeddings
    const relatedEmbeddings: Float32Array[] = []
    const relationTypes: string[] = []

    // Add sorts
    sort.sorts?.forEach(nestedSort => {
      if (this.embeddings.has(nestedSort.name)) {
        relatedEmbeddings.push(this.embeddings.get(nestedSort.name)!)
        relationTypes.push('sort')
      }
    })

    // Add likes
    sort.likes?.forEach(like => {
      if (this.embeddings.has(like.name)) {
        relatedEmbeddings.push(this.embeddings.get(like.name)!)
        relationTypes.push('like')
      }
    })

    // Add links
    sort.links?.forEach(link => {
      if (this.embeddings.has(link.name)) {
        relatedEmbeddings.push(this.embeddings.get(link.name)!)
        relationTypes.push('link')
      }
    })

    // Add deeds
    sort.deeds?.forEach(deed => {
      if (this.embeddings.has(deed.name)) {
        relatedEmbeddings.push(this.embeddings.get(deed.name)!)
        relationTypes.push('deed')
      }
    })

    if (relatedEmbeddings.length > 0) {
      // Apply multi-head attention
      const attentionOutput = this.computeMultiHeadAttention(
        contextualEmbedding,
        relatedEmbeddings,
        relatedEmbeddings,
      )

      // Combine with base embedding
      for (let i = 0; i < this.vectorSize; i++) {
        contextualEmbedding[i] =
          (contextualEmbedding[i] + attentionOutput[i]) / 2
      }
    }

    this.cache.set(sortName, contextualEmbedding)
    return contextualEmbedding
  }

  // Find semantically similar sorts
  findSimilarSorts(
    sortName: string,
    threshold: number = 0.5,
  ): Array<[string, number]> {
    const queryEmbedding = this.getContextualEmbedding(sortName)
    const similarities: Array<[string, number]> = []

    this.embeddings.forEach((embedding, name) => {
      if (name !== sortName) {
        const similarity = this.cosineSimilarity(
          queryEmbedding,
          this.getContextualEmbedding(name),
        )
        if (similarity >= threshold) {
          similarities.push([name, similarity])
        }
      }
    })

    return similarities.sort((a, b) => b[1] - a[1])
  }

  // Helper methods
  private initializeRandomMatrix(matrix: Float32Array): void {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = (Math.random() * 2 - 1) / Math.sqrt(matrix.length)
    }
  }

  private randomVector(): Float32Array {
    const vec = new Float32Array(this.vectorSize)
    for (let i = 0; i < this.vectorSize; i++) {
      vec[i] = (Math.random() * 2 - 1) / Math.sqrt(this.vectorSize)
    }
    return this.normalizeVector(vec)
  }

  private normalizeVector(vec: Float32Array): Float32Array {
    const norm = Math.sqrt(this.dotProduct(vec, vec))
    if (norm === 0) return vec
    const normalized = new Float32Array(vec.length)
    for (let i = 0; i < vec.length; i++) {
      normalized[i] = vec[i] / norm
    }
    return normalized
  }

  private dotProduct(a: Float32Array, b: Float32Array): number {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i]
    }
    return sum
  }

  private cosineSimilarity(a: Float32Array, b: Float32Array): number {
    const dotProduct = this.dotProduct(a, b)
    const normA = Math.sqrt(this.dotProduct(a, a))
    const normB = Math.sqrt(this.dotProduct(b, b))
    return dotProduct / (normA * normB)
  }

  private computeMultiHeadAttention(
    query: Float32Array,
    keys: Float32Array[],
    values: Float32Array[],
  ): Float32Array {
    const headSize = Math.floor(this.vectorSize / this.numHeads)
    const output = new Float32Array(this.vectorSize)

    for (let h = 0; h < this.numHeads; h++) {
      const head = this.attentionHeads[h]
      const offset = h * headSize

      // Project query
      this.projectVector(query, head.queryMatrix, this.headBuffer1)

      // Calculate attention scores
      const scores = new Float32Array(keys.length)
      keys.forEach((key, i) => {
        this.projectVector(key, head.keyMatrix, this.headBuffer2)
        scores[i] = this.dotProduct(this.headBuffer1, this.headBuffer2)
      })

      // Apply softmax to get attention weights
      const weights = this.softmax(scores)

      // Compute weighted sum of values
      for (let i = 0; i < values.length; i++) {
        this.projectVector(
          values[i],
          head.valueMatrix,
          this.headBuffer3,
        )
        for (let j = 0; j < headSize; j++) {
          output[offset + j] += this.headBuffer3[j] * weights[i]
        }
      }
    }

    return output
  }

  private projectVector(
    input: Float32Array,
    matrix: Float32Array,
    output: Float32Array,
  ): void {
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

  private softmax(arr: Float32Array): Float32Array {
    const max = Math.max(...Array.from(arr))
    const expSum = arr.reduce(
      (sum, val) => sum + Math.exp(val - max),
      0,
    )
    return new Float32Array(
      arr.map(val => Math.exp(val - max) / expSum),
    )
  }
}

export default BaseSemanticNetwork
