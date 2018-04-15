import axios from 'axios';

const URL = 'https://water-festival-server.appspot.com';

export function getAllUsers() {
		return axios({
			method: "get",
			url: `${URL}/users/list/`
		})
}

export function handleDeleteUsers(userIDs) {
	axios({
		method: "delete",
		url: `${URL}/users/delete/`,
		data: {
			userIDs
		}
	}).then(response => {
	}).catch(function (error) {
		console.log(error);
		alert('Failed to delete user');
	});
}

export function handleInsertUsers(user, callback) {
  axios({
    method: "post",
    url: `${URL}/users/insert/`,
    data: user
  }).then(response => {
		if (response.data.code === 11000) {
			alert('Failed to insert user: Duplicate username');
			callback(false);
		} else if (response.data.user) {
			callback(true);
		}
  }).catch(function (error) {
    console.log(error);
		alert('Failed to insert user');
		callback(false);
  });
}
