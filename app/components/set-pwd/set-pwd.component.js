"use strict";
SetPasswordController.$inject = ['$http', '__env', 'AuthService', '$localStorage', '$location', '$state', 'User', 'Flash'];
export default function SetPasswordController($http, __env, AuthService, $localStorage, $location, $state,  User, Flash) {

	var self = this;
	self.new_password = '';
	self.confirm_password = '';
	self.token = $location.search().token;
	self.userId = $location.search().userId;

	Flash.clear();

	this.init = function() {
		var params = $location.search();
		self.email = params.email;
	};
	this.isLogged = function() {
		if (typeof self.user !== 'undefined' &&
			typeof self.user.id !== 'undefined' && self.user.id !== null) {
			return true;
		}
		return false;
	};
	this.setPwd = function () {
		Flash.clear();
		if (self.new_password !== self.confirm_password) {
			Flash.create('danger', 'Paswoorden zijn niet identiek', 5000);
		} else {
			AuthService.setPwd(this.token, this.userId, this.new_password, function () {
				Flash.create('success', 'Paswoord succesvol gewijzigd', 5000);
			} , function (response) {
				let error = (response && response.data) ? response.data.error : null;
				let message = error ? error.message : '';
				if (error && error.message === 'Expired token' && error.status == 401) {
					message = 'Deze link is vervallen, vraag een nieuwe aan';
				}
				Flash.create('danger', 'Er is een probleem opgetreden bij de wijziging van je paswoord: ' + message, 5000);
			});
		}
	};
	var putApiUrl = function (url, token, new_password) {
		$.ajax({
			url: url,
			type: 'PUT',
			data: '{"password" : "' + new_password + '"}',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + token)
			},
			success: function (data) {
				console.log('success');
				//$("#queryresult").text(JSON.stringify(data));
				$("#queryresult").text("Paswoord succesvol gewijzigd!");
			}, error: function(xhr) {
				alert("An error occured: " + xhr.status + " " + xhr.statusText);

				document.getElementById("queryresult").innerHTML = xhr.responseText.replace(/\n/g,"<br>");
			}
		});
	};
}


