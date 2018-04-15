import axios from 'axios';

const URL = 'https://water-festival-server.appspot.com';

export function getAllActivities() {
		return axios({
			method: "get",
			url: `${URL}/activities/list/`
		})
}

export function handleEditActivities(activity, callback) {
	axios({
		method: "put",
		url: `${URL}/activities/edit/`,
		data: activity
	}).then(response => {
		if (response.data.user) callback(true);
		else callback(false);
	}).catch(function (error) {
		console.log(error);
		alert('Failed to edit activity');
	});
}
export function handleDeleteActivities(activityIDs) {
	axios({
		method: "delete",
		url: `${URL}/activities/delete/`,
		data: {
			activityIDs
		}
	}).then(response => {
	}).catch(function (error) {
		console.log(error);
		alert('Failed to delete activity');
	});
}
export function handleInsertActivities(activity, callback) {
  axios({
    method: "post",
    url: `${URL}/activities/insert/`,
    data: activity
  }).then(response => {
		if (response.data.activity) callback(true);
		else callback(false);
  }).catch(function (error) {
    console.log(error);
		alert('Failed to insert activity');
  });
}
