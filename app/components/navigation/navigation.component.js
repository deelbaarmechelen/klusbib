navigationController.$inject = ['User'];
export default function navigationController(User) {

	this.user = User.get();
	this.logout = function () {
		console.log('logging out user ' + JSON.stringify(User.get()));
		User.logout();
	}
	this.isLogged = function() {
		if (typeof this.user !== 'undefined'&&
			typeof this.user.id !== 'undefined' && this.user.id !== null) {
			return true;
		}
		return false;
	}
}
