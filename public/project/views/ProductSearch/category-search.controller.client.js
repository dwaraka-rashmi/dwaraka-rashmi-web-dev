/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("BestShop")
        .controller("CategorySearchController",CategorySearchController);

    function CategorySearchController($location,$window,CategorySearchService,UserService) {
        var vm = this;
        vm.searchProducts = searchProducts;
        vm.pagecount = 0;

        vm.search = false;
        if($window.sessionStorage.getItem("currentUser")) {
            var userId = $window.sessionStorage.getItem("currentUser");
        }

        vm.back=back;

        function back(){
            $window.history.back();
        }

        function init(){
            if(!$window.sessionStorage.getItem("currentUser")){
                vm.logAlert = true;
            }
            CategorySearchService
                .getCategory()
                .then(
                    function(response){
                        vm.categories = response.data;
                        for(var i in vm.categories){
                            if(!vm.categories[i].image){
                                vm.categories[i].image = '../images/itemImage.png';
                            }
                        }
                    },
                    function(err){
                        vm.error = "Unable to fetch the Categories";
                    });
            var searchText = $window.sessionStorage.getItem("categorySearch");
            var searchTextId = $window.sessionStorage.getItem("categorySearchId");
            if(searchText){
                searchProducts(searchText,searchTextId);
            }
        }
        
        init();

        function searchProducts(category,categoryId) {
            $window.sessionStorage.setItem("categorySearch",category);
            $window.sessionStorage.setItem("categorySearchId",categoryId);
            vm.categorySearch = category;
            CategorySearchService
                .searchProducts(category,categoryId)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.search = true;
                        vm.term = response.data.query;
                        vm.totalResults = response.data.totalResults;
                        vm.items= response.data.items;
                    },
                    function(response){
                        vm.error="Unable to search Walmart";
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

