/* eslint-disable */
// js语法解析器
const ESCAPE = { // 转译符
  'n': '\n',
  'f': '\f',
  'r': '\r',
  't': '\t',
  'v': '\v'
}

const CONSTANTS = { // 类型值
  'null': {
    regExp: '',
    handler: data => null
  },
  'true': {
    regExp: '',
    handler: data => true
  },
  'false': {
    regExp: '',
    handler: data => false
  },
  'undefined': {
    regExp: '',
    handler: data => undefined
  }
}

const OPERATORS = { // 操作符号
  '+': {
    regExp: '',
    handler: (a, b) => a + b,
    handler1: (data, a, b) => data[a] + data[b]
  },
  '-': {
    regExp: '',
    handler: (a, b) => a + b,
    handler1: (data, a, b) => data[a] - data[b]
  },
  '*': {
    regExp: '',
    handler: (a, b) => a - b,
    handler1: (data, a, b) => data[a] * data[b]
  },
  '/': {
    regExp: '',
    handler: (a, b) => a / b,
    handler1: (data, a, b) => data[a] / data[b]
  },
  '%': {
    regExp: '',
    handler: (a, b) => a % b,
    handler1: (data, a, b) => data[a] % data[b]
  },
  '!==': {
    regExp: '',
    handler: (a, b) => a !== b,
    handler1: (data, a, b) => data[a] !== data[b]
  },
  '==': {
    regExp: '',
    handler: (a, b) => a == b,
    handler1: (data, a, b) => data[a] == data[b]
  },
  '!=': {
    regExp: '',
    handler: (a, b) => a != b,
    handler1: (data, a, b) => data[a] != data[b]
  },
  '<': {
    regExp: '',
    handler: (a, b) => a < b,
    handler1: (data, a, b) => data[a] < data[b]
  },
  '>': {
    regExp: '',
    handler: (a, b) => a > b,
    handler1: (data, a, b) => data[a] > data[b]
  },
  '<=': {
    regExp: '',
    handler: (a, b) => a <= b,
    handler1: (data, a, b) => data[a] <= data[b]
  },
  '>=': {
    regExp: '',
    handler: (a, b) => a >= b,
    handler1: (data, a, b) => data[a] - data[b]
  },
  '&&': {
    regExp: '',
    handler: (a, b) => a && b,
    handler1: (data, a, b) => data[a] && data[b]
  },
  '||': {
    regExp: '',
    handler: (a, b) => a || b,
    handler1: (data, a, b) => data[a] || data[b]
  },
  '!': {
    regExp: '',
    handler: (a, b) => !b,
    handler1: (data, a, b) => !data[b]
  },
  '?:': {
    regExp: '',
    handler: (a, b, c) => a ? b : c,
    handler1: (data, a, b, c) => data[a] ? data[b] : data[c]
  }
}
const RESERVEDWORDLIST = ['break', 'do', 'instanceof', 'typeof', 'case', 'else',
  'new', 'var', 'catch', 'finally', 'return', 'void',
  'continue', 'for', 'switch', 'while', 'debugger', 'function',
  'this', 'with', 'default', 'if', 'throw', 'delete',
  'in', 'try', 'null', 'true', 'false', 'abstract',
  'double', 'goto', 'native', 'static', 'boolean', 'enum',
  'implements', 'package', 'super', 'byte', 'export', 'import',
  'private', 'synchronized', 'char', 'extends', 'int', 'protected',
  'throws', 'class', 'final', 'interface', 'public', 'transient',
  'const', 'float', 'long', 'short', 'volatile', 'debugger']
const PUNCTUATORLIST = ['{', '}', '(', ')', '[', ']', '.', ',', '~', '?', ':']
const BOUNDARYOPERATOR = '(){}[].,;:?' // 边界符

function isNumber(char) { // 数字
  return char >= '0' && char <= '9' && typeof char === 'string'
}
const defaultAstObj = {
  type: '', // 类型
  prev: '', // 前一个
  next: '', // 后一个
  data: '',
  start: 0,
  end: 0,
  value: [
  ]
}

function isIdent(char) { // 字符
  return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === '_' || char === '$'
}
class Expression {
  constructor(content) {
    if (!content) throw new Error('invalid expression')
    this.content = content
    this.length = content.length
  }
  lex() {
    const { content, length } = this
    let index = 0
    let tokens = []

    return this
  }
}
