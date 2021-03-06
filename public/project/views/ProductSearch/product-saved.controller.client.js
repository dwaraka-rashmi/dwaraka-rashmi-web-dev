/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductSavedController",ProductSavedController);

    function ProductSavedController($location,$window,ProductSearchService,UserService) {

        var vm = this;
        var userId = null;
        vm.logout = logout;
        if($window.sessionStorage.getItem("currentUser")) {
            userId = $window.sessionStorage.getItem("currentUser");
        }

        function init(){

            if(!$window.sessionStorage.getItem("currentUser")){
                vm.logAlert = true;
            }
            
            UserService
                .findUserById(userId)
                .then(
                    function(response){
                        vm.user = response.data;
                        vm.products = [];
                        fetchSavedProducts();
                    },
                    function(error){
                        vm.error ="User not logged In";
                    });
        }
        init();

        function fetchSavedProducts(){
            if(vm.user.productsSaved.length>0) {
                ProductSearchService
                    .getProductById(vm.user.productsSaved.pop())
                    .then(function (response) {
                            var item = response.data;
                        if(!item.errors)
                            vm.products.push(item);
                            fetchSavedProducts();
                        },
                        function (error) {
                            vm.error = "Unable to access Walmart";
                        });
            }
        }

        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $window.sessionStorage.clear();
                        $location.url("/login");
                    },
                    function(error){
                        vm.error = "Unable to logout";
                    });
        }


    }
})();
