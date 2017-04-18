angular.module('signIn').component('signIn', {
	scope: true,
	templateUrl : 'components/sign-in/sign-in.template.html',
	controller :
	[ '$http', '__env', 'Auth', '$localStorage', '$location','User',
		function SignInController($http, __env, Auth, $localStorage, $location, User) {
			var self = this;
			self.user = User.get();
            var successAuth = function (res) {
            	var tokenClaims = Auth.getTokenClaims();
            	User.update(tokenClaims["sub"]);
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
			this.signout = function () {
				Auth.signout(function () {
		            self.error = 'Successfully logged out!';
		            User.update(null);
				});
			}
   		} 
	]
    
});

