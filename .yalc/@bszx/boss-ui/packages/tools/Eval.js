/* eslint-disable */
/*
 Eval.js
 Author:Titans:2396757591@qq.com
*/
import $MacroFn from './macroFn.js'
import BigNumber from './big.js'
// JavaScript中运算符优先级，从高到低
// 优先级
//     运算类型 关联性 运算符

// 20
// 圆括号( …)

// 19
//     成员访问 从左到右 … . …
//     需计算的成员访问 从左到右 …[ …]
// new (带参数列表) new … ( … )
//     函数调用 从左到右 … ( … )

// 18
// new (无参数列表) 从右到左 new …

// 17
// 后置递增(运算符在后) … ++
//  后置递减(运算符在后) … --

//   16
//     逻辑非 从右到左! …
//     按位非 从右到左 ~ …
//     一元加法 从右到左 + …
//     一元减法 从右到左 - …
//     前置递增 从右到左++ …
//     前置递减 从右到左-- …
// typeof 从右到左 typeof …
// void 从右到左 void …
// delete 从右到左 delete …

// 15
//     幂 从右到左 … ** …

// 14
//     乘法 从左到右 … * …
//     除法 从左到右 … / …
//     取模 从左到右 … % …

// 13
//     加法 从左到右 … + …
//     减法 从左到右 … - …

// 12
//     按位左移 从左到右 … << …
//     按位右移 从左到右 … >> …
//     无符号右移 从左到右 … >>> …

// 11
//     小于 从左到右 … < …
//     小于等于 从左到右 … <= …
//     大于 从左到右 … > …
//     大于等于 从左到右 … >= …
//     in 从左到右 … in …
//     instanceof 从左到右 … instanceof …

// 10
//     等号 从左到右 … == …
//     非等号 从左到右 … != …
//     全等号 从左到右 … === …
//     非全等号 从左到右 … !== …

// 9
//     按位与 从左到右 … & …

// 8
//     按位异或 从左到右 … ^ …

// 7
//     按位或 从左到右 … | …

// 6
//     逻辑与 从左到右 … && …

// 5
//     逻辑或 从左到右 … || …

// 4
// 条件运算符（三目） 从右到左 … ? … : …

// 3
//     赋值 从右到左
//                 … = …
//                 … += …
//                 … -= …
//                 … *= …
//                 … /= …
//                 … %= …
//                 … <<= …  左移
//                 … >>= …  右移
//                 … >>>= … 无符号右移
//                 … &= …   位与
//                 … ^= …   位异或
//                 … |= …   位或

// 2
// yield 从右到左 yield …
// yield * 从右到左 yield * …

// 1
//     展开运算符 ... …

// 0
//     逗号 从左到右 … , …
var root = Function('return this')()
/**
 * @enum {string}
 * @readonly
*/
var TokenType = {
  TERNARY_LEFT: '?',
  TERNARY_RIGHT: ':',
  STRING: '"',
  VAR: 'x',
  CALL: 'f',
  GROUP: '()',
  NUMBER: '#',
  OP: '*',
  LEFT_PAREN: '(',
  RIGHT_PAREN: ')',
  COMMA: ','
}

var hasOwnProperty = Object.hasOwnProperty

var DEFAULT_VAR_NAME_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'

var lineBreakRgx = new RegExp(/\r\n?|\n|\u2028|\u2029/g)
function getLineInfo(input, offset) {
  for (var line = 1, cur = 0; ;) {
    lineBreakRgx.lastIndex = cur
    let match = lineBreakRgx.exec(input)
    if (match && match.index < offset) {
      line++
      cur = match.index + match[0].length
    } else {
      return { line: line, column: offset - cur + 1 }
    }
  }
}

var enrichError = function (err, formula, at, end) {
  err.position = at

  if (end != null) { err.endPosition = end }

  let lineInfo = null
  let endLineInfo = null

  Object.defineProperty(err, 'lineInfo', {
    get() {
      if (!lineInfo) { lineInfo = getLineInfo(formula, at) }
      return lineInfo
    }
  })

  Object.defineProperty(err, 'endLineInfo', {
    get() {
      if (end == null) { return undefined }

      if (!endLineInfo) { endLineInfo = getLineInfo(formula, end) }

      return endLineInfo
    }
  })

  return err
}

