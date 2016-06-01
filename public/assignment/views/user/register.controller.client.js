/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController);
    function RegisterController($location,UserService){

        var vm = this;
        vm.createUser = createUser;
        vm.error = false;

        function createUser(user){
            if(user) {
                if (user.username && user.password && user.verifyPassword) {
                    if (user.password.match(user.verifyPassword)) {
                        UserService
                            .createUser(user)
                            .then(function(response){
                                var user = response.data;
                                if(user)
                                    $location.url("/user/" + user._id);
                            });
                    }
                    else {
                        vm.error = "Could not be Registered";
                    }
                }
                else {
                    vm.error = "Could not be Registered";
                }
            }
            else {
                vm.error = "Error! Kindly fill in all the fields";
            }
        }

    }
})();