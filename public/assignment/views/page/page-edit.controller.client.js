/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);
    function EditPageController($location,$routeParams,PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;

        function deleteWebsite(websiteId){
            var result = PageService.deleteWebsite(websiteId);
            if(result){
                $location.url("/user/"+vm.userId+"/website")
            }
            else {
                vm.error = "Unable to delete website"
            }

        }

    }
})();