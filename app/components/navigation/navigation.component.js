export default class navigationController {
	constructor(User) {
		var self = this;
		this.CoreUser=User;
		this.user = User.get();
	}

	$onInit () {
		// initialise values after init completed (and bindings are available)
		// this.adminControlsVisible = this.admin;
		this.adminControlsVisible = true;
	}

	$onChanges(changes) {
		// FIXME: parent should set admin to appropriate value -> how to do that??
		if (changes.admin) {
			this.adminControlsVisible = changes.admin.currentValue;
		}
	}

	logout () {
		console.log('logging out user ' + JSON.stringify(this.CoreUser.get()));
		this.CoreUser.logout();
	}
	isLogged () {
		if (typeof this.user !== 'undefined'&&
			typeof this.user.id !== 'undefined' && this.user.id !== null) {
			return true;
		}
		return false;
	}
	showEnrolment () {
		return (!this.isLogged() || (this.isLogged() && this.isAdmin()) );
	}
	isAdmin () {
		return this.adminControlsVisible;
	}
}

navigationController.$inject = ['User'];
