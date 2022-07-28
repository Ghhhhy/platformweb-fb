// 词法分析器
// 词法分析面向的对象是单个的字符，目的是把它们组成有效的单词（字符串）
// 标识符（变量）、保留字(window对象、属性和方法)、常数、运算符(+,-,*,/,>,<,^)、界符((),",')
// 分析字符串是否符合js 条件判断规则
// 流程
// 1. 词法分析字符串
// 2. 对读取的文件进行预处理,从头到尾进行扫描,去除一些无用的、影响程序执行的符号如换行符、回车符、制表符等
// 3. 对源文件从头到尾进行扫描,排除空格；
// 4.最终形成一条转译后的从左往有的抽象语法树
// 例如：
// 字符串 'new Data().getTime() > 5000 || state.now'进行词法分析
// 传入 var state =  {now:'hahaha'};
// 通过词法分析成[{token:new Data().getTime()},{contrast:'>'},{link:'||'},token:'hahaha']
//

// 语法分析器
// 语法的分析则是利用词法分析的结果作为输入来分析是否符合语法规则并且进行语法制导下的语义分析，
// 最后产生四元组(中间代码)，进行优化（可有可无）之后最终生成目标代码
// 编译的2种形式：从上往下编译(高级语法匹配到低级，递归)，从下往上编译（低级语法匹配到高级，回溯）
// 此处采取从上往下编译
// 一个简易的非典型的语法分析
// 语法规则
// 1. 从左往右执行分权重,切割执行串递归每个执行项，作为一个树结构
// 字符串为root
// 1.1 首字符为(，
// 规则： 首个字符'（'计数为0，每遇到一个（计数+1，每遇到一个）计数-1，当计数为-为0是此部分为一个子项
// 1.2 若首字符不为(，
// 规则：1.2.1找到计数为0的连接符号（对比符号，>,||等），作为一个项，并用真实js连接符号连接前后2个子项
// 1.2.2 如果为 ||此项返回值为true,则父项返回为true
// 1.3 若上诉都未找到，
// 找到计数为0的运算符号(+,-,*,/)之前的作为一个项
// 1.4 若此时子项为一个单词
// 1.4.1 判断是否为对象变量，如果是则进行变量赋值；
// 1.4.2 判断是否为字符串，是则进行转译字符串转译；
// 1.4.3 判断是否为数字，是则进行数字的判断；
// 1.4.4 判断是否为window对象、属性和方法，是则进行相应window对象、属性和方法转译；
// 最终返回整体字符串的值

const a = 1
console.log(a)
const ast = {
  'type': 'Program',
  'start': 0,
  'end': 26,
  'body': [
    {
      'type': 'VariableDeclaration',
      'start': 0,
      'end': 11,
      'declarations': [
        {
          'type': 'VariableDeclarator',
          'start': 6,
          'end': 11,
          'id': {
            'type': 'Identifier',
            'start': 6,
            'end': 7,
            'name': 'a'
          },
          'init': {
            'type': 'Literal',
            'start': 10,
            'end': 11,
            'value': 1,
            'raw': '1'
          }
        }
      ],
      'kind': 'const'
    },
    {
      'type': 'ExpressionStatement',
      'start': 12,
      'end': 26,
      'expression': {
        'type': 'CallExpression',
        'start': 12,
        'end': 26,
        'callee': {
          'type': 'MemberExpression',
          'start': 12,
          'end': 23,
          'object': {
            'type': 'Identifier',
            'start': 12,
            'end': 19,
            'name': 'console'
          },
          'property': {
            'type': 'Identifier',
            'start': 20,
            'end': 23,
            'name': 'log'
          },
          'computed': false
        },
        'arguments': [
          {
            'type': 'Identifier',
            'start': 24,
            'end': 25,
            'name': 'a'
          }
        ]
      }
    }
  ],
  'sourceType': 'module'
}
