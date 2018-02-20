import axios from 'axios';

const URL = 'https://water-fest.herokuapp.com';

export function getAllQuestions() {
    return axios({
			method: "get",
      url: `${URL}/faq/list/`
    })
}

export function handleQuestionEdit(faq) {
  axios({
    method: "put",
    url: `${URL}/faq/edit/`,
    data: faq
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleDeleteQuestions(faqIDs) {
  axios({
    method: "delete",
    url: `${URL}/faq/delete/`,
    data: {
      faqIDs: faqIDs
    }
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleInsertQuestion(faq) {
  axios({
    method: "put",
    url: `${URL}/faq/insert/`,
    data: faq
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
