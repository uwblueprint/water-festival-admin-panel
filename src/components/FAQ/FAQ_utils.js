import axios from 'axios';

const URL = 'https://water-fest.herokuapp.com';

export function getAllQuestions() {
    return axios({
			method: "get",
      url: `${URL}/faq/list/`
    })
}

export function handleQuestionEdit(faq, callback) {
  axios({
    method: "put",
    url: `${URL}/faq/edit/`,
    data: faq
  }).then(response => {
		if (response.data.faq) callback(true);
		else callback(false);
  }).catch(function (error) {
    console.log(error);
		alert('Failed to update FAQ');
  });
}

export function handleDeleteQuestions(faqIDs) {
  axios({
    method: "delete",
    url: `${URL}/faq/delete/`,
    data: {
      faqIDs
    }
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
		alert('Failed to delete FAQ');
  });
}

export function handleInsertQuestion(faq, callback) {
  axios({
    method: "post",
    url: `${URL}/faq/insert`,
    data: faq
  }).then(response => {
		if (response.data.faq) callback(true);
		else callback(false);
  }).catch(function (error) {
    console.log(error);
		alert('Failed to insert FAQ');
  });
}
