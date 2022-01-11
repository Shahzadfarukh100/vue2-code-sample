import Vue from 'vue'

export function constructBaseApiUrl () {
  const protocol = process.env.VUE_APP_API_OVER_TLS === '1' ? 'https' : 'http'
  return `${protocol}://${process.env.VUE_APP_API_HOST}`
}

Vue.filter('avatar_update', function (value) {
  let avatar = value && value.avatar ? value.avatar : '/static/img/new_avatar.png'
  if (!avatar.startsWith('http') && !avatar.startsWith('data') && avatar !== '/static/img/new_avatar.png') {
    avatar = `${constructBaseApiUrl()}${avatar}`
  }
  return avatar
})

Vue.filter('avatar', function (value) {
  let avatar = value && value.avatar ? value.avatar : '/static/img/default_avatar.jpg'
  if (!avatar.startsWith('http') && !avatar.startsWith('data') && avatar !== '/static/img/default_avatar.jpg') {
    avatar = `${constructBaseApiUrl()}${avatar}`
  }
  return avatar
})