var Eval = function () {
  // https://en.wikipedia.org/wiki/Order_of_operations#Programming_languages
  this.order = [
    ['!'],
    ['**'],
    ['\\', '/', '*', '%'],
    ['+', '-'],
    ['<<', '>>'],
    ['<', '<=', '>', '>='],
    ['===', '!==', '==', '=', '!=', '<>'],
    ['&'], ['^'], ['|'],
    ['&&'], ['||'],
    [':', '?']
  ]

  this.prefixOps = ['!']
  this.suffixOps = ['!']

  // https://en.wikipedia.org/wiki/Operator_associativity
  this.rightAssociativeOps = {
    '**': true
  }
  this.ternaryOpt = {
    '?': true,
    ':': true
  }

  this.varNameChars = Object.create ? Object.create(null) : {}

  let chars = DEFAULT_VAR_NAME_CHARS.split('')
  for (var i = 0; i < chars.length; i++) {
    this.varNameChars[chars[i]] = true
  }

  this.flatOps = []
  for (let i = 0; i < this.order.length; i++) {
    this.flatOps = this.flatOps.concat(this.order[i])
  }

  this.CONSTANT = {}
  this.FUNCTION = {}

  /** @type function(name:string):any */
  this.constProvider = null
}

Eval.prototype.DEFAULT_CONSTANTS = {
  'PI': Math.PI,
  'PI_2': Math.PI / 2, // Math.PI_2;
  'LOG2E': Math.LOG2E,
  'DEG': Math.PI / 180,
  'E': Math.E
}

Eval.prototype.FORCE_CONSTANTS = {
  'INFINITY': Infinity,
  'NAN': NaN,
  'TRUE': true,
  'FALSE': false
}

Eval.prototype.exec = function (expression) {
  try {
    return this.execute(expression)
  } catch (ignored) {
    return 'ERROR'
  }
}

Eval.prototype.execute = function (expression) {
  let compiled
  if (expression['__compiled_expression']) {
    compiled = expression
  } else {
    compiled = this.compile(expression)
  }

  return this._evaluateToken(compiled)
}

Eval.prototype._opAtPosition = function (s, p) {
  let op = ''

  for (var j = 0, jlen = this.flatOps.length; j < jlen; j++) {
    let item = this.flatOps[j]

    if (op === item || item.length <= op.length) { continue }

    if (s.substr(p, item.length) === item) {
      op = item
    }
  }

  return op
}

Eval.prototype._indexOfOpInTokens = function (tokens, op) {
  for (var i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if (token.type === TokenType.OP && token.value === op) { return i }
  }
  return -1
}
Eval.prototype._indexOfOpTernaryTokens = function (tokens, op) {
  for (var i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if ((token.type === TokenType.TERNARY_LEFT || token.type === TokenType.TERNARY_RIGHT) && token.value === op) { return i }
  }
  return -1
}



Eval.prototype._lastIndexOfOpInTokens = function (tokens, op) {
  for (var i = tokens.length - 1; i >= 0; i--) {
    let token = tokens[i]
    if (token.type === TokenType.OP && token.value === op) { return i }
  }
  return -1
}

Eval.prototype._lastIndexOfOpArray = function (tokens, cs) {
  let l = -1; let p; let m; let item

  for (var i = 0; i < cs.length; i++) {
    item = cs[i]

    // Is this one a right-associative op?
    if (hasOwnProperty.call(this.rightAssociativeOps, item)) {
      p = this._indexOfOpInTokens(tokens, item)
    } else if (hasOwnProperty.call(this.ternaryOpt, item)) {
      p = this._indexOfOpTernaryTokens(tokens, item)
    } else {
      p = this._lastIndexOfOpInTokens(tokens, item)
    }

    if (p === -1) { continue }

    if (l === -1 || p > l) {
      l = p
      m = item
    }
  }

  return [l, m]
}

