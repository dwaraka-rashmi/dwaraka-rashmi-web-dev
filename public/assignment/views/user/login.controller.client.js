/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);
    function LoginController($location,UserService){

        var vm = this;
        vm.error = false;
        vm.login = function(username,password){
            UserService
                .findUserByCredentials(username,password)
                .then(function(response) {
                    console.log(response);
                    var user = response.data;
                    if (user._id) {
                        $location.url("/user/" + user._id);
                    }
                    else {
                        vm.error = "user not found";
                    }
                });
        }
    }
})();