import axios from 'axios';

const URL = 'https://water-fest.herokuapp.com';

export function getAllAlerts() {
    return axios({
        method: "get",
        url: `${URL}/alerts/list/`
    });
}

export function handleAlertEdit(alert) {
  axios({
    method: "put",
    url: `${URL}/alerts/edit/`,
    data: alert
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
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
  });
}

export function handleInsertAlert(alert) {
  axios({
    method: "post",
    url: `${URL}/alerts/insert`,
    data: alert
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
