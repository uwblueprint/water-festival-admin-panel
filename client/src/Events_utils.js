import axios from 'axios';

export function getAllEvents() {
    return axios({
			method: "post",
      url: "http://localhost:9090/event/list/"
    })
}

export function handleEditEvents(event) {
  axios({
    method: "post",
    url: "http://localhost:9090/event/edit/",
    data: event
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleDeleteEvents(eventIDs) {
  axios({
    method: "post",
    url: "http://localhost:9090/event/delete/",
    data: {
      eventIDs: eventIDs
    }
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleInsertEvent(event) {
  axios({
    method: "post",
    url: "http://localhost:9090/event/insert/",
    data: event
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}

export function dateFormatter(cell, row) {
  return(cell.format('MMM DD, h:mm a'));
}
 
