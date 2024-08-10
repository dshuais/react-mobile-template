module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  ignorePatterns: ['dist', 'node_modules'],
  parser: '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      impliedStrict: false, //全局strict模式
      'jsx': true, //启用 JSX
      modules: true
    },
    'ecmaVersion': 15,
    'sourceType': 'module'
  },
  plugins: ['react-refresh', 'prettier', '@typescript-eslint'],
  /**
   * 因为配置了eslint no-undef验证，所以手动配置全局变量，
   * 也可关闭no-undef: 'off'，关闭后会自动使用ts校验
   */
  // globals: {
  //   module: true,
  //   React: true,
  //   Res: true,
  //   Req: true,
  //   Window: true,
  //   App: true
  // },
  settings: {
    'react': {
      'version': 'detect'
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    // 屏蔽import/no-commonjs提示
    'import/no-commonjs': 'off',

    'react/jsx-uses-react': 'off',
    // 可能的错误
    // 这些规则与 JavaScript 代码中可能的语法错误或逻辑错误有关
    // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
    'for-direction': 'error',
    // getter 必须有返回值，并且禁止返回空，比如 return;
    'getter-return': [
      'error',
      {
        allowImplicit: false
      }
    ],
    // 禁止使用 console
    // @off console 的使用很常见
    'no-console': 'off',
    // 禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式
    'no-constant-condition': [
      'error',
      {
        checkLoops: false
      }
    ],
    // 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
    // @off 几乎不会遇到这种场景
    'no-control-regex': 'off',
    // @fixable 禁止使用 debugger
    'no-debugger': 'error',
    // 禁止出现空代码块，允许 catch 为空代码块，该规则忽略包含一个注释的语句块
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    // 禁止在普通字符串中出现模版字符串里的变量形式，如 'Hello ${name}!'
    'no-template-curly-in-string': 'error',

    //
    // 最佳实践
    // 这些规则通过一些最佳实践帮助你避免问题
    //
    // setter 必须有对应的 getter，getter 可以没有对应的 setter
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: false
      }
    ],
    // @fixable 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
    'dot-location': ['error', 'property'],
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    // switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
    'no-case-declarations': 'error',
    // 禁止修改原生对象
    'no-extend-native': 'error',
    // @fixable 表示小数时，禁止省略 0，比如 .5
    'no-floating-decimal': 'error',
    // 禁止在 setTimeout 或 setInterval 中传入字符串，如 setTimeout('alert("Hi!")', 100);
    'no-implied-eval': 'error',
    // 禁止使用没必要的 {} 作为代码块
    'no-lone-blocks': 'error',
    // 禁止在循环内的函数中出现循环体条件语句中定义的变量，比如：
    // for (var i = 0; i < 10; i++) {
    //     (function () { return i })();
    // }
    'no-loop-func': 'error',
    // @fixable 禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
        exceptions: {
          Property: true,
          BinaryExpression: false,
          VariableDeclarator: true,
          ImportDeclaration: true
        }
      }
    ],
    // 禁止使用 \ 来换行字符串
    'no-multi-str': 'error',
    // 禁止直接 new 一个类而不赋值
    'no-new': 'error',
    // 禁止在 return 语句里使用 await
    'no-return-await': 'error',
    // 禁止将自己与自己比较
    'no-self-compare': 'error',
    // 禁止无用的表达式
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    // 禁止出现没必要的字符串连接
    'no-useless-concat': 'error',
    // 禁止出现没必要的转义
    // @off 转义可以使代码更易懂
    'no-useless-escape': 'off',
    // @fixable 必须使用 if (foo === 5) 而不是 if (5 === foo)
    yoda: [
      'error',
      'never',
      {
        onlyEquality: true
      }
    ],

    //
    // 严格模式
    // 这些规则与严格模式指令有关
    //
    // @fixable 禁止使用 'strict';
    strict: ['error', 'global'],

    //
    // 变量
    // 这些规则与变量申明有关
    //
    // 禁止使用保留字作为变量名
    'no-shadow-restricted-names': 'error',
    // 禁止使用未定义的变量
    'no-undef': 'off',
    // [
    //   'error',
    //   {
    //     typeof: false
    //   }
    // ],
    // 定义过的变量必须使用  因为使用了ts所以关闭eslint默认检查 使用@typescript-eslint/no-unused-vars去控制
    'no-unused-vars': 'off',
    // [
    //   'error',
    //   {
    //     vars: 'all',
    //     args: 'none',
    //     caughtErrors: 'none',
    //     ignoreRestSiblings: true
    //   }
    // ],

    //
    //
    // 风格问题
    // 这些规则与代码风格有关，所以是非常主观的
    //
    // @fixable 数组的括号内的前后禁止有空格
    'array-bracket-spacing': ['error', 'never'],
    // @fixable 代码块如果在一行内，那么大括号内的首尾必须有空格，比如 function () { alert('Hello') }
    'block-spacing': ['error', 'always'],
    // @fixable if 与 else 的大括号风格必须一致
    'brace-style': 'error',
    // @fixable 对象的最后一个属性末尾不能有逗号
    'comma-dangle': ['error', 'never'],
    // @fixable 逗号前禁止有空格，逗号后必须要有空格
    'comma-spacing': 'error',
    // @fixable 禁止在行首写逗号
    'comma-style': 'error',
    // @fixable 用作对象的计算属性时，中括号内的首尾禁止有空格
    'computed-property-spacing': 'error',
    // @fixable 函数名和执行它的括号之间禁止有空格
    'func-call-spacing': 'error',
    // @fixable 函数括号内的参数不可换行
    'function-paren-newline': ['error', 'multiline'],
    // @fixable 隐式返回表达式的箭头函数需要在箭头同一行显示函数体部分
    'implicit-arrow-linebreak': ['error', 'beside'],
    // @fixable 一个缩进必须用2个空格替代
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    // @fixable jsx 中的属性必须用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // @fixable 对象字面量中冒号前面禁止有空格，后面必须有空格
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict'
      }
    ],
    // @fixable 关键字前后必须有空格
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          if: {
            after: false
          },
          for: {
            after: false
          },
          while: {
            after: false
          },
          catch: {
            after: false
          }
        }
      }
    ],
    // @fixable 类成员之间要有空行
    'lines-between-class-members': 'error',
    // 代码块嵌套的深度禁止超过 5 层
    'max-depth': ['error', 5],
    // new 后面的类名必须首字母大写
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        properties: true
      }
    ],
    // @fixable new 后面的类必须有小括号 var person = new Person();
    'new-parens': 'error',
    // 禁止使用 Array 构造函数
    'no-array-constructor': 'error',
    // @fixable 禁止出现超过1行的连续空行
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 1
      }
    ],
    // 禁止直接 new Object
    'no-new-object': 'error',
    // @fixable 禁止行尾有空格
    'no-trailing-spaces': 'error',
    // @fixable 使用 bar || 1 替代 bar ? bar : 1;
    'no-unneeded-ternary': 'error',
    // @fixable 禁止属性前有空格，比如 foo. bar()
    'no-whitespace-before-property': 'error',
    // @fixable 禁止 if 后面不加大括号而写两行代码
    'nonblock-statement-body-position': [
      'error',
      'beside',
      {
        overrides: {
          while: 'below'
        }
      }
    ],
    // @fixable 大括号内的首尾必须有换行
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true
      }
    ],
    // @fixable 强制在花括号中使用一致的空格
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: true,
        objectsInObjects: false
      }
    ],
    // @fixable 必须使用单引号，禁止使用双引号
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    // @fixable 结尾必须有分号
    semi: [
      'error',
      'always',
      {
        omitLastInOneLineBlock: true
      }
    ],
    // @fixable 一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    // @fixable 分号必须写在行尾，禁止在行首出现
    'semi-style': ['error', 'last'],
    // @fixable if, function 等的大括号之前必须要有空格，比如 if(a) {
    'space-before-blocks': ['error', 'always'],
    // @fixable function 的小括号之前不可以有空格, 箭头函数除外(比如 async () => {})
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    // @fixable 小括号内的首尾禁止有空格
    'space-in-parens': ['error', 'never'],
    // @fixable 操作符左右必须有空格，比如 let sum = 1 + 2;
    'space-infix-ops': 'error',
    // @fixable new, typeof 等后面必须有空格，++, -- 等禁止有空格，比如：
    // let foo = new Person();
    // bar = bar++;
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false
      }
    ],
    // @fixable case 的冒号前禁止有空格，冒号后必须有空格
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false
      }
    ],
    // @fixable 模版字符串的 tag 之后禁止有空格，比如 tag`Hello World`
    'template-tag-spacing': ['error', 'never'],

    //
    //
    // ECMAScript 6
    // 这些规则与 ES6（即通常所说的 ES2015）有关
    //
    // @fixable 箭头函数的箭头前后必须有空格
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true
      }
    ],
    // @fixable generator 的 * 前面禁止有空格，后面必须有空格
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    // 禁止对定义过的 class 重新赋值
    'no-class-assign': 'error',
    // @fixable 禁止出现难以理解的箭头函数，比如 let x = a => 1 ? 2 : 3
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true
      }
    ],
    // 禁止重复 import 模块
    'no-duplicate-imports': 'error',
    // @fixable 禁止出现没必要的计算键名，比如 let a = { ['0']: 0 };
    'no-useless-computed-key': 'error',
    // 禁止出现没必要的 constructor，比如 constructor(value) { super(value) }
    'no-useless-constructor': 'error',
    // @fixable 禁止解构时出现同样名字的的重命名，比如 let { foo: foo } = bar;
    'no-useless-rename': 'error',
    // @fixable 禁止使用 var
    'no-var': 'error',
    // @fixable ... 的后面禁止有空格
    'rest-spread-spacing': ['error', 'never'],
    // 创建 Symbol 时必须传入参数
    'symbol-description': 'error',
    // @fixable ${name} 内的首尾禁止有空格
    'template-curly-spacing': ['error', 'never'],
    // @fixable yield* 后面必须要有空格
    'yield-star-spacing': ['error', 'after'],

    /**
       * ESLint 规则 - React
       *
       * @fixable 表示此配置支持 --fix
       * @off 表示此配置被关闭了，并且后面说明了关闭的原因
       * */
    // @off 禁止使用 findDOMNode，偶尔需要用到真实DOM
    'react/no-find-dom-node': 'off',
    // @off 禁止使用已废弃的 api, 你连componentWillMount都报错，不禁你禁谁
    'react/no-deprecated': 'off',
    // 禁止拼写错误
    'react/no-typos': 'error',
    // @off 禁止使用字符串 ref， 没必要禁止
    'react/no-string-refs': 'off',
    // 组件必须写 propTypes
    // @off 不强制要求写 propTypes
    'react/prop-types': 'off',
    // 出现 jsx 的地方必须 import React
    // @off 已经在 no-undef 中限制了
    'react/react-in-jsx-scope': 'off',
    // @off 允许直接修改state
    'react/no-direct-mutation-state': 'off',
    // @fixable 组件或html元素内无children的时候，使用自闭合
    'react/self-closing-comp': [
      'error',
      {
        'component': true,
        'html': true
      }
    ],
    'react/display-name': 'off',
    // @fixable 组件内方法必须按照一定规则排序
    'react/sort-comp': [
      'error',
      {
        order: [
          'defaultProps',
          'static-methods',
          'constructor',
          'everything-else',
          'lifecycle',
          'render'
        ]
      }
    ],
    // @fixable 组件自闭合标签的位置
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    // @fixable props 与 value 之间的等号前后禁止有空格
    'react/jsx-equals-spacing': ['error', 'never'],
    // @fixable 第一个props是否需要换行，仅1个props并且组件不存在换行的时候才单行显示
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    // 数组中的 jsx 必须有 key
    'react/jsx-key': 'error',
    // @fixable 限制每行的 props 数量，一行最多一个
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 1,
        when: 'multiline'
      }
    ],
    // 禁止使用 target="_blank"
    // @off 没必要限制
    'react/jsx-no-target-blank': 'off',
    // @fixable 每行最多显示一个JSX 元素，
    // @off 开启这个可能会导致页面结构很难看
    'react/jsx-one-expression-per-line': 'off',
    // @fixable 所有元素的属性之间不允许存在多个空格，最多1个
    'react/jsx-props-no-multi-spaces': 'error',
    // @fixable jsx 的开始和闭合处禁止有空格
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never'
      }
    ],
    // 不检查effect的依赖
    'react-hooks/exhaustive-deps': 'off',

    /**
     * ts 规则
     */
    // 关闭对any的警告
    '@typescript-eslint/no-explicit-any': ['off'],
    // 定义过的变量必须使用
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true
      }
    ]
  }
};
