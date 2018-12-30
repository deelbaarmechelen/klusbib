
UserAdminController.$inject = ['UserService', 'EnrolmentService', '$scope', 'Upload', '__env'];
// export default function UserAdminController($scope, crudService) {
// export default function UserAdminController($http, __env, UserService, ReservationService, $location, Flash) {
import UserService from "../../services/user.service";

export default function UserAdminController(UserService, EnrolmentService, $scope, Upload, __env) {
    var self = this;
    self.UserFormContainer = false;
    self.itemShowCount = ['5','10','20','50'];
    //self.typeList = ['All',1,2,3,4,5,6,7,8,9,10];
    self.date = new Date();

    GetAllUsers();

    //To Get all users list
    function GetAllUsers () {

        var getUserData = UserService.GetAll(1, 1000);
        getUserData.then(function (user) {
            self.users = user.message;

            console.log(self.users);
            //to select second item from ng-option list (10 items)
            self.actItem = self.itemShowCount[1];
            console.log(self.actItem);
        }, function() {
            alert('Error in getting users list');
        });
    }
    function refreshDisplayedUser (user) {
        var getUser = UserService.GetById(user.user_id);
        getUser.then(function (_user) {
            self.user = _user.message;
            self.displayedUser = self.user;

            console.log(self.displayedUser);
        }, function() {
            alert('Error in refreshing user');
        });
    }

    self.editUser = function (user) {
        console.log(user);
        ClearFields();
        var getUserData = UserService.GetById(user.user_id);
        getUserData.then( function(_user) {
            self.user = _user.message;
            self.UserId = self.user.user_id
            self.UserName = self.user.lastname;
            // self.UserDescription = self.user.description;
            self.UserFirstName = self.user.firstname;
            // self.UserImgUrl = self.user.img;
            self.displayedUser = self.user;

            self.Action = "Update";
            self.UserFormContainer = true;
        }, function () {
            alert('Error in getting User record');
        });
    }

    // Hide Add User Form
    self.addUser = function () {
        console.log('Add user');
        ClearFields();
        self.Action = "Add";
        self.UserFormContainer = true;
    }

    function ClearFields() {
        self.UserId = "";
        self.UserName = "";
        // self.UserDescription = "";
        self.UserFirstName = "";
        // self.UserImgUrl = "";
        // self.files = {};
        self.displayedUser = {};
    }

    // Hide Add / Update User Form
    self.closeFrmBtn = function () {
        self.UserFormContainer = false;
    }

    self.Cancel = function () {
        self.UserFormContainer = false;
    }

    //Add Update Action
    self.AddUpdateUser = function (files) {

        var user = {
            lastname	: self.UserName,
            // description	: self.UserDescription,
            firstname		: self.UserFirstName
            // file : files[0]
        };

        var getUserAction = self.Action;

        if(getUserAction == "Update"){

            user.user_id = self.UserId;

            // // upload image file
            // if (!angular.equals(self.files , {})) {
            //     var uploadUserImage = UserService.UploadImage(user, files);
            //     uploadUserImage.then(function (response) {
            //             // GetAllUsers();
            //             if (response.success == false) {
            //                 var msg = response.message;
            //                 alert(msg);
            //             }
            //         }, function () {
            //             alert('Error in uploading User image');
            //         }
            //     );
            //
            // }
            console.log('update user ' + JSON.stringify(user));
            var getUserData = UserService.Update(user);

            getUserData.then (function (response) {
                GetAllUsers();
                if (response.success == false) {
                    var msg = response.message;
                    alert(msg);
                } else {
                    self.files = null;
                }
            }, function () {
                alert('Error in updating User record');
            });

        }else{
            console.log('add user');
            var addUserData = UserService.Create(user);
            addUserData.then (function (response) {
                    GetAllUsers();
                    if (response.success == false) {
                        var msg = response.message;
                        alert(msg);
                    }
                }, function () {
                    alert('Error in adding User record');
                }
            );
        }
        self.UserFormContainer = false;

    } // end of AddUpdateUser.

    self.canBeConfirmed = function (user) {
        if (!user) {
            return false;
        }
        if (user.confirmation_payment_mode != "CASH"
            && user.confirmation_payment_mode != "TRANSFER") {
            return false;
        }
        return true;
    }

    self.ConfirmPayment = function (user) {
        console.log('confirm payment for user ' + user.user_id);
        var confirmPayment = EnrolmentService.ConfirmEnrolmentPayment(user.confirmation_payment_mode, user.user_id);
        confirmPayment.then (function (response) {
            if (response.success == false) {
                var msg = response.message;
                alert(msg);
            } else {
                refreshDisplayedUser(user);
            }
        }, function () {
            alert('Error in enrolment confirm payment');
        });

    }

    self.deleteUser = function (user) {
        //console.log(user.user_id);
        var ans = confirm('Are you sure to delete it?');
        if(ans) {
            var delUserData = UserService.Delete(user.user_id);
            delUserData.then(function(response) {
                    GetAllUsers();
                    if (response.success == false) {
                        alert(response.message);
                    }
                }, function () {
                    alert('Error in deleting User record');
                }
            );
         }
    }

    self.hasUserImage = function(imageUrl) {
        if (typeof imageUrl == 'undefined' || imageUrl == null || imageUrl == '') {
            return false;
        }
        return true;
    }
    self.resizeImage = function(imageUrl, size) {
        if (! self.hasUserImage(imageUrl)) {
            return "//:0"; // FIXME: replace by default image
        }
        let baseUrl = imageUrl.substr(0, imageUrl.lastIndexOf('.'));
        let ext = imageUrl.substr(imageUrl.lastIndexOf('.') + 1);
        let newUrl = baseUrl + '-' + size + '.' + ext;
        return newUrl;
    }

    self.sort = function(keyname){
        self.sortKey = keyname;   //set the sortKey to the param passed
        self.reverse = !self.reverse; //if true make it false and vice versa
    }

    self.reset = function(){
        self.search = null;
        self.sortKey = null;
        self.reverse = false;
    };

    self.uploadFiles = function(files) {
        console.log('uploading files ' + JSON.stringify(files))
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                Upload.upload(
                    { url: __env.apiUrl + '/upload', method: 'POST',
                    data: {newfile: files[i]}}
                    );
            }
        }
    };

};