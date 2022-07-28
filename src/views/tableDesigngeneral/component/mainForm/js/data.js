export default function () {
  // let self = this
  return {
    leftVisible: false,
    treeDataMap: {},
    sortable: null,
    advanceAttrVisible: false,
    overviewVisible: false,
    childrenRowVisible: true,
    advanceType: '1', // 高级属性类型：1-表，2-列
    curColId: '', // 当前选中列ID
    modifyStatus: '', // 编辑状态：新增:insert/复制:copy/修改:update
    saveVisible: false,
    tableIndex: 0,
    tableFixNum: 1,
    curSplitPaneTopWidth: 25,
    btmVisible: true,
    curDicInfoId: null, // 当前数据字典ID
    tableConfig: {},
    tableEditRules: {},
    currentRow: null,
    formGloabalConfigIn: {},
    queryFormItemConfigIn: [],
    queryFormData: {},
    tableData: [],
    tableCols: [],
    formValidationConfig: {},
    tableKeyboardConfig: {},
    tabList: [
      {
        label: '表头设计',
        code: 'deDesignThead'
      },
      {
        label: '表体设计',
        code: 'deDesignTbody'
      }
    ],
    defaultSelect: {
      label: '设计表列',
      code: 'deDesignThead'
    },
    configBasicInfo: {},
    tableTbodyConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox', // hasCheckbox
        seq: true, // 序号列
        rowDrop: true,
        optionSort: false
      }
    },
    tableTbodyColumns: [],
    tableTbodyData: [],
    beforeCopyBasicInfo: {},
    // calculateConstraintConfigIn: { // 约束，取数，单元格计算配置
    //   gradedSummaryFields: [],
    //   calcAndConstraintItemCodeField: 'itemCode', // 配置了rowCodeFormulaConfig等时使用的itemcode行坐标字段名
    //   rowCodeFormulaConfig: {
    //   },
    //   colFormulaConfig: { // 列公式配置
    //   },
    //   getDataConfig: { // 取数配置
    //   },
    //   constraintConfig: { // 表间约束配置
    //   }
    // },
    calculateConstraintConfigSource: {
      calcAndConstraintItemCodeField: 'itemCode',
      colFormulaConfig: { // 列公式配置
      },
      getDataConfig: { // 取数配置
      },
      rowCodeFormulaConfig: {},
      constraintConfig: { // 表间约束配置
      }
    },
    viewGetDataOrFormulaConfig: {

    },
    theadRenderLevels: 1,
    viewGetDataOrFormulaDialogVisible: false,
    itemEditStatusConfig: { // 项编辑配置
      curEditItem: '',
      editItemMap: {
        basicInfoEditConfig: '报表基础信息和配置',
        tableTheadEditConfig: '表头配置',
        tableTbodyEditConfig: '表体配置',
        getDataConfigEditConfig: '表体单元格取数配置',
        rowCodeFormulaConfigEditConfig: '表体单元格公式配置',
        constraintConfigEditConfig: '表体单元格约束配置'
      },
      editItemMapTable: {
        basicInfoEditConfig: '表单基础信息和配置',
        tableTheadEditConfig: '表单项配置',
        tableTbodyEditConfig: '表单项数据配置',
        getDataConfigEditConfig: '表单项取数配置'
      },
      editItems: ['basicInfoEditConfig', 'tableTbodyEditConfig', 'tableTheadEditConfig', 'getDataConfigEditConfig', 'rowCodeFormulaConfigEditConfig', 'constraintConfigEditConfig'],
      editConfigItems: ['getDataConfigEditConfig', 'rowCodeFormulaConfigEditConfig', 'constraintConfigEditConfig'],

      basicInfoEditConfig: false,
      basicInfoEditConfigEditing: true,

      tableTbodyEditConfig: false,
      tableTbodyEditConfigEditing: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return true
        }
      },

      tableTheadEditConfig: false,
      tableTheadEditConfigEditing: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return true
        }
      },

      getDataConfigEditConfig: false,
      getDataConfigEditConfigEditing: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return false
        }
      },

      rowCodeFormulaConfigEditConfig: false,
      rowCodeFormulaConfigEditConfigEditing: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return false
        }
      },

      constraintConfigEditConfig: false,
      constraintConfigEditConfigEditing: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return false
        }
      }
    },

    tableHeightConfig: {
      basicInfoEditConfig: '1000px',
      tableTheadEditConfig: '1000px',
      tableTbodyEditConfig: '1000px',
      getDataConfigEditConfig: '1000px',
      rowCodeFormulaConfigEditConfig: '1000px',
      constraintConfigEditConfig: '1000px'
    },

    getDataConfigTableConfig: {},
    getDataConfigColumns: [],
    getDataConfigBodyData: [],
    tableTbodyEditRules: {
      itemCode: [
        {
          message: '项目编码只能为数字，不能为空，不能重复！',
          trigger: 'change',
          required: true,
          validator: ({ $table, cellValue, rule, rules, row, rowIndex, column, columnIndex }) => {
            return new Promise((resolve, reject) => {
              let result = ''
              let mapObj = {}
              if (!cellValue) {
                result = '项目编码只能为数字，不能为空，不能重复！'
              } else if (!/^[0-9]{1,}$/ig.test(cellValue)) {
                result = '项目编码只能为数字'
              } else {
                $table.tableFullData.map((item) => {
                  if (!mapObj[item.itemCode]) {
                    mapObj[item.itemCode] = 1
                  } else {
                    if ((cellValue === item.itemCode)) {
                      result = '当前项目编码' + cellValue + '重复'
                    }
                  }
                })
              }
              if (!result) {
                resolve(true)
              } else {
                reject(new Error(result))
              }
            })
          }
        }
      ],
      itemName: [
        {
          message: '请输入项目名称',
          trigger: 'change',
          required: true
        }
      ]
    },

    rowCodeFormulaConfigTableConfig: {},
    rowCodeFormulaConfigColumns: [],
    rowCodeFormulaConfigBodyData: [],

    constraintConfigTableConfig: {},
    constraintConfigColumns: [],
    constraintConfigBodyData: [],

    configCellFormulaTableTbodyColumns: [],
    configCellFormulaTableTbodyData: [],
    configGetDataDialogVisible: false,
    configCellFormulaVisible: false,
    configConstraintVisible: false,

    dynamicTbodyDialogVisible: false
  }
}
