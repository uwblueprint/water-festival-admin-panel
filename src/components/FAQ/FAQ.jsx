import React, { Component } from 'react';
import {render} from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  getAllQuestions,
  handleQuestionEdit,
  handleDeleteQuestions,
  handleInsertQuestion
} from './FAQ_utils';

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.setTableData = this.setTableData.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.beforeSaveCell = this.beforeSaveCell.bind(this);

    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    var questionsPromise = getAllQuestions();
    questionsPromise.then(response => {
      if(response.data){
        this.setTableData(response.data);
      }
		}).catch(function (error) {
			console.log(error);
		});
  }

	componentWillReceiveProps(nextProps) {
    var questionsPromise = getAllQuestions();
    questionsPromise.then(response => {
      if(response.data){
        this.setTableData(response.data);
      }

		}).catch(function (error) {
			console.log(error);
		});
  }
  
  setTableData(responseData) {
    this.setState({ tableData: responseData })
  }

	onAddRow(row) {
    console.log(row)
		if(row && row.question != "" && row.answer != "") {
      handleInsertQuestion(row);
      this.setState((prevState) => {
        return {tableData: [...prevState.tableData, row]};
      });
    } else {
      alert("Please fill out all fields")
    }
  }
  
  onDeleteRow(questionIDs) {
		if(questionIDs) {
			handleDeleteQuestions(questionIDs);
		}
  }

  beforeSaveCell(row, cellName, cellValue) {
    if(row.hasOwnProperty("id") && cellValue != "") {
      row[cellName] = cellValue;
			handleQuestionEdit(row);
    } else {
      alert("Please don't leave a field blank");
      return false;
    }
  }

  render() {
    const options = {
      onDeleteRow: this.onDeleteRow,
      onAddRow: this.onAddRow
    };

    const cellEdit = {
      mode: 'click', // click cell to edit
      beforeSaveCell: this.beforeSaveCell,
      blurToSave: true
    };

    const selectRow = {
      mode: 'checkbox' //radio or checkbox
    };

    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
        <h3> FAQ </h3>
        <BootstrapTable
          data={this.state.tableData}
          insertRow
          deleteRow
          cellEdit={ cellEdit }
          selectRow={ selectRow }
          striped
          hover
          condensed
          pagination
          options={options}
        >
          <TableHeaderColumn dataField='id' dataSort isKey={ true } hidden hiddenOnInsert> ID </TableHeaderColumn>
          <TableHeaderColumn dataField='question'>Question</TableHeaderColumn>
          <TableHeaderColumn dataField='answer'>Answer</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default FAQ;
