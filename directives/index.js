import Vue from 'vue'

// https://tinyurl.com/yypw59st
Vue.directive('permission', (el, { value }, vnode) => {
  const resolver = value instanceof Function ? value : () => Vue.prototype.$auth.hasPermission(value)
  if (!resolver()) {
    // replace HTMLElement with comment node
    const comment = document.createComment(' ')
    Object.defineProperty(comment, 'setAttribute', {
      value: () => undefined
    })
    vnode.elm = comment
    vnode.text = ' '
    vnode.isComment = true
    vnode.context = undefined
    vnode.tag = undefined
    vnode.data.directives = undefined

    if (vnode.componentInstance) {
      vnode.componentInstance.$el = comment
    }

    if (el.parentNode) {
      el.parentNode.replaceChild(comment, el)
    }
  }
})
