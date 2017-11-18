import axios from 'axios';

export function getAllQuestions() {
    return axios({
			method: "post",
      url: "http://localhost:9090/faq/list/"
    })
}

export function handleQuestionEdit(row) {
  axios({
    method: "post",
    url: "http://localhost:9090/faq/edit/",
    data: row 
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleDeleteQuestions(rowIDs) {
  axios({
    method: "post",
    url: "http://localhost:9090/faq/delete/",
    data: {
      rowIDs: rowIDs
    }
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}
export function handleInsertQuestion(row) {
  axios({
    method: "post",
    url: "http://localhost:9090/faq/insert/",
    data: {
      question: row.question,
      answer: row.answer	
    }
  }).then(response => {
  }).catch(function (error) {
    console.log(error);
  });
}

