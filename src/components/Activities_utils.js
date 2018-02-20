import axios from 'axios';

export function getAllActivities() {
    return axios({
			method: "post",
      url: "http://localhost:9090/activities/list/"
    })
}

export function handleEditActivities(activity) {
  axios({
    method: "post",
    url: "http://localhost:9090/activities/edit/",
    data: activity
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleDeleteActivities(activityIDs) {
  axios({
    method: "post",
    url: "http://localhost:9090/activities/delete/",
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
    url: "http://localhost:9090/activities/insert/",
    data: activity
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}

export function dateFormatter(cell, row) {
  return(cell.format('MMM DD, h:mm a'));
}
