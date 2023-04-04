/* eslint-disable */
import BigNumber from '../big.js'
  // 编译
  const {
    scriptCompile
  } = require('./stringCompile.js')
  // 运行环境的一些适配
  const {
    getUUID,
    findByIndex,
    findStrAndSplit
  } = require('./env.js')
  const {
    registerOperator
  } = require('./operator.js')
  // 计算
  const {
    calculate
  } = require('./calculate.js')
  // 到全局变量
const myeval = {
    registerOperator,
  eval(data, vars) {
      data = data.replace(/\s+/g, '')
      if (vars == null) {
        vars = [window]
      }
      if (!data) {
        return data
      }
      let codes = (typeof data) === 'string' ? myeval.compile(data) : data
      return calculate(codes, vars)
    },
    compile(str) {
      if (str && str.length > 0) {
        return scriptCompile(str)
      } else {
        console.log(new Error('你传个空字符串进来干啥...'))
      }
    }
}
  //符号:*
  registerOperator({
    operator: "_",
    level: 10,
    fun: (a, b) => a + '_' + b
  });
  // 符号:*
  /*
    registerOperator({
      operator: '*',
      level: 10,
      fun: (a, b) => new BigNumber(isNaN(Number(a)) ? 0 : Number(a)).mul(new BigNumber(isNaN(Number(b)) ? 0 : Number(b))).toNumber()
    })
    // 符号:%
    registerOperator({
      operator: '%',
      level: 10,
      fun: (a, b) => {
        a = new BigNumber(isNaN(Number(a)) ? 0 : Number(a))
        b = new BigNumber(isNaN(Number(b)) ? 0 : Number(b))
        return a.minus(new BigNumber(Math.floor(a.div(b))).mul(b)).toNumber()
      }
    })
    // 符号:/
    registerOperator({
      operator: '/',
      level: 10,
      fun: (a, b) => new BigNumber(isNaN(Number(a)) ? 0 : Number(a)).div(new BigNumber(isNaN(Number(b)) ? 0 : Number(b))).toNumber()
    })
    // 符号:+
    registerOperator({
      operator: '+',
      level: 9,
      fun: (a, b) => new BigNumber(isNaN(Number(a)) ? 0 : Number(a)).plus(new BigNumber(isNaN(Number(b)) ? 0 : Number(b))).toNumber()
    })
  */
  // 符号:-
  registerOperator({
    operator: '-',
    level: 9,
    fun: (a, b) => new BigNumber(isNaN(Number(a)) ? 0 : Number(a)).minus(new BigNumber(isNaN(Number(b)) ? 0 : Number(b))).toNumber()
  })
  // 符号:*
  registerOperator({
    operator: '*',
    level: 10,
    fun: (a, b) => BigNumber.mul(a, b)
  })

  // 符号:%
  registerOperator({
    operator: '%',
    level: 10,
    fun: (a, b) => {
      return BigNumber.minus(a, BigNumber.mul(Math.floor(BigNumber.div(a, b)), b))
      // return a.minus(new BigNumber(Math.floor(a.div(b))).mul(b)).toNumber()
    }
  })
  // 符号:/
  registerOperator({
    operator: '/',
    level: 10,
    fun: (a, b) => BigNumber.div(a, b)
  })
  // 符号:+
  registerOperator({
    operator: '+',
    level: 9,
    fun: (a, b) => BigNumber.plus(a, b)
  })
  // 符号:-
  registerOperator({
    operator: '-',
    level: 9,
    fun: (a, b) => BigNumber.minus(a, b)
  })
  // 符号:>=
  registerOperator({
    operator: '>=',
    level: 5,
    fun: (a, b) => a >= b
  })
  // 符号:<=
  registerOperator({
    operator: '<=',
    level: 5,
    fun: (a, b) => a <= b
  })
  // 符号:>
  registerOperator({
    operator: '>',
    level: 4,
    fun: (a, b) => a > b
  })
  // 符号:<
  registerOperator({
    operator: '<',
    level: 4,
    fun: (a, b) => a < b
  })
  // 符号:==
  registerOperator({
    operator: '==',
    level: 3,
    fun: (a, b) => a == b
	})
	// 符号:==
	registerOperator({
		operator: '===',
		level: 3,
		fun: (a, b) => a === b
	})
  // 符号:!=
  registerOperator({
    operator: '!=',
    level: 3,
    fun: (a, b) => a != b
	})
	// 符号:!==
	registerOperator({
		operator: '!=',
		level: 3,
		fun: (a, b) => a !== b
	})
  // 符号:&&
  registerOperator({
    operator: '&&',
    level: 2,
    fun: (a, b) => a && b
  })
  // 符号:||
  registerOperator({
    operator: '||',
    level: 1,
    fun: (a, b) => a || b
  })
export default myeval