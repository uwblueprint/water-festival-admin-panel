import axios from 'axios';
import moment from 'moment';

const URL = 'https://water-fest.herokuapp.com';

export function getAllActivities() {
		return axios({
			method: "get",
			url: `${URL}/activities/list/`
		})
}

export function handleEditActivities(activity) {
	axios({
		method: "put",
		url: `${URL}/activities/edit/`,
		data: activity
	}).then(response => {
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
export function handleInsertActivities(activity) {
  axios({
    method: "post",
    url: `${URL}/activities/insert/`,
    data: activity
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
		alert('Failed to insert activity');
  });
}
