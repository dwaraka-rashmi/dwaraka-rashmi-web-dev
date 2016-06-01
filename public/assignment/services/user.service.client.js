/**
 * Created by Rashmi_Dwaraka on 5/26/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);

    function UserService($http){

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        //createUser(user) - adds the user parameter instance to the local users array
        function createUser(user){

            var newUser = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/user",newUser);
            //users.push(newUser);
            //return newUser;

        }

        //findUserById(userId) - returns the user in local users array whose _id matches the userId parameter
        function findUserById(userId){
            var url = "/api/user/"+userId;
            return $http.get(url);
            // for(var i in users) {
            //     if (users[i]._id === userId) {
            //         return  users[i];
            //     }
            // }
            // return null;
        }

        //findUserByUsername(username) - returns the user in local users array whose username matches the parameter username
        function findUserByUsername(username){
            for(var i in users) {
                if (users[i].username === username) {
                    return  users[i];
                }
            }
            return null;
        }

        //findUserByCredentials(username, password) - returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username,password){
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        //updateUser(userId, user) - updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId,newUser){
            var url = "/api/user/"+userId;
            return $http.put(url,newUser);

            // for(var i in users) {
            //     if (users[i]._id === userId) {
            //         users[i].firstName = user.firstName;
            //         users[i].lastName = user.lastName;
            //         //console.log(user);
            //         return true;
            //     }
            // }
            // return false;
        }

        //deleteUser(userId) - removes the user whose _id matches the userId parameter
        function deleteUser(userId){
            var url = "/api/user/"+userId;
            return $http.delete(url);

            // for(var i in users) {
            //     if (users[i]._id === userId) {
            //         users.splice(i,1);
            //     }
            // }
        }

    }

})();