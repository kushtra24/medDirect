import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMagnifyingGlass,
  faLocationDot,
  faLocationCrosshairs,
  faHouse,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faLocationDot, faLocationCrosshairs, faHouse, faCircleUser)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
