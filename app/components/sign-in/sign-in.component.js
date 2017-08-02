angular.module('signIn').component('signIn', {
	scope: true,
	templateUrl : '/app/components/sign-in/sign-in.template.html',
	controller :
	[ '$http', '__env', 'Auth', '$localStorage', '$location','User',
		function SignInController($http, __env, Auth, $localStorage, $location, User) {
//    		console.log('Init sign in controller, token=' + $localStorage.token + ',token claims=' 
//    				+ JSON.stringify(Auth.getTokenClaims()));
			var self = this;
			self.user = User.get();
            var successAuth = function (res) {
            	User.updateToken(res.data.token);
	            $location.path("/");
	        }

			this.signin = function () {
              var formData = {
                  email: this.email,
                  password: this.password
              };
              Auth.signin(formData.email, formData.password, successAuth, function () {
            	  self.error = 'Invalid credentials.';
              })
			};
			this.signout = function () {
				Auth.signout(function () {
					User.logout();
		            self.error = 'Successfully logged out!';
				});
			}
			this.resetPwd = function () {
				Auth.resetPwd(this.email, function () {
					self.error = 'Paswoord reset aangevraagd: check je mailbox'
				} , function () {
					self.error = 'Er is een probleem opgetreden bij je paswoord reset aanvraag, is het ingegeven email adres correct?'
				})
			};
   		} 
	]
    
});

