<template>
  <div class="global-setting">
    <el-drawer
      :show-close="false"
      :visible.sync="drawer"
      direction="rtl"
    >
      <el-container class="height-all">
        <el-main>
          <el-row>
            <BsTitle type="left">
              <template slot="default">
                界面设置
              </template>
            </BsTitle>
          </el-row>
          <el-row>
            <BsForm
              ref="form"
              class="setting-form"
              :is-editable="true"
              :form-gloabal-config="formGloabalConfig"
              :form-items-config="formItemsConfig"
              :form-data-list="globalSetting"
              @itemChange="itemChange"
            />
          </el-row>
          <el-row>
            <div>界面缩放比率(更推荐使用浏览器自带的缩放功能&lt;<kbd>Ctrl</kbd>+<kbd>+</kbd>/<kbd>-</kbd>&gt;)</div>
            <el-input-number
              v-model="zoomSize"
              :precision="2"
              :step="0.05"
              :max="1.4"
              :min="0.7"
              size="small"
            />
          </el-row>
        </el-main>
      </el-container>
    </el-drawer>
    <div class="right-setting" :class="drawer ? 'right-top' : ''" @click="onSettingClick">
      <i :class="drawer ? 'ri-close-fill' : 'ri-settings-3-fill'"></i>
      <span>{{ drawer ? '关闭' : '设置' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSetting',
  data() {
    return {
      drawer: false,
      zoomSize: 1.0,
      formItemsConfig: [
        {
          field: 'bs_table_style',
          title: '表格布局样式',
          span: 24,
          align: 'left',
          itemRender: {
            name: '$vxeSelect',
            props: {
              size: 'mini'
            },
            options: [
              {
                label: '适中（默认）',
                value: 'middle'
              },
              {
                label: '紧凑',
                value: 'narrow'
              },
              {
                label: '宽松',
                value: 'wide'
              }
            ]
          }
        },
        {
          field: 'bs_table_border',
          title: '表格边框样式',
          span: 24,
          align: 'left',
          itemRender: {
            name: '$vxeSelect',
            props: {
              size: 'mini'
            },
            options: [
              {
                label: '无',
                value: 'transparent'
              },
              {
                label: '浅',
                value: '#e8eaec'
              },
              {
                label: '适中（默认）',
                value: '#aaaaaa'
              },
              {
                label: '深',
                value: '#212121'
              }
            ]
          }
        },
        {
          field: 'bs_tree_style',
          title: '左侧树布局样式',
          span: 24,
          align: 'left',
          itemRender: {
            name: '$vxeSelect',
            props: {
              size: 'mini'
            },
            options: [
              {
                label: '适中（默认）',
                value: 'middle'
              },
              {
                label: '紧凑',
                value: 'narrow'
              },
              {
                label: '宽松',
                value: 'wide'
              }
            ]
          }
        },
        {
          field: 'bs_modal_style',
          title: '弹框标题栏样式',
          span: 24,
          align: 'left',
          itemRender: {
            name: '$vxeSelect',
            props: {
              size: 'mini'
            },
            options: [
              {
                label: '浅色（默认）',
                value: 'light'
              },
              {
                label: '深色',
                value: 'deep'
              }
            ]
          }
        }
      ],
      globalSetting: {
        bs_table_style: 'middle',
        bs_tree_style: 'middle',
        bs_table_border: '#aaaaaa',
        bs_modal_style: 'light'
      },
      formGloabalConfig: {
        titleAlign: 'left'
      }
    }
  },
  methods: {
    onSettingClick() {
      this.drawer = !this.drawer
    },
    itemChange({ data }) {
      this.initStyleConfig(data)
      localStorage.setItem('__boss__globalSetting__', JSON.stringify(data))
    },
    initGlobalSettingConfig() {
      let globalSetting = localStorage.getItem('__boss__globalSetting__')
      if (globalSetting) {
        this.globalSetting = JSON.parse(globalSetting)
        this.zoomSize = this.globalSetting.zoomSize || 1.0
        this.initStyleConfig(this.globalSetting)
      }
    },
    initStyleConfig(globalSetting) {
      let root = document.querySelector(':root')
      // root.style.setProperty('--blue', 'lightblue');
      const calcFunc = {
        bs_table_style: (value) => {
          switch (value) {
            case 'middle':
              root.style.setProperty('--bs-table-font-size', '14px')
              root.style.setProperty('--bs-table-line-height', '32px')
              break
            case 'narrow':
              root.style.setProperty('--bs-table-font-size', '11px')
              root.style.setProperty('--bs-table-line-height', '25px')
              break
            case 'wide':
              root.style.setProperty('--bs-table-font-size', '16px')
              root.style.setProperty('--bs-table-line-height', '36px')
              break
            default:
              break
          }
        },
        bs_tree_style: (value) => {
          switch (value) {
            case 'middle':
              root.style.setProperty('--bs-tree-font-size', '14px')
              root.style.setProperty('--bs-tree-line-height', '32px')
              break
            case 'narrow':
              root.style.setProperty('--bs-tree-font-size', '11px')
              root.style.setProperty('--bs-tree-line-height', '25px')
              break
            case 'wide':
              root.style.setProperty('--bs-tree-font-size', '16px')
              root.style.setProperty('--bs-tree-line-height', '36px')
              break
            default:
              break
          }
        },
        bs_table_border: (value) => {
          root.style.setProperty('--table-border-color', value)
        },
        bs_modal_style: (value) => {
          switch (value) {
            case 'light':
              document.body.style.setProperty('--bs-modal-background', 'var(--hightlight-color)')
              document.body.style.setProperty('--bs-modal-font-color', '#606266')
              document.body.style.setProperty('--bs-modal-close-hover', 'var(--primary-color)')
              break
            case 'deep':
              document.body.style.setProperty('--bs-modal-background', 'var(--primary-color)')
              document.body.style.setProperty('--bs-modal-font-color', '#333333')
              document.body.style.setProperty('--bs-modal-close-hover', 'rgba(255, 255, 255, 0.8)')
              break
          }
        }
      }
      for (let key of Object.keys(globalSetting)) {
        if (calcFunc[key]) {
          calcFunc[key](globalSetting[key])
        }
      }
    },
    setZoomSize() {
      let root = document.querySelector(':root')
      root.style.setProperty('--bs-zoom', this.zoomSize)
      if (this.$refs.form) {
        let globalSetting = this.$refs.form.getFormData()
        globalSetting.zoomSize = this.zoomSize
        localStorage.setItem('__boss__globalSetting__', JSON.stringify(globalSetting))
      }
    }
  },
  computed: {
    isHomePage() {
      return this.$route.fullPath.indexOf('HomeCard') !== -1
    }
  },
  mounted() {
    this.initGlobalSettingConfig()
  },
  watch: {
    // isHomePage(newVal) {
    //   if (newVal) {
    //     this.initGlobalSettingConfig()
    //   }
    // }
    zoomSize(newVal) {
      this.setZoomSize()
    }
  }
}
</script>

<style lang="scss">
.right-setting {
  z-index: 1000;
  width: 45px;
  height: 10px;
  position: fixed;
  top: 50%;
  right: -40px;
  padding: 10px;
  background: var(--zebra-color);
  border-radius: 20px 0 0 20px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  align-self: baseline;
  border: 1px solid var(--hightlight-color);
  box-shadow: 6px 8px 25px -12px rgba(86,86,86,0.75);
  transition: all 0.3s;
  cursor: pointer;
  box-sizing: content-box;
  i {
    font-size: 14px;
  }
  span {
    font-size: 10px;
    line-height: 10px;
    padding-left: 3px;
  }
  &.right-top {
    top: 25px;
    right: 0;
  }
  &:hover {
    right: 0;
  }
}
.global-setting {
  .el-drawer__wrapper {
    z-index: 100!important;
  }
  kbd {
    background-color: hsl(0deg, 0%, 99%);
    border-radius: 3px;
    border: 1px solid hsl(0deg, 0%, 80%);
    padding: 4px 5px;
    font-weight: bold;
  }
}
.setting-form {
  .vxe-form.size--medium .vxe-form--item-inner {
    display: grid;
  }
  .vxe-form--item-title {
    font-size: 10px;
    text-align: left!important;
  }
  .vxe-form--item {
    float: inherit!important;
  }
}
</style>
