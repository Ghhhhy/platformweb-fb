<script>
export default {
  props: {
    render: {
      type: Function,
      default: undefined
    }
  },
  render(h) {
    console.log('customerRender', this.$props)
    return h(this.$props.render())
  }
}
</script>
