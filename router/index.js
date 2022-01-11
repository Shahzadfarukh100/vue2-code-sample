import Vue from 'vue'
import Router from 'vue-router'
import startsWith from 'lodash/startsWith'
import AppConfig from 'Constants/AppConfig'
import { localeProvider } from '@/lang'
// routes
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.loginRequired && !Vue.prototype.$auth.isAuthenticated()) {
    next({
      path: '/login',
      query: {
        next: to.fullPath
      }
    })
    return
  }
  if (to.meta.permission && !Vue.prototype.$auth.hasPermission(to.meta.permission)) {
    next({
      path: '/lost'
    })
    return
  }
  const setTitle = (title, retry) => {
    if (title) {
      const translated = localeProvider.i18n.tc(title)
      if (startsWith(translated, 'message') && retry < 20) {
        setTimeout(() => {
          setTitle(title, retry + 1)
        }, 1000)
      } else {
        document.title = `${translated} | ${AppConfig.brand}`
      }
    }
  }
  setTitle(to.meta.title, 0)

  next()
})

export default router
