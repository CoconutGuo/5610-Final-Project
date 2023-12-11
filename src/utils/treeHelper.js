import { cloneDeep } from 'lodash-es'

/**
 * Traverse tree
 * @param {object[]} tree
 * @param {function} cb - call back
 * @param {string} children 
 * @param {string} mode - traverse mode，DFS & BFS
 * @return {void} Do not return anything
 */
export function treeForEach(tree, cb, children = 'children', mode = 'DFS') {
  if (!Array.isArray(tree)) {
    throw new TypeError('tree is not an array')
  }
  if (typeof children !== 'string') {
    throw new TypeError('children is not a string')
  }
  if (children === '') {
    throw new Error('children is not a valid string')
  }

  // depth first search
  function DFS(treeData) {
    // eslint-disable-next-line
    for (const item of treeData) {
      cb(item)

      if (Array.isArray(item[children])) {
        DFS(item[children])
      }
    }
  }

  // breadth first search
  function BFS(treeData) {
    const queen = treeData

    while (queen.length > 0) {
      const item = queen.shift()

      cb(item)

      if (Array.isArray(item[children])) {
        queen.push(...item[children])
      }
    }
  }
  if (mode === 'BFS') {
    BFS(tree)
  } else {
    DFS(tree)
  }
}

/**
 * tree to arrays
 * @param {object[]} tree
 * @param {string} children
 * @param {string} mode
 * @return {array}
 */
export function treeToList(tree, children = 'children', mode = 'DFS') {
  if (!Array.isArray(tree)) {
    throw new TypeError('tree is not an array')
  }
  if (typeof children !== 'string') {
    throw new TypeError('children is not a string')
  }
  if (children === '') {
    throw new Error('children is not a valid string')
  }

  tree = cloneDeep(tree)

  const list = []

  treeForEach(tree, (item ) => {
    list.push(item)
  }, children, mode)

  list.forEach((item) => {
    delete item[children] // change the original data
  })

  return list
}

/**
 * arrays to tree
 * @param {object[]} list
 * @param {object} options
 * @param {string|number|null|undefined} options.rootID - root ID
 * @param {string|number} options.id - ID
 * @param {string|number} options.pid - parent ID
 * @param {string} options.children
 * @return {array}
 */

/**
interface Options {
    rootID?: string,
    id?: string,
    pid?: string,
    children?: string
}
*/

export function listToTree(list, options) {
  const {
    rootID = null, // root ID，pid === rootID
    id = 'id', // ID
    pid = 'pid', // parent ID
    children = 'children'
  } = options || {}

  if (!Array.isArray(list)) {
    throw new TypeError('list is not an array')
  }
  if (typeof children !== 'string') {
    throw new TypeError('children is not a string')
  }
  if (children === '') {
    throw new Error('children is not a valid string')
  }

  list = cloneDeep(list)

  const tree = []
  const map = list.reduce((res, item) => {
    res.set(item[id], item)

    return res
  }, new Map())

  Array.from(map.keys()).forEach(key => {
    const node = map.get(key)

    if (node[pid] === rootID) { // root - add to tree
      tree.push(node)
    } else { // non-root - find parent and add to parent's children
      const pNode = map.get(node[pid])

      if (Array.isArray(pNode[children])) {
        pNode[children].push(node)
      } else {
        pNode[children] = [node]
      }
    }
  })

  return tree
}
