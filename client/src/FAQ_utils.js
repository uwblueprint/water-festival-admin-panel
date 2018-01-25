import axios from 'axios';

const url = 'http://localhost:9090';

export function getAllQuestions() {
    return axios({
			method: "get",
      url: `${url}/faq/list/`
    })
}

export function handleQuestionEdit(faq) {
  axios({
    method: "post",
    url: `${url}90/faq/edit/`,
    data: faq
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleDeleteQuestions(faqIDs) {
  axios({
    method: "post",
    url: `${url}/faq/delete/`,
    data: {
      faqIDs: faqIDs
    }
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleInsertQuestion(faq) {
	console.log('obj');
	console.log(faq);
  axios({
    method: "post",
    url: `${url}/faq/insert/`,
    data: faq
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
