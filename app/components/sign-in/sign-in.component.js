SignInController.$inject = ['$http', '__env', 'Auth', '$localStorage', '$location', '$state', 'User', 'Flash'];
export default function SignInController($http, __env, Auth, $localStorage, $location, $state,  User, Flash) {
//    		console.log('Init sign in controller, token=' + $localStorage.token + ',token claims=' 
//    				+ JSON.stringify(Auth.getTokenClaims()));
	var self = this;
	User.validToken();
	self.user = User.get();
	Flash.clear();
	var successAuth = function (res) {
		Flash.clear(); // new login: clear all previous messages
		User.updateToken(res.data.token);
		// $location.path("/");
		$state.go('profile', {'userId' : self.user.id});
	}

	this.init = function() {
		var params = $location.search();
		self.email = params.email;
	}
	this.isLogged = function() {
		if (typeof self.user !== 'undefined' &&
			typeof self.user.id !== 'undefined' && self.user.id !== null) {
			return true;
		}
		return false;
	}

	this.signin = function () {
	  var formData = {
		  email: this.email,
		  password: this.password
	  };
	  Auth.signin(formData.email, formData.password, successAuth, function (response) {
		  if (response.status == '401') {
			  Flash.create('danger', 'Ongeldig login of paswoord', 5000);
			  //self.error = 'Invalid credentials!';
		  } else if (response.status == '403') {
			  Flash.create('danger', 'Geen toegang. Contacteer systeem beheerder', 5000);
			  // self.error = 'Operation not allowed. Contact system administrator...';
		  } else {
			  Flash.create('danger', 'Technisch probleem. Probeer opnieuw of contacteer systeem beheerder als het probleem zich blijft voordoen', 5000);
			  // self.error = 'Unexpected error, contact system administrator if this problem persists'
		  }
	  })
	};
	this.signout = function () {
		Auth.signout(function () {
			User.logout();
			Flash.create('success', 'Je bent nu uitgelogd', 5000);
			//self.error = 'Successfully logged out!';
		});
	}
	this.resetPwd = function () {
		Auth.resetPwd(this.email, function () {
			Flash.create('success', 'Paswoord reset aangevraagd: check je mailbox', 5000);
			// self.error = 'Paswoord reset aangevraagd: check je mailbox'
		} , function () {
			Flash.create('danger', 'Er is een probleem opgetreden bij je paswoord reset aanvraag, is het ingegeven email adres correct?', 5000);
			// self.error = 'Er is een probleem opgetreden bij je paswoord reset aanvraag, is het ingegeven email adres correct?'
		})
	};
};


