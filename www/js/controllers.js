angular.module('app.controllers', [])

.run(function ($rootScope) {
	$rootScope.listOrders = [];
})

//Controller viewOrder
.controller('viewOrderCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$ionicPopup', '$window', '$state',
	function ($scope, $rootScope, $stateParams, $http, $ionicPopup, $window, $state) {

		$scope.listOrders = $rootScope.listOrders;

		$rootScope.$on('newListOrders', function (e, listOrders) {
			$scope.listOrders = listOrders;
		});

		$scope.doRefresh = function(){
			$scope.$broadcast('scroll.refreshComplete');
		}

	// A confirm dialog
	$scope.showConfirmOrder = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Order',
			template: 'Are you sure you want to order this menus?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				console.log('You are sure');
			} else {
				console.log('You are not sure');
			}
		});
	};

	//delete function
	$scope.deleteItem = function(order){
		//slice element
		$scope.listOrders.splice($scope.listOrders.indexOf(order), 1);
	}

	$scope.formData = {};
	$scope.doOrder = function () {
		// console.log($scope.formData);
		$ionicPopup.confirm({
			title: 'Order',
			template: 'Are you sure you want to order this menus?'
		}).then(function(res) {
			if (res) {
				$http({
					method: 'POST',
					url: 'http://192.168.1.123:8080/forder-webservice/index.php/api/orders',
					data: $.param($scope.formData),
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}).success(function (response) {
					$window.location.reload();
				});
			}
		});
	};

	$scope.showConfirmRefresh = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Order',
			template: 'Are you sure you want to Refresh?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$window.location.reload();
			} else {
				console.log('You are not sure');
			}
		});
	};
}])
//End of Controller viewOrder

 //Controller addOrder
 .controller('addOrderCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$state', '$ionicPopup', '$window',
 	function ($scope, $rootScope, $stateParams, $http, $state, $ionicPopup, $window) {
	//get data menus from Service
	$http.get("http://192.168.1.123:8080/forder-webservice/index.php/api/menus")
	.then(function(response){
		$scope.menuFoods = response.data.foods;
		$scope.menuDrinks = response.data.drinks;
		$scope.menuOthers = response.data.others;

		$scope.menuId = $state.params.idMenu;
		$scope.categoryId = $state.params.idCategory;
		if ($state.params.idCategory == '1') {
			$scope.menus = response.data.foods;
		} else if($state.params.idCategory == '2'){
			$scope.menus = response.data.drinks;
		} else{
			$scope.menus = response.data.others;
		}

		//Refesh the data
		$scope.doRefresh = function(){
			$http.get('http://192.168.1.123:8080/forder-webservice/index.php/api/menus').then(function(response){
				$scope.menuFoods = response.data.foods;
				$scope.menuDrinks = response.data.drinks;
				$scope.menuOthers = response.data.others;

				$scope.MenuId = $state.params.idMenu;
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	});

	$http.get("http://192.168.1.123:8080/forder-webservice/index.php/api/menus/notavailablemenu")
	.then(function(response){
		$scope.notAvailableMenus = response.data;
	});

	var listOrder = angular.element($('.list-order'));
	var orderIndex = $('.list-order > div').length-1;

	// $scope.selectedElem = function(elem) {
	// 	$rootScope.listOrders.push(elem);
	// 	$rootScope.$broadcast('newListOrders', $rootScope.listOrders);
	// };

	$scope.selectedElem = function(elem) {
		var alertPopup = $ionicPopup.alert({
			title: 'Succeed !',
			template: 'This menu has been selected and inserted into View Order'
		});

		alertPopup.then(function(res) {
			$rootScope.listOrders.push(elem);
			$rootScope.$broadcast('newListOrders', $rootScope.listOrders);
			$window.history.back(); 
		});
	};
}])
 //End of Controller addOrder

//Controller viewAllOrders
.controller('viewAllOrdersCtrl', ['$scope', '$stateParams', '$http', '$state',
	function ($scope, $stateParams, $http, $state) {

		$scope.doRefresh = function(){
			$scope.$broadcast('scroll.refreshComplete');
			$http.get("http://192.168.1.123:8080/forder-webservice/index.php/api/orders/costumers")
			.then(function(response){
			//get unpaid data from database
			$scope.costumers = response.data.unpaid;
			});

			$http.get("http://192.168.1.123:8080/forder-webservice/index.php/api/orders")
			.then(function(response){
				$scope.idCostumer = $state.params.idCostumer;
				$scope.orders = response.data.unpaid;
			});

			$http.get("http://192.168.1.123:8080/forder-webservice/index.php/api/tables/notAvailableTables")
			.then(function(response){
				$scope.notAvailableTables = response.data;
			});
		}

		$http.get("http://192.168.1.123:8080/forder-webservice/index.php/api/orders/costumers")
		.then(function(response){
			//get unpaid data from database
			$scope.costumers = response.data.unpaid;
		});

		$http.get("http://192.168.1.123:8080/forder-webservice/index.php/api/orders")
		.then(function(response){
			$scope.idCostumer = $state.params.idCostumer;
			$scope.orders = response.data.unpaid;
		});

		$http.get("http://192.168.1.123:8080/forder-webservice/index.php/api/tables/notAvailableTables")
		.then(function(response){
			$scope.notAvailableTables = response.data;
		});
	}])
//End of Controller viewAllOrders

//Controller menu
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicPopup', '$window',
	function ($scope, $stateParams, $ionicPopup, $window) {
		$scope.confirmNewOrder = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Refresh',
				template: 'Are you sure?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					$window.location.reload();
				} else {
					console.log('nothing');
				}
			});
		};

		$scope.showConfirmLogout = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Order',
				template: 'Are you sure want to Logout?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					console.log('You are Logout know');
				} else {
					console.log('You are not sure');
				}
			});
		};
	}])
//End Controller menu