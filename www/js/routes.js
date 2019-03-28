angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('tabsController.viewOrder', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/viewOrder.html',
        controller: 'viewOrderCtrl'
      }
    }
  })

  .state('tabsController.addOrder', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/addOrder.html',
        controller: 'addOrderCtrl'
      }
    }
  })

  .state('tabsController.detailMenu', {
    url: '/page3/:idMenu/:idCategory',
    views: {
      'tab2': {
        templateUrl: 'templates/detailMenu.html',
        controller: 'addOrderCtrl'
      }
    }
  })

  .state('tabsController.notAvailableMenu', {
    url: '/page3/a/a/notAvailableMenu',
    views: {
      'tab2': {
        templateUrl: 'templates/notAvailableMenu.html',
        controller: 'addOrderCtrl'
      }
    }
  })

  .state('tabsController.viewAllOrders', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/viewAllOrders.html',
        controller: 'viewAllOrdersCtrl'
      }
    }
  })
  .state('tabsController.detailOrders', {
    url: '/page4/:idCostumer',
    views: {
      'tab3': {
        templateUrl: 'templates/detailOrders.html',
        controller: 'viewAllOrdersCtrl'
      }
    }
  })
  .state('tabsController.notAvailableTable', {
    url: '/page3/a/b/notAvailableTable',
    views: {
      'tab3': {
        templateUrl: 'templates/notAvailableTable.html',
        controller: 'viewAllOrdersCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  $urlRouterProvider.otherwise('/page1/page2')

});