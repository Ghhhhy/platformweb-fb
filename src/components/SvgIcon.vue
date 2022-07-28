<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: [String, Object, Array],
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    },
    svgClass() {
      if (typeof this.className === 'string') {
        return 'svg-icon ' + this.className
      }
      if (Array.isArray(this.className)) {
        return 'svg-icon ' + this.className.join(' ')
      }
      if (this.className instanceof Object) {
        return 'svg-icon ' + Object(this.className).keys.join(' ')
      }
      return 'svg-icon'
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.name}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .svg-icon {
      width: 1.5em;
      height: 1.5em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }

  .svg-external-icon {
      background-color: currentColor;
      mask-size: cover!important;
      display: inline-block;
  }
</style>
