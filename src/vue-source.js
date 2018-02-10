import Vue from 'vue'

export const defaults = {
  type: 'class',
  active: 'auto',
  debug: true
}

function comment (type, value) {
  return ` ${type}: ${value} `
}

function init (options) {
  // fake env for browser builds
  let env = !!window
    ? 'production'
    : process.env.NODE_ENV

  // build options
  options = Object.assign(defaults, options)
  options.active = options.active === 'auto'
    ? env !== 'production'
    : !!options.active

  const {type, active, debug} = options

  // exits
  if (!['file', 'class', 'tag'].includes(type)) {
    console.warn(`VueSource: invalid option type '${type}'`)
    return
  }

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
        switch (type) {

          case 'file':
              text = comment('file', file || '<none>')
            break

          case 'class':
            if (file) {
              const matches = file.match(/([^\\\/]+)\.vue$/)
              text = comment('class', matches[1])
            }
            else {
              text = comment('class', auto.replace(/(^\w|-\w)/g, char => char.replace('-', '').toUpperCase()))
            }
            break

          case 'tag':
            text = comment('tag', auto)
            break
        }

        // insert
        if (text) {
          this.__commentLabel = document.createComment(text)
          this.$el.parentNode.insertBefore(this.__commentLabel, this.$el)

          // debug
          if (debug) {
            this.__commentLabel.vm = this
            this.__commentLabel.tag = tag
            this.__commentLabel.file = file
            if (this.$inspect) {
              this.__commentLabel.inspect = () => this.$inspect()
            }
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

export {
  init
}
