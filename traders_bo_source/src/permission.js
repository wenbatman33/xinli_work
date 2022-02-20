import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  // 已取得token
  if (hasToken) {
    // 判斷是否已取得符合權限的router
    if (store.getters.permission_routes.length > 0) {
      next()
    } else {
      try {
        const { role } = await store.dispatch('user/getInfo')
        const accessRoutes = await store.dispatch('permission/generateRoutes', role)
        router.addRoutes(accessRoutes)
        next({ ...to, replace: true })
      } catch (error) {
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      // store.dispatch('settings/closeGlobalLoading')
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
})
