angular.module('starter.controllers', [])

.controller('RegisterCtrl', function ($scope, $state, $location, $ionicPopup, UserService) {
  $scope.data = {}
  $scope.register = function () {
    $scope.data.role = 'green'
    $scope.data.name = 'noname'
    UserService.register($scope.data.username, $scope.data.password, $scope.data.name, $scope.data.role)
    .then(function (cb) {
      $ionicPopup.alert({
        title: 'Bienvenido!',
        template: 'El usuario ha sido registrado correctamente.'
      })
      $state.go('login')
    }, function () {
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Ha ocurrido un error.'
      })
    })
  }
})

.controller('LoginCtrl', function ($scope, $state, $location, $ionicPopup, UserService) {
  $scope.data = {}
  $scope.data.role = 'green'
  $scope.login = function () {
    UserService.login($scope.data.username, $scope.data.password)
    .then(function (user) {
      UserService.setUser(user)
      if (user.valid)
        $state.go('tab.dash')
      else
        $state.go('tab.account')
    }, function () {
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Usuario o contraseña incorrecta'
      })
    })
  }
})

.controller('AccountCtrl', function ($scope, $state, UserService) {
  $scope.data = {}
  $scope.data.user = UserService.getUser()
  $scope.updateUser = function () {
    UserService.updateUser($scope.data.user)
    .then(function (cb) {
      $state.go('tab.chats', {}, {reload: true})
      // $state.go('tab.dash')
    })
  }

  $scope.logout = function () {
    // call logout from service
    UserService.logout($scope.data.user.token)
      .then(function () {
        UserService.setToken(null)
        $state.go('login')
      })
  }

  $scope.delete = function () {
    // call logout from service
    UserService.deleteUser($scope.data.user.token)
      .then(function () {
        $state.go('login')
      })
  }
})

.controller('ChatsCtrl', function ($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  // $scope.$on('$ionicView.enter', function (e) {
  // })

  $scope.chats = Chats.all()
  $scope.remove = function (chat) {
    Chats.remove(chat)
  }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId)
})

.controller('DashCtrl', function ($scope, $state, UserService) {
  $scope.user = {}
  $scope.user = UserService.getUser()
  $scope.categoryList = [
    {
      text: 'Orientación',
      value: ''
    },
    {
      text: 'Memoria',
      value: ''
    },
    {
      text: 'Lenguaje',
      value: 'Dentro del área de lenguaje hay diferentes ejercicios a saber, entre ellos: conversación-narración, conversación-descripción, denominación de imágenes, denominación de objetos o imágenes del entorno, tareas léxicas y semánticas ejecutivas, repetición y comprensión.'
    },
    {
      text: 'Cálculo',
      value: ''
    },
    {
      text: 'Praxias',
      value: ''
    },
    {
      text: 'Gnosias',
      value: ''
    }
  ]
})

.controller('TicketCtrl', function ($scope, $http, $state, UserService, TicketService) {
  $scope.user = {}
  $scope.user = UserService.getUser()

  $scope.modelData = {}

  TicketService.getTicketsByCategoryByLevel(
    $scope.user.token, 'orientation', $scope.user.category.orientation)
    .then(function (cb) {
      $scope.modelData.orientation = cb
    })
  TicketService.getTicketsByCategoryByLevel(
    $scope.user.token, 'memory', $scope.user.category.memory)
    .then(function (cb) {
      $scope.modelData.memory = cb
    })
  TicketService.getTicketsByCategoryByLevel(
    $scope.user.token, 'language', $scope.user.category.language)
    .then(function (cb) {
      $scope.modelData.language = cb
    })
  TicketService.getTicketsByCategoryByLevel(
    $scope.user.token, 'calculus', $scope.user.category.calculus)
    .then(function (cb) {
      $scope.modelData.calculus = cb
    })
  TicketService.getTicketsByCategoryByLevel(
    $scope.user.token, 'praxias', $scope.user.category.praxias)
    .then(function (cb) {
      $scope.modelData.praxias = cb
    })
  TicketService.getTicketsByCategoryByLevel(
    $scope.user.token, 'gnosias', $scope.user.category.gnosias)
    .then(function (cb) {
      $scope.modelData.gnosias = cb
    })

  $scope.update = function () {
    TicketService.getTicketsByCategoryByLevel(
      $scope.user.token, 'orientation', $scope.user.category.orientation)
      .then(function (cb) {
        $scope.modelData.orientation = cb
      })
    TicketService.getTicketsByCategoryByLevel(
      $scope.user.token, 'memory', $scope.user.category.memory)
      .then(function (cb) {
        $scope.modelData.memory = cb
      })
    TicketService.getTicketsByCategoryByLevel(
      $scope.user.token, 'language', $scope.user.category.language)
      .then(function (cb) {
        $scope.modelData.language = cb
      })
    TicketService.getTicketsByCategoryByLevel(
      $scope.user.token, 'calculus', $scope.user.category.calculus)
      .then(function (cb) {
        $scope.modelData.calculus = cb
      })
    TicketService.getTicketsByCategoryByLevel(
      $scope.user.token, 'praxias', $scope.user.category.praxias)
      .then(function (cb) {
        $scope.modelData.praxias = cb
      })
    TicketService.getTicketsByCategoryByLevel(
      $scope.user.token, 'gnosias', $scope.user.category.gnosias)
      .then(function (cb) {
        $scope.modelData.gnosias = cb
      })
  }
})

.controller('TicketDetailCtrl', function ($scope, $stateParams, UserService, TicketService) {
  $scope.user = {}
  $scope.user = UserService.getUser()

  $scope.modelData = {}
  TicketService.getSigleTicket($scope.user.token, $stateParams.ticketId).then(function (cb) {
    $scope.modelData = cb
  })

  // $scope.update = function () {
  // console.log($scope.modelData)
  // }
})
