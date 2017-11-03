import Vue from 'vue'

export const defaults = {
  type: 'component',
  active: 'auto',
  debug: true
}

function comment (type, value) {
  return ` ${type}: ${value} `
}

function init (options) {
  options = Object.assign(defaults, options)
  options.active = options.active === 'auto'
    ? process.env.NODE_ENV !== 'production'
    : !!options.active

  const { type, active, debug } = options

  if (!active) {
    return
  }

  Vue.mixin({
    mounted () {
      if (this.$vnode) {
        // variables
        const file = this.$vnode.componentInstance.$options.__file
        const tag = this.$vnode.componentOptions.tag
        const auto = (tag || file
          .match(/([^/\\]+)\.vue/).pop()
          .replace(/([a-z])([A-Z])/g, function (input, a, b) {
            return (a + '-' + b)
          }))
          .toLowerCase()

        // text
        let text
        if (type === 'file') {
          text = file
            ? comment('file', file)
            : comment('component', auto)
        }
        else if (type === 'component') {
          text = comment('component', auto)
        }

        // insert
        if (text) {
          this.__commentLabel = document.createComment(text)
          this.$el.parentNode.insertBefore(this.__commentLabel, this.$el)

          // debug
          if (debug) {
            this.__commentLabel.vue = this
            this.__commentLabel.file = file
          }
        }
      }
    },

    destroyed () {
      if (this.__commentLabel) {
        this.__commentLabel.remove()
      }
    }
  })
}

export default {
  init
}
