/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("ProductHomeController",ProductHomeController);

    function ProductHomeController($location,$routeParams,$rootScope,ProductSearchService){

        var vm = this;
        var getProduct = getProduct;
        // var updateProductDatabase = updateProductDatabase;
        function init() {
            ProductSearchService
                .getDeals()
                .then(
                    function(response){
                        console.log(response.data);
                        vm.items= response.data.items;
                        if(!$rootScope.currentUser) {
                            vm.alert = "Login to continue..";
                        }
                    },
                    function(response){
                        vm.error="Unable to access Walmart";
                    });
        }
        init();
    
    }
})();
