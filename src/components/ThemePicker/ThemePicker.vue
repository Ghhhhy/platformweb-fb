<template>
  <el-color-picker
    ref="picker"
    v-model="theme"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
const ORIGINAL_THEME = '#4d77e7' // default color
export default {
  data() {
    return {
      cachedStyle: '', // content of adjust css
      theme: '#4d77e7',
      publicPath: process.env.NODE_ENV === 'production' ? './' : './'
    }
  },
  computed: {},
  watch: {
    theme(val) {
      this.changeTheme(val)
    }
  },
  methods: {
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },
    getCSSString(url, variable, $message) {
      return new Promise((resolve, reject) => {
        const adjustTheme = localStorage.getItem('__bossui__adjust_theme__')
        if (adjustTheme !== null) {
          this[variable] = adjustTheme
          resolve()
        }
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            localStorage.setItem('__bossui__adjust_theme__', this[variable])
            resolve()
          } else if (xhr.readyState === 4) {
            $message.close()
            this.$XModal.message({ status: 'error', message: '切换主题失败' })
            reject(new Error('切换主题失败了'))
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))
          // let brightness = (299 * red + 587 * green + 114 * blue) / 1000
          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)
          // console.log(`#${red}${green}${blue}-----${brightness}`)
          return `#${red}${green}${blue}`
        }
      }
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)
        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)
        return `#${red}${green}${blue}`
      }
      const clusters = [theme]
      for (let i = 0; i <= 25; i++) {
        clusters.push(tintColor(theme, Number((i / 25).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    },
    async changeTheme(primaryColor) {
      // let oldTheme = localStorage.getItem('__bossui__colortheme__') || ORIGINAL_THEME
      // const oldVal = this.cachedStyle ? oldTheme : ORIGINAL_THEME
      if (typeof primaryColor !== 'string') return
      const themeCluster = this.getThemeCluster(primaryColor.replace('#', ''))
      // const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      const $message = this.$message({
        message: '切换主题中',
        customClass: 'theme-message',
        type: 'info',
        duration: 0,
        iconClass: 'ri-loader-4-line roll'
      })
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerHTML = newStyle
        }
      }
      if (!this.cachedStyle) {
        const url = this.publicPath + '/static/css/defaultTheme.css'
        await this.getCSSString(url, 'cachedStyle', $message)
      }
      const chalkHandler = getHandler('cachedStyle', 'adjust-style-roy')
      chalkHandler()
      // const styles = [].slice.call(document.querySelectorAll('style'))
      //   .filter(style => {
      //     const text = style.innerText
      //     return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
      //   })
      // styles.forEach(style => {
      //   const { innerText } = style
      //   if (typeof innerText !== 'string') return
      //   style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      // })
      this.$emit('change', primaryColor)
      localStorage.setItem('__bossui__colortheme__', primaryColor)
      $message.close()
    },
    showPicker() {
      this.$el.querySelector('.el-color-picker__trigger').click()
    }
  }
}
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker.el-color-picker {
  height: 16px !important;
}

.theme-picker .el-color-picker__trigger {
  width: 15px !important;
  height: 16px !important;
  box-shadow: 1px 1px 1px #21212188 inset;
  display: inline-block;
  margin-right: 5px;
  position: relative;
  top: 3px;
  border-radius: 2px;
  padding: 0;
  border: none;
}

.theme-picker .el-color-picker__color {
  border: none;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
