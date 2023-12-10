import { cloneDeep } from 'lodash-es'

/**
 * 遍历 tree
 * @param {object[]} tree
 * @param {function} cb - 回调函数
 * @param {string} children - 子节点 字段名
 * @param {string} mode - 遍历模式，DFS：深度优先遍历 BFS：广度优先遍历
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

  // 深度优先遍历 depth first search
  function DFS(treeData) {
    // eslint-disable-next-line
    for (const item of treeData) {
      cb(item)

      if (Array.isArray(item[children])) {
        DFS(item[children])
      }
    }
  }

  // 广度优先遍历 breadth first search
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
 * tree 转 数组
 * @param {object[]} tree
 * @param {string} children - 子节点 字段名
 * @param {string} mode - 遍历模式，DFS：深度优先遍历 BFS：广度优先遍历
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
    delete item[children] // 会改变 原数据
  })

  return list
}

/**
 * 数组 转 tree
 * @param {object[]} list
 * @param {object} options
 * @param {string|number|null|undefined} options.rootID - 根节点ID
 * @param {string|number} options.id - 唯一标识 字段名
 * @param {string|number} options.pid - 父节点ID 字段名
 * @param {string} options.children - 子节点 字段名
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
    rootID = null, // 根节点ID，pid === rootID 即为 一级节点
    id = 'id', // 唯一标识
    pid = 'pid', // 父节点ID 字段
    children = 'children' // 子节点 字段
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

    if (node[pid] === rootID) { // 一级节点，直接添加到 tree
      tree.push(node)
    } else { // 非一级节点，查找父级，并添加到父级 children 中
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
