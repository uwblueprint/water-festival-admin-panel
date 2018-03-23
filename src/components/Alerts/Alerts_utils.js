import axios from 'axios';

const URL = 'http://192.168.42.33:9090';//'https://water-fest.herokuapp.com';

export function getAllAlerts() {
    return axios({
        method: "get",
        url: `${URL}/alerts/list/`
    });
}

export function handleAlertEdit(alert, callback) {
  axios({
    method: "put",
    url: `${URL}/alerts/edit/`,
    data: alert
  }).then(response => {
		if (response.data.alert) callback(true);
		else callback(false);
  }).catch(function (error) {
    console.log(error);
		alert('Failed to update alert');
  });
}

export function handleDeleteAlerts(alertIDs) {
  axios({
    method: "delete",
    url: `${URL}/alerts/delete/`,
    data: {
        alertIDs,
    }
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
		alert('Failed to delete alert');
  });
}

export function handleInsertAlert(alert, callback) {
  axios({
    method: "post",
    url: `${URL}/alerts/insert`,
    data: alert
  }).then(response => {
		if (response.data.alert) callback(true);
		else callback(false);
  }).catch(function (error) {
    console.log(error);
		alert('Failed to insert alert');
  });
}

export function sendNotification(alert) {
  axios({
    method: "post",
    url: `${URL}/tokens/send`,
    data: alert
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
    alert('Failed to send notifications!');
  });
}
