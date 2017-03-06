angular.module('signIn').component('signIn', {
	templateUrl : 'components/sign-in/sign-in.template.html',
	controller :
	[ '$http', '__env', 'Auth', '$localStorage', '$location',
		function SignInController($http, __env, Auth, $localStorage, $location) {
			var self = this;
			
            var successAuth = function (res) {
	            $localStorage.token = res.data.token;
	            $location.path("/");
	        }

			this.signin = function () {
              var formData = {
                  email: this.email,
                  password: this.password
              };
              delete $localStorage.token;
              Auth.signin(formData.email, formData.password, successAuth, function () {
            	  self.error = 'Invalid credentials.';
              })
			};
   		} 
	]
    
});