Eval.prototype._parseString = function (data, startAt, strict, unquote) {
  startAt = startAt || 0
  let i = startAt || 0; let len = data.length

  let out = ''
  let c, uffff, j, hex, hexSize

  let quote = null
  if (unquote) {
    quote = data[i++]
    if (quote !== '\'' && quote !== '"') {
      throw enrichError(new SyntaxError('Not a string'), data, startAt, startAt + 1)
    }
  }

  for (; i < len; i++) {
    c = data[i]

    if (c === '\\') {
      c = data[i + 1]
      if (!c) {
        throw enrichError(new SyntaxError('Invalid string. An escape character with no escapee encountered at index ' + i), data, i, i + 1)
      }

      // Take a step forward here
      i++

      // Test escapee

      if (c === '\\' ||
        c === '\'' ||
        c === '"') {
        out += c
      } else if (c === 'b') {
        out += '\b'
      } else if (c === 'f') {
        out += '\f'
      } else if (c === 'n') {
        out += '\n'
      } else if (c === 'r') {
        out += '\r'
      } else if (c === 't') {
        out += '\t'
      } else if (c === 'u' || c === 'x') {
        uffff = 0
        hexSize = c === 'u' ? 4 : 2

        for (j = 0; j < hexSize; j += 1) {
          c = data[++i]

          if (c >= '0' && c <= '9') {
            hex = c - '0'
          } else if (c >= 'a' && c <= 'f') {
            hex = c - 'a' + 10
          } else if (c >= 'A' && c <= 'F') {
            hex = c - 'A' + 10
          } else {
            if (strict) {
              throw enrichError(new SyntaxError('Unexpected escape sequence at index ' + (i - j - 2)), data, (i - j - 2), (i - j - 1))
            } else {
              i--
              break
            }
          }

          uffff = uffff * 16 + hex
        }

        out += String.fromCharCode(uffff)
      } else {
        if (strict) {
          throw enrichError(new SyntaxError('Unexpected escape sequence at index ' + (i - 1)), data, i - 1, i)
        } else {
          out += c
        }
      }
    } else if (c === quote) {
      return [out, i + 1]
    } else {
      out += c
    }
  }

  if (unquote) {
    throw enrichError(new SyntaxError('String must be quoted with matching single-quote (\') or double-quote(") characters.'), data, i, i + 1)
  }

  return out
}

Eval.prototype._parseNumber = function (data, startAt) {
  let i = startAt || 0; let len = data.length

  let c
  let exp = 0
  let dec = false

  if (i >= len) {
    throw enrichError(new SyntaxError('Can\'t parse token at ' + i), data, i, i + 1)
  }

  for (; i < len; i++) {
    c = data[i]

    if (c >= '0' && c <= '9') {
      if (exp === 1 || exp === 2) { exp = 3 }
    } else if (c === '.') {
      if (dec || exp > 0) break
      dec = true
    } else if (c === 'e') {
      if (exp > 0) break
      exp = 1
    } else if (exp === 1 && (c === '-' || c === '+')) {
      exp = 2
    } else {
      break
    }
  }

  if (i === startAt || exp === 1 || exp === 2) {
    throw enrichError(new SyntaxError('Unexpected character at index ' + i), data, i, i + 1)
  }

  return [data.substr(startAt, i - startAt), i]
}

Eval.prototype._tokenizeExpression = function (expression) {
  let tokens = []

  let parsed

  for (var i = 0, len = expression.length; i < len; i++) {
    let c = expression[i]

    let isDigit = c >= '0' && c <= '9'

    if (isDigit || c === '.') {
      // Starting a number
      parsed = this._parseNumber(expression, i)
      tokens.push({
        type: TokenType.NUMBER,
        pos: i,
        end: parsed[1],
        value: parsed[0],
        source: expression
      })
      i = parsed[1] - 1
      continue
    }

    let isVarChars = this.varNameChars[c]

    if (isVarChars) {
      // Starting a variable name - can start only with A-Z_

      let token = ''

      while (i < len) {
        c = expression[i]
        isVarChars = this.varNameChars[c]
        if (!isVarChars && c !== '.') break
        token += c
        i++
      }

      tokens.push({
        type: TokenType.VAR,
        pos: i - token.length,
        end: i,
        value: token,
        source: expression
      })

      i-- // Step back to continue loop from correct place

      continue
    }

    if (c === '\'' || c === '"') {
      parsed = this._parseString(expression, i, false, true)
      tokens.push({
        type: TokenType.STRING,
        pos: i,
        end: parsed[1],
        value: parsed[0],
        source: expression
      })
      i = parsed[1] - 1
      continue
    }

    if (c === '(') {
      tokens.push({
        type: TokenType.LEFT_PAREN,
        pos: i,
        end: i + 1,
        source: expression
      })
      continue
    }

    if (c === ')') {
      tokens.push({
        type: TokenType.RIGHT_PAREN,
        pos: i,
        end: i + 1,
        source: expression
      })
      continue
    }

    if (c === ',') {
      tokens.push({
        type: TokenType.COMMA,
        pos: i,
        end: i + 1,
        source: expression
      })
      continue
    }

    if (c === ' ' || c === '\t' || c === '\f' || c === '\r' || c === '\n') {
      // Whitespace, skip
      continue
    }

    if (c === '?') {
      tokens.push({
        type: TokenType.TERNARY_LEFT,
        pos: i,
        end: i + 1,
        value: c,
        source: expression
      })
      continue
    }
    if (c === ':') {
      tokens.push({
        type: TokenType.TERNARY_RIGHT,
        pos: i,
        end: i + 1,
        value: c,
        source: expression
      })
      continue
    }
    let op = this._opAtPosition(expression, i)
    if (op) {
      tokens.push({
        type: TokenType.OP,
        pos: i,
        end: i + op.length,
        value: op,
        source: expression
      })
      i += op.length - 1
      continue
    }
    throw enrichError(new SyntaxError('Unexpected token at index ' + i), expression, i, i + 1)
  }

  return tokens
}

Eval.prototype._groupTokens = function (tokens, startAt) {
  let isFunc = startAt > 0 && tokens[startAt - 1].type === TokenType.VAR

  let rootToken = tokens[isFunc ? startAt - 1 : startAt]

  let token, groups, sub

  if (isFunc) {
    rootToken.type = TokenType.CALL
    groups = rootToken.args = []
    sub = []
  } else {
    rootToken.type = TokenType.GROUP
    sub = rootToken.tokens = []
  }

  for (var i = startAt + 1, len = tokens.length; i < len; i++) {
    token = tokens[i]

    if (isFunc && token.type === TokenType.COMMA) {
      sub = []
      groups.push(sub)
      continue
    }

    if (token.type === TokenType.RIGHT_PAREN) {
      if (isFunc) {
        tokens.splice(startAt, i - startAt + 1)
      } else {
        tokens.splice(startAt + 1, i - startAt)
      }
      return rootToken
    }

    if (token.type === TokenType.LEFT_PAREN) {
      this._groupTokens(tokens, i)
      i--
      len = tokens.length
      continue
    }

    if (isFunc && groups.length === 0) {
      groups.push(sub)
    }

    sub.push(token)
  }

  let startToken = tokens[startAt]
  throw enrichError(
    new SyntaxError('Unmatched parenthesis for parenthesis at index ' + startToken.pos),
    startToken.source, startToken.pos, startToken.end)
}

Eval.prototype._buildTree = function (tokens, parentToken) {
  let order = this.order; let orderCount = order.length
  let cs, found, pos, op
  let left, right

  for (var i = orderCount - 1; i >= 0; i--) {
    cs = order[i]
    found = this._lastIndexOfOpArray(tokens, cs)
    pos = found[0]
    op = found[1]

    if (pos !== -1) {
      let token = tokens[pos]

      if (this.prefixOps.indexOf(op) !== -1 || this.suffixOps.indexOf(op) !== -1) {
        left = null
        right = null
        if (this.prefixOps.indexOf(op) !== -1 && pos === 0) {
          right = tokens.slice(pos + 1)
        } else if (this.suffixOps.indexOf(op) !== -1 && pos > 0) {
          left = tokens.slice(0, pos)
        }

        if (left === null && right === null) {
          throw enrichError(new SyntaxError('Operator ' + token.value + ' is unexpected at index ' + token.pos), token.source, token.pos, token.end)
        }
      } else {
        left = tokens.slice(0, pos)
        right = tokens.slice(pos + 1)

        if (left.length === 0 && (op === '-' || op === '+')) {
          left = null
        }
      }

      if ((left && left.length === 0) || (right && right.length === 0)) {
        throw enrichError(new SyntaxError('Invalid expression, missing operand'), token.source, token.pos, token.end)
      }

      if (!left && op === '-') {
        left = [{ type: TokenType.NUMBER, value: 0, source: '0-', pos: token.pos, end: token.end }]
      } else if (!left && op === '+') {
        return this._buildTree(right)
      }

      if (left) { token.left = this._buildTree(left) }

      if (right) { token.right = this._buildTree(right) }

      return token
    }
  }

  if (tokens.length > 1) {
    throw enrichError(new SyntaxError('Invalid expression, missing operand or operator at ' + tokens[1].pos), tokens[1].source, tokens[1].pos, tokens[1].end)
  }

  if (tokens.length === 0) {
    throw enrichError(new SyntaxError('Invalid expression, missing operand or operator.'), parentToken.source, parentToken.pos, parentToken.end)
  }

  let singleToken = tokens[0]

  if (singleToken.type === TokenType.GROUP) {
    singleToken = this._buildTree(singleToken.tokens, singleToken)
  } else if (singleToken.type === TokenType.CALL) {
    for (var a = 0, arglen = singleToken.args.length; a < arglen; a++) {
      if (singleToken.args[a].length === 0) { singleToken.args[a] = null } else { singleToken.args[a] = this._buildTree(singleToken.args[a], singleToken) }
    }
  } else if (singleToken.type === TokenType.COMMA) {
    throw enrichError(new SyntaxError('Unexpected character at index ' + singleToken.pos), singleToken.source, singleToken.pos, singleToken.end)
  }

  return singleToken
}

