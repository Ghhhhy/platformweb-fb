// keep-alive  Author:Titans@2396757591@qq.com -->
export default {
  name: 'BsKeepAlive',
  // abstract: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    cacheKeyType: {
      type: [String],
      default() {
        return 'routerName' // componetName
      }
    },
    max: [String, Number]
  },

  created() {
    this.cache = Object.create(null)
    this.keys = []
  },
  destroyed() {
    for (const key in this.cache) {
      this.pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  mounted() {
    this.$watch('include', val => {
      this.pruneCache(this, name => this.matches(val, name))
    })
    this.$watch('exclude', val => {
      this.pruneCache(this, name => !this.matches(val, name))
    })
  },
  methods: {
    remove(arr, item) { // 移除某个元素
      if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
          return arr.splice(index, 1)
        }
      }
    },
    isRegExp(v) { // 是否正则
      return Object.prototype.toString.call(v).slice(8, -1) === 'RegExp'
    },
    isDef(v) { // 是不是undefined
      return v !== undefined && v !== null
    },
    isAsyncPlaceholder(node) {
      return node.isComment && node.asyncFactory
    },
    getFirstComponentChild(children) {
      const { isDef, isAsyncPlaceholder } = this
      if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
          const c = children[i]
          if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
            return c
          }
        }
      }
    },
    getComponentName(opts) {
      return opts && (opts.Ctor.options.name || opts.tag)
    },
    matches(pattern, name) {
      const { isRegExp } = this
      if (Array.isArray(pattern)) {
        return pattern.indexOf(name) > -1
      } else if (typeof pattern === 'string') {
        return pattern.split(',').indexOf(name) > -1
      } else if (isRegExp(pattern)) {
        return pattern.test(name)
      }
      /* istanbul ignore next */
      return false
    },
    pruneCache(keepAliveInstance, filter) {
      const { getComponentName, pruneCacheEntry } = this
      const { cache, keys, _vnode } = keepAliveInstance
      for (const key in cache) {
        const cachedNode = cache[key]
        if (cachedNode) {
          const name = getComponentName(cachedNode.componentOptions)
          if (name && !filter(name)) {
            pruneCacheEntry(cache, key, keys, _vnode)
          }
        }
      }
    },
    pruneCacheEntry(cache, key, keys, current) {
      const { remove } = this
      const cached = cache[key]
      if (cached && (!current || cached.tag !== current.tag)) {
        cached.componentInstance.$destroy()
      }
      cache[key] = null
      remove(keys, key)
    },
    destroy(key) {
      this.pruneCacheEntry(this.cache, key, this.keys)
    },
    update(key) {
      const { cache, keys, pruneCacheEntry } = this
      const slot = this.$slots.default
      const vnode = this.getFirstComponentChild(slot)
      pruneCacheEntry(this.cache, key, this.keys)
      keys.push(key)
      cache[key] = vnode
    }
  },
  render() {
    const { matches, getComponentName, pruneCacheEntry, remove, cache, keys } = this
    const slot = this.$slots.default
    const vnode = this.getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name = this.cacheKeyType === 'routerName' ? this.$route.name : getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        (include && (!name || !matches(include, name))) ||
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }
      let ifCache = this.cacheKeyType === 'routerName' ? this.$route.meta.keepAlive : true
      let key = vnode.key == null
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (this.cacheKeyType === 'routerName') {
        key = this.$route.name
      }
      if (ifCache) {
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance
          remove(keys, key)
          keys.push(key)
        } else {
          cache[key] = vnode
          keys.push(key)
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode)
          }
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
