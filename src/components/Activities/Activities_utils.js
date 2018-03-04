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
	const {
		id,
		title,
		description,
		grade,
		imageURI,
		isNewActivity,
		isOpen,
		state,
		station
	} = activity;

	axios({
		method: "put",
		url: `${URL}/activities/edit/`,
		data: {
			id,
			title,
			description,
			grade: grade.split(",").map(s => Number(s)),
			imageURI,
			isNewActivity,
			isOpen,
			state,
			station
		}
	}).then(response => {
	}).catch(function (error) {
		console.log(error);
	});
}
export function handleDeleteActivities(activityIDs) {
	axios({
		method: "delete",
		url: `${URL}/activities/delete/`,
		data: {
			activityIDs: activityIDs
		}
	}).then(response => {
	}).catch(function (error) {
		console.log(error);
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
  });
}
