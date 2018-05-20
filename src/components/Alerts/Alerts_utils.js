import axios from 'axios';

const URL = 'https://water-festival-server.appspot.com';

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
    alert('Failed to send notification!');
    return;
  });
  alert.sentDate = new Date();
  handleAlertEdit(alert, function(result) {
    if (!result) console.log("Failed to update sent date for alert!");
  });
}

export function sendText(alert) {
  axios({
    method: "post",
    url: `${URL}/alerts/text`,
    data: alert
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
    alert('Failed to send notification!');
    return;
  });
  alert.isSmsSent = true;
  handleAlertEdit(alert, function(result) {
    if (!result) console.log("Failed to update sent date for alert!");
  });
}
