import React, { Component } from 'react';
import {render} from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  getAllAlerts,
  getAllTokens,
  handleAlertEdit,
  handleDeleteAlerts,
  handleInsertAlert,
  sendNotification,
} from './Alerts_utils';

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
		this.setTableData();
	}

	setTableData() {
		getAllAlerts().then(response => {
			if(response.data) this.setState({ tableData: response.data })
		}).catch(function (error) {
			console.log(error);
		});
	}

	onAddRow(row) {
		if(row && row.question != "" && row.answer != "") {
			handleInsertAlert(row, success => {
				if (success) this.setTableData();
			});
		} else {
			alert("Please fill out all fields")
		}
	}

	onDeleteRow(alertIDs) {
		if(alertIDs) {
			handleDeleteAlerts(alertIDs);
		}
	}

	beforeSaveCell(row, cellName, cellValue) {
		if(row.hasOwnProperty("id") && cellValue != "") {
			row[cellName] = cellValue;
			handleAlertEdit(row, success => {
				if (success) this.setTableData();
			});
		} else if (cellName != "push") {
			alert("Please don't leave a field blank");
			return false;
		}
	}

  buttonFormatter(cell, row) {
     return (<Button bsStyle="primary" onClick={() => sendNotification(row)}>Send</Button>);
  }

  render() {
    const options = {
      onDeleteRow: this.onDeleteRow,
      onAddRow: this.onAddRow,
			defaultSortName: 'name',
			defaultSortOrder: 'asc'
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
        <h3> Alerts </h3>
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
					search
          options={options}
        >
          <TableHeaderColumn dataField='id' dataSort isKey={ true } hidden hiddenOnInsert> ID </TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
          <TableHeaderColumn dataField='push' editable={false} dataFormat={this.buttonFormatter.bind(this)}>Push Notification</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default FAQ;
