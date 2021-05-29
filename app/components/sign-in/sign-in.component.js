SignInController.$inject = ['$http', '__env', 'Auth', '$localStorage', '$location', '$state', 'User', 'Flash', 'UserService'];
export default function SignInController($http, __env, Auth, $localStorage, $location, $state,  User, Flash, UserService) {
//    		console.log('Init sign in controller, token=' + $localStorage.token + ',token claims=' 
//    				+ JSON.stringify(Auth.getTokenClaims()));
	var self = this;
	User.validToken();
	self.user = User.get();
	Flash.clear();
	self.email = "";
	self.password = "";
	var successAuth = function (res) {
		Flash.clear(); // new login: clear all previous messages
		User.updateToken(res.data.token);
		redirectToProfile();
	}
	var successAcceptTerms = function (res) {
		redirectToProfile();
	}
	var redirectToProfile = function () {
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
	  self.sendSignin(self.email, self.password);
	};

	self.sendSignin = function (email, password) {
		Auth.signin(email, password, successAuth, function (response) {
			if (response.status == '401') {
				Flash.create('danger', 'Ongeldig login of paswoord', 5000);
				//self.error = 'Invalid credentials!';
			} else if (response.status == '403') {
				if (response.data.code == 'ERR_TERMS_NOT_ACCEPTED') {
					self.termsToken = response.data.token;
					self.user.id = User.getUserIdFromToken(response.data.token);
					self.termsVisible = true;
				} else {
					Flash.create('danger', 'Geen toegang. Contacteer systeem beheerder', 5000);
				}
			} else {
				Flash.create('danger', 'Technisch probleem. Probeer opnieuw of contacteer systeem beheerder als het probleem zich blijft voordoen', 5000);
			}
		})
	}
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

	this.acceptedTerms = false;
	this.acceptTerms = function () {
		console.log('terms accepted');
		self.user.user_id = self.user.id;
		UserService.UpdateTerms(self.user, self.termsToken).then(function (response) {
			if (response.success) {
				console.log('user terms updated');
				self.sendSignin(self.email, self.password);
			} else {
				console.log('error updating user terms for user with id ' + user.id);
			}
		});
	}
};


