// The AI agent itself
export type Mind = {
  // short term memory
  head: Base
  // long term memory
  tree: Base
}

// the AI agent memory
type Base = {
  // the stuff stored in the agent's mind
  sorts: Array<Sort>
}

// type of thing, or expression representing something
type Sort = {
  // expression or term representing the sort
  name: string
  // the definition of this, or alias.
  sorts?: Array<Sort> // Change from singular `sort` to plural `sorts`
  // the types of thing this is
  likes?: Array<Like>
  // properties/features/attributes/traits of the thing
  links?: Array<Link>
  // behaviors or action performable by the "sort"
  deeds?: Array<Deed>
}

type Deed = {
  // the "sort" name
  name: string
  likes?: Array<Like>
  binds?: Array<Bind>
  links?: Array<Link>
}

// need "validations", `test`, on the
// likes and the cases.
// basically, where clauses

// the "sort" that something is like
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
