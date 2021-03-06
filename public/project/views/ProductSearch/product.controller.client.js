/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductController",ProductController);

    function ProductController($location,$routeParams,$window,ProductSearchService,UserService) {

        var vm = this;
        var itemId = $routeParams.pid;
        var userId = null;
        if($window.sessionStorage.getItem("currentUser")) {
            userId = $window.sessionStorage.getItem("currentUser");
        }

        function init(){
            if(!$window.sessionStorage.getItem("currentUser")){
                vm.logAlert = true;
            }
            ProductSearchService
                .getProductById(itemId)
                .then(function(response){
                        var item = response.data;
                        vm.item = item;
                        console.log(item);
                        updateUserPreference(itemId);
                    },
                    function(error){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();

        function updateUserPreference(itemId){
            ProductSearchService
                .getProductLocal(itemId)
                .then(
                    function(response){
                        var item = response.data;
                        if(item)
                        {
                            if(userId){
                                if(item.Users.indexOf(userId)<0) {
                                    item.Users.push(userId);
                                    ProductSearchService
                                        .updateProduct(item)
                                        .then(function (response) {
                                                vm.success = "user prefernce saved";
                                                updateUserProductPreference(item._id);
                                            },
                                            function (error) {
                                                vm.error = "Unable to update user preference";
                                            });
                                }
                            }
                            else {
                                vm.error = "user not logged In";
                            }
                        }
                        else {
                            if(userId) {
                                var item = {
                                    itemId : itemId,
                                    productName: vm.item.name,
                                    Users : [userId],
                                    category:vm.item.categoryPath,
                                    categoryId:vm.item.categoryNode
                                };
                                ProductSearchService
                                    .createProduct(item)
                                    .then(function(response){
                                            vm.success = "user prefernce saved";
                                            updateUserProductPreference(response.data.itemId);
                                        },
                                        function(error){
                                            vm.error = "Unable to update user preference";
                                        });
                            }
                            else {
                                vm.error = "user not logged In";
                            }
                        }
                    },
                    function(error){
                        vm.error = "Unable to update user preference";
                    }
                )
        }

        function updateUserProductPreference(productId){
            
            UserService
                .findUserById(userId)
                .then(
                    function(response){
                        var user = response.data;
                        if(user.productsSaved.indexOf(productId)<0) {
                            user.productsSaved.push(productId);
                            UserService
                                .updateUser(user._id, user)
                                .then(
                                    function (response) {
                                        vm.success = "user updated";
                                    },
                                    function (error) {
                                        vm.error = "user not updated";
                                    });
                        }
                    },
                    function(error){
                        vm.error = "user not updated";
                    });
        }

        vm.logout = logout;

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
