/*
 * @Author: 轻语
 * @Date: 2021-11-10 11:47:04
 * @LastEditors: 轻语
 * @LastEditTime: 2021-11-30 11:04:11
 * @Description:
 */
export default {
  props: {
    keyboardConfig: {
      type: Object,
      default () {
        return {
          isArrow: true,
          isDel: true,
          isEnter: false,
          isTab: false,
          isEdit: false
        }
      }
    }
  },
  watch: {
    keyboardConfig: { // 键盘配置
      // mouse-config 鼠标配置：
      //   | Mouse + Left | (area) 鼠标选取指定范围的单元格 |
      //   | Mouse + Right | (area) 鼠标选取选中位置的单元格 |
      //   | Mouse + Left + Ctrl | (area) 鼠标选取多区域的单元格 |
      //   | Mouse + Left | (extension) 鼠标左键按住区域内右下角延伸按钮，将区域横向或纵向扩大 |
      // keyboard-config 按键配置：
      //   | Ctrl + X | (isClip) 将单元格标记为剪贴状态并将内容复制到剪贴板，支持 Excel 和 WPS |
      //   | Ctrl + C | (isClip) 将单元格标记为复制状态并将内容复制到剪贴板，支持 Excel 和 WPS |
      //   | Ctrl + V | (isClip) 将剪贴板的内容粘贴到指定区域中，支持 Excel 和 WPS |
      //   | Ctrl + M | (isMerge) 将选取的单元格合并或取消合并 |
      //   | Ctrl + F | (isFNR) 查找单元格数据，全表或查找指定区域单元格数据 |
      //   | Ctrl + H | (isFNR) 替换单元格数据，全表或替换指定区域单元格数据 |
      //   | ArrowUp | （isArrow）如果存在，则移动到上面的单元格 |
      //   | Shift + ArrowUp | （isArrow）如果存在，则往上面延伸单元格区域 |
      //   | ArrowDown | （isArrow）如果存在，则移动到下面的单元格 |
      //   | Shift + ArrowDown | （isArrow）如果存在，则往下面延伸单元格区域 |
      //   | ArrowLeft | （isArrow）如果存在，则移动到左边的单元格 |
      //   | Shift + ArrowLeft | （isArrow）如果存在，则往左边延伸单元格区域 |
      //   | ArrowRight | （isArrow）如果存在，则移动到右边的单元格 |
      //   | Shift + ArrowRight | （isArrow）如果存在，则往右边延伸单元格区域 |
      //   | Tab | （isTab）如果存在，则移动到右边单元格；如果存在区域，则在指定区域内移动；如果移动到最后一列，则从下一行开始移到，以此循环 |
      //   | Tab + Shift | （isTab）如果存在，则移动到左边单元格，则在指定区域内移动；如果移动到第一列，则从上一行开始移到，以此循环 |
      //   | Spacebar | (isChecked) 如果选取的区域存在复选框，则切换勾选状态 |
      //   | Enter | （isEnter）如果存在，取消单元格编辑并移动到下面的单元格，则在指定区域内移动；如果移动到最后一行，则从下一列开始移到，以此循环 |
      //   | Enter + Shift | （isEnter）如果存在，取消单元格编辑并移动到上面的单元格，则在指定区域内移动；如果移动到第一行，则从上一列开始移到，以此循环 |
      //   | Delete | （isDel）清空单元格内容 |
      //   | Backspace | （isDel）清空单元格内容并激活为编辑状态 |
      //   | F2 | 如果存在，激活单元格为编辑状态 |
      //   | Escape | 如果存在，取消单元格编辑状态 |
      //   | * | （isEdit）按下除功能键之外的任意键激活覆盖式单元格编辑 |
      handler(newvalue, oldValue) {
        this.keyboardConfigIn = Object.assign(this.keyboardConfigIn, this.keyboardConfig)
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      keyboardConfigIn: { // keyboardConfig
        type: Object,
        default: () => {
          return {
            isArrow: true,
            isDel: true,
            isEnter: false,
            isTab: false,
            isEdit: false,
            delMethod(obj) {
              this.keyboardDelMethod(obj)
            },
            backMethod(obj) {
              this.keyboardBackMethod(obj)
            },
            editMethod(obj) {
              this.keyboardEditMethod(obj)
            }
          }
        }
      }
    }
  },
  methods: {
    keydown(obj) {
      // 添加enter 切换下一个编辑单元格
      // let self = this
      // let event = obj.event || window.event
      // const { xGrid } = self.$refs
      // const { row, rowIndex, column } = xGrid.getActiveRecord()
      // if (event.keyCode === 13 && row !== null) {
      //   const { fullData } = self.getTableData()
      //   let indexof = self.tableColumnsSingEditFieldArr.indexOf(column.property)
      //   if (indexof + 1 < self.tableColumnsSingEditFieldArr.length) {
      //     xGrid.setActiveCell(row, self.tableColumnsSingEditFieldArr[indexof + 1])
      //   } else {
      //     xGrid.setCurrentRow(fullData[rowIndex + 1]).then(() => {
      //       xGrid.setActiveCell(fullData[rowIndex + 1], self.tableColumnsSingEditFieldArr[0])
      //     })
      //   }
      // } else {
      this.$emit('keydown', obj, this, this.$refs.xGrid)
      this.$emit('ProxyEvent', 'keydown', obj, this, this.$refs.xGrid)
      // }
    }, // 当表格被激活且键盘被按下时会触发的事件  { $event }
    keyboardDelMethod(obj) {
      this.performTableDataCalculate(obj).then(({ row }) => {
        this.$emit('keyboardDelMethod', obj, this, this.$refs.xGrid)
        this.$emit('ProxyEvent', 'keyboardDelMethod', obj, this, this.$refs.xGrid)
      })
    },
    keyboardBackMethod(obj) {
      this.performTableDataCalculate(obj).then(({ row }) => {
        this.$emit('keyboardBackMethod', obj, this, this.$refs.xGrid)
        this.$emit('ProxyEvent', 'keyboardBackMethod', obj, this, this.$refs.xGrid)
      })
    },
    keyboardEditMethod(obj) {
      this.performTableDataCalculate(obj).then(({ row }) => {
        this.$emit('keyboardEditMethod', obj, this, this.$refs.xGrid)
        this.$emit('ProxyEvent', 'keyboardEditMethod', obj, this, this.$refs.xGrid)
      })
    }
  }
}
