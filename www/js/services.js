angular.module('starter.services', [])
/*
---------------------------------------
USER SERVICE
---------------------------------------
*/
.factory('UserService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
  // create user variable
  var user
  //
  function register (username, password, name, role) {
    var request = $http({
      method: 'POST',
      url: 'http://apulocal:3000/api/register/green',
      data: {
        username: username,
        password: password,
        name: name,
        role: role
      }
    })
    return (request.then(handleSuccess, handleError))
  }
  //
  function login (username, password) {
    var request = $http({
      method: 'POST',
      url: 'http://apulocal:3000/api/login',
      data: {
        username: username,
        password: password
      }
    })
    return (request.then(handleSuccess, handleError))
  }
  //
  function logout (token) {
    var request = $http({
      method: 'GET',
      url: 'http://apulocal:3000/api/logout',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    return (request.then(handleSuccess, handleError))
  }
  //
  function deleteUser (token) {
    var request = $http({
      method: 'DELETE',
      url: 'http://apulocal:3000/api/user/self',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    return (request.then(handleSuccess, handleError))
  }
  //
  function updateUser (user) {
    var request = $http({
      method: 'PUT',
      url: 'http://apulocal:3000/api/users/self',
      headers: {Authorization: 'Bearer ' + user.token},
      data: {
        name: user.name,
        category: {
          orientation: user.category.orientation,
          memory: user.category.memory,
          language: user.category.language,
          calculus: user.category.calculus,
          praxias: user.category.praxias,
          gnosias: user.category.gnosias
        }
      }
    })
    return (request.then(handleSuccess, handleError))
  }
  // I transform the error response, unwrapping the application dta from
  // the API response payload.
  function handleError (response) {
    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (!angular.isObject(response.data) || !response.data.message) {
      return ($q.reject('An unknown error occurred.'))
    }
    // Otherwise, use expected error message.
    return ($q.reject(response.data.message))
  }
  // I transform the successful response, unwrapping the application data
  // from the API response payload.
  function handleSuccess (response) {
    return (response.data)
  }
  // return available functions for use in the controllers
  return ({
    register: register,
    login: login,
    logout: logout,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getUser: function () { return (user) },
    setUser: function (_user) { user = _user },
    getToken: function () { return (user.token) },
    setToken: function (_token) { user.token = _token }
  })
}])
/*
---------------------------------------
TICKET SERVICE
---------------------------------------
*/
.factory('TicketService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
  // create model variable
  var modelData
  //
  function getTicketsByCategoryByLevel (token, category, level) {
    var request = $http({
      method: 'GET',
      url: 'http://apulocal:3000/api/tickets/category/' + category + '/level/' + level,
      headers: {Authorization: 'Bearer ' + token}
    })
    return (request.then(handleSuccess, handleError))
  };

  function getSigleTicket (token, ticketId) {
    var request = $http({
      method: 'GET',
      url: 'http://apulocal:3000/api/tickets/' + ticketId,
      headers: {Authorization: 'Bearer ' + token}
    })
    return (request.then(handleSuccess, handleError))
  };

  // I transform the error response, unwrapping the application dta from
  // the API response payload.
  function handleError (response) {
    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (!angular.isObject(response.data) || !response.data.message) {
      return ($q.reject('An unknown error occurred.'))
    }
    // Otherwise, use expected error message.
    return ($q.reject(response.data.message))
  }
  // I transform the successful response, unwrapping the application data
  // from the API response payload.
  function handleSuccess (response) {
    return (response.data)
  }
  // return available functions for use in the controllers
  return ({
    getTicketsByCategoryByLevel: getTicketsByCategoryByLevel,
    getSigleTicket: getSigleTicket,
    getModelData: function () { return (modelData) },
    setModelData: function (_modelData) { modelData = _modelData }
  })
}])