Eval.prototype.compile = function (expression) {
  try {
    let tokens = this._tokenizeExpression(expression.replace(/\s+/ig, ''))
    let token, prevToken, i, len

    // Compact +-
    for (i = 1, len = tokens.length; i < len; i++) {
      token = tokens[i]
      prevToken = tokens[i - 1]

      if (token.type === TokenType.OP && (token.value === '-' || token.value === '+') && prevToken.type === TokenType.OP && (prevToken.value === '-' || prevToken.value === '+')) {
        if (prevToken.value !== '+') {
          if (token.value === '-') {
            token.value = '+'
          } else {
            token.value = '-'
          }
        }

        tokens.splice(i - 1, 1)
        i--
        len = tokens.length
        continue
      }

      if (token.type === TokenType.NUMBER && prevToken.type === TokenType.OP && (prevToken.value === '-' || prevToken.value === '+') && ((i > 1 && tokens[i - 2].type === TokenType.OP) || i === 1)
      ) {
        if (prevToken.value === '-') {
          token.value = prevToken.value + token.value
        }
        tokens.splice(i - 1, 1)
        i--
        len = tokens.length
      }
    }

    // Take care of groups (including function calls)
    for (i = 0, len = tokens.length; i < len; i++) {
      token = tokens[i]

      if (token.type === TokenType.LEFT_PAREN) {
        this._groupTokens(tokens, i)
        len = tokens.length
        i--
      }
    }

    // Build the tree
    let tree = this._buildTree(this._groupsTernary(tokens))

    tree['__compiled_expression'] = true

    return tree
  } catch (e) {
    debugger
  }

}
Eval.prototype._groupsTernary = function (tokens) {
  let i = 0;
  let len = tokens.length
  let ternaryLeftIndex
  let ternaryRightIndex
  let findCount = 0
  while (i < len) {
    let token = tokens[i]
    if (token.type === '?') {
      findCount = findCount + 1
      if (findCount === 1) {
        ternaryLeftIndex = i
      }
    } else if (token.type === ':') {
      findCount = findCount - 1
      if (findCount === 0) {
        ternaryRightIndex = i
        i = len
      }
    }
    i++
  }
  if (ternaryLeftIndex || ternaryRightIndex) {
    return [
      {
        end: tokens[ternaryLeftIndex - 1].end,
        pos: 0,
        source: tokens[0].source,
        tokens: tokens.slice(0, ternaryLeftIndex),
        type: "()"
      },
      tokens[ternaryLeftIndex],
      {
        end: tokens[ternaryRightIndex - 1].end,
        pos: tokens[ternaryLeftIndex + 1].pos,
        source: tokens[0].source,
        tokens: this._groupsTernary(tokens.slice(ternaryLeftIndex + 1, ternaryRightIndex)),
        type: "()"
      },
      tokens[ternaryRightIndex],
      {
        end: tokens[len - 1].end,
        pos: tokens[ternaryRightIndex + 1].pos,
        source: tokens[0].source,
        tokens: this._groupsTernary(tokens.slice(ternaryRightIndex + 1, len)),
        type: "()"
      }
    ]
  }
  else {
    return tokens
  }
}
Eval.prototype._evaluateTernary = function (token) {
  return this._evaluateToken(token.left.left) ? this._evaluateToken(token.left.right) : this._evaluateToken(token.right)
}
Eval.prototype._evaluateToken = function (token) {
  let value = token.value

  switch (token.type) {
    case TokenType.STRING:
      return value

    case TokenType.NUMBER:
      return this.number(value)

    case TokenType.VAR:
      if (typeof this.constProvider === 'function') {
        let v = this.constProvider(value)
        if (v !== undefined && v !== null) { return v }
      }

      if (typeof this.FORCE_CONSTANTS[value.toUpperCase()] !== 'undefined') { return this.FORCE_CONSTANTS[value.toUpperCase()] }

      if (typeof this.CONSTANT[value] !== 'undefined') { return this.CONSTANT[value] }

      if (typeof this.DEFAULT_CONSTANTS[value.toUpperCase()] !== 'undefined') { return this.DEFAULT_CONSTANTS[value.toUpperCase()] }

      return undefined

    case TokenType.CALL:
      return this._evaluateFunction(token)
    case TokenType.TERNARY_RIGHT: // 三目
      return this._evaluateTernary(token)

    case TokenType.OP:
      let res
      switch (token.value) {
        case '!': // Factorial or Not
          if (token.left) { // Factorial (i.e. 5!)
            return this.fac(this._evaluateToken(token.left))
          } else { // Not (i.e. !5)
            return this.logicalNot(this._evaluateToken(token.right))
          }

        case '/': // Divide
        case '\\':
          return this.div(this._evaluateToken(token.left), this._evaluateToken(token.right))
        case '*': // Multiply
          return this.mul(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '+': // Add
          return this.add(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '-': // Subtract
          return this.sub(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '<<': // Shift left
          return this.shiftLeft(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '>>': // Shift right
          return this.shiftRight(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '<': // Less than
          return this.lessThan(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '<=': // Less than or equals to
          return this.lessThanOrEqualsTo(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '>': // Greater than
          return this.greaterThan(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '>=': // Greater than or equals to
          return this.greaterThanOrEqualsTo(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '===': // Equals to
          return this.absEqualsTo(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '!==': // Not equals to
          return this.notAbsEqualsTo(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '==': // Equals to
        case '=':
          return this.equalsTo(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '!=': // Not equals to
        case '<>':
          return this.notEqualsTo(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '**': // Power
          return this.pow(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '%': // Mod
          return this.mod(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '&': // Bitwise AND
          return this.and(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '^': // Bitwise XOR
          return this.xor(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '|': // Bitwise OR
          return this.or(this._evaluateToken(token.left), this._evaluateToken(token.right))

        case '&&': // Logical AND
          res = this._evaluateToken(token.left)
          if (this.isTruthy(res)) { return this._evaluateToken(token.right) }
          return res

        case '||': // Logical OR
          res = this._evaluateToken(token.left)
          if (!this.isTruthy(res)) { return this._evaluateToken(token.right) }
          return res
      }
  }

  throw new Error('An unexpected error occurred while evaluating expression')
}

Eval.prototype._evaluateFunction = function (token) {
  let fname = token.value

  let args = []
  for (var i = 0; i < token.args.length; i++) {
    if (token.args[i] === null) {
      args.push(undefined)
    } else {
      args.push(this._evaluateToken(token.args[i]))
    }
  }

  if (typeof (this.FUNCTION[fname]) === 'function') {
    return this.FUNCTION[fname].apply(this.FUNCTION[fname], args)
  } else if (typeof (this[fname]) === 'function') {
    return this[fname].apply(this, args)
  } else if (typeof (Math[fname]) === 'function') {
    return Math[fname].apply(Math, args)
  } else if (typeof ($MacroFn[fname]) === 'function') {
    return $MacroFn[fname].apply($MacroFn, args)
  } else if (typeof (root[fname]) === 'function') {
    return root[fname].apply(root, args)
  } else if (fname.indexOf('.' >= 0)) {
    let fnameArr = fname.split('.')
    let fn = null
    let ci = 0
    for (let i = 0; i < fnameArr.length; i++) {
      if (i === 0) {
        fn = root[fnameArr[i]]
      } else {
        fn = fn[fnameArr[i]]
      }
      ci++
      if (!fn) {
        break
      }
    }
    if (typeof (fn) === 'function' & ci === fnameArr.length) {
      return fn.apply(root, args)
    }

  } else {

  }

  throw enrichError(new ReferenceError('Function named "' + fname + '" was not found'), token.source, token.pos, token.end)
}

/**
 * Extension functions
 */
Eval.prototype.number = function (str) {
  return Number(str)
}

Eval.prototype.add = function (a, b) {
  // return a + b;
  return BigNumber.plus(a, b)
}

Eval.prototype.sub = function (a, b) {
  // return a - b;
  return BigNumber.minus(a, b)
}

Eval.prototype.mul = function (a, b) {
  // return a * b;
  return BigNumber.mul(a, b)
}

Eval.prototype.div = function (a, b) {
  // return a / b;
  return BigNumber.div(a, b)
}

Eval.prototype.pow = function (a, b) {
  return Math.pow(a, b)
}

Eval.prototype.lessThan = function (a, b) {
  return a < b
}

Eval.prototype.lessThanOrEqualsTo = function (a, b) {
  return a <= b
}

Eval.prototype.greaterThan = function (a, b) {
  return a > b
}

Eval.prototype.greaterThanOrEqualsTo = function (a, b) {
  return a >= b
}

Eval.prototype.absEqualsTo = function (a, b) {
  return a === b
}

Eval.prototype.notAbsEqualsTo = function (a, b) {
  return a !== b
}
Eval.prototype.equalsTo = function (a, b) {
  return a == b
}

Eval.prototype.notEqualsTo = function (a, b) {
  return a != b
}

Eval.prototype.isTruthy = function (a) {
  return !!a
}

Eval.prototype.logicalNot = function (n) {
  return !this.isTruthy(n)
}

Eval.prototype.fac = function (n) {
  let s = 1
  for (var i = 2; i <= n; i++) { s = this.mul(s, i) }
  return s
}

Eval.prototype.mod = function (a, b) {
  // return a % b;
  // return BigNumber.minus(a, BigNumber.mul(Math.floor(BigNumber.div(a, b)), b))
  return BigNumber.mod(a, b)
}

Eval.prototype.shiftLeft = function (a, b) {
  return a << b
}

Eval.prototype.shiftRight = function (a, b) {
  return a >> b
}

Eval.prototype.and = function (a, b) {
  return a & b
}

Eval.prototype.xor = function (a, b) {
  return a ^ b
}

Eval.prototype.or = function (a, b) {
  return a | b
}
/**
 * Node compatibility
 */
const EvalCall = new Eval()
export default EvalCall
window.EvalCall = EvalCall
// new Eval().exec(str)

//       单位基本信息表.是否实行养老保险改革===是
//       ?
//       (现基本工资<原基本工资&&状态===调资)?(现基本工资-原基本工资)*应调整月份:ABS(现基本工资-原基本工资)*([调出,死亡,退休状态].indexOf(状态)>0?-应调整月份:应调整月份)*单位扩展信息表.财政拨款占单位总收入比例/100
//       :
//       (现基本工资<原基本工资&&状态===调资)?(现基本工资-原基本工资)*应调整月份:ABS(现基本工资-原基本工资)*([调出,死亡,退休状态].indexOf(状态)>0?-应调整月份:应调整月份)*88/100*单位扩展信息表.财政拨款占单位总收入比例/100

//       单位基本信息表.是否实行养老保险改革===是
//       ?
//       (现基本工资<原基本工资&&状态===调资)?(现基本工资-原基本工资)*应调整月份:ABS(现基本工资-原基本工资)*((状态===调出||状态==死亡||状态==退休状态)?-应调整月份:应调整月份)*单位扩展信息表.财政拨款占单位总收入比例/100
//       :
//       (现基本工资<原基本工资&&状态===调资)?(现基本工资-原基本工资)*应调整月份:ABS(现基本工资-原基本工资)*((状态===调出||状态==死亡||状态==退休状态)?-应调整月份:应调整月份)*88/100*单位扩展信息表.财政拨款占单位总收入比例/100
