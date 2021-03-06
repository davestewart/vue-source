const defaults = {
  active: 'auto',
  type: 'class',
  debug: true
}

function comment (type, value) {
  return ` ${type}: ${value} `
}

function install (Vue, options) {
  // fake env for browser builds
  let env = typeof process === 'undefined'
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
        const className = auto.replace(/(^\w|-\w)/g, char => char.replace('-', '').toUpperCase())

        // text
        let text
        switch (type) {

          case 'file':
            if (file) {
              text = comment('file', file)
            }
            break

          case 'class':
            if (file) {
              const matches = file.match(/([^\\\/]+)\.vue$/)
              text = comment('class', matches[1])
            }
            else {
              text = comment('class', className)
            }
            break

          case 'tag':
            text = comment('component', auto)
            break
        }

        if (!text) {
          text = comment('component', auto)
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
            this.__commentLabel.class = className
            this.__commentLabel.inspect = () => {
              if (this.$inspect) {
                this.$inspect()
              }
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

export default {
  install,
  defaults
}
