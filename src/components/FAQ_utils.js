import axios from 'axios';

export function getAllQuestions() {
    return axios({
			method: "post",
      url: "http://localhost:9090/faq/list/"
    })
}

export function handleQuestionEdit(faq) {
  axios({
    method: "post",
    url: "http://localhost:9090/faq/edit/",
    data: faq
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleDeleteQuestions(faqIDs) {
  axios({
    method: "post",
    url: "http://localhost:9090/faq/delete/",
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
    method: "post",
    url: "http://localhost:9090/faq/insert/",
    data: faq
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}

