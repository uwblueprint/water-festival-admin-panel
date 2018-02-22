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
    method: "put",
    url: `${URL}/activities/insert/`,
    data: activity
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}

export function dateFormatter(date, row) {
	const dateTime = new Date(date);
  return(moment(dateTime).format('MMM DD, h:mm a'));
}
