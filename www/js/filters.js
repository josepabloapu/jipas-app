angular.module('starter.filters', [])

.filter('nl2br', function ($filter) {
  return function (data) {
    if (!data) return data
    return data.replace(/\r?\n/g, '<br />')
  }
})
