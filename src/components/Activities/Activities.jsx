import React, { Component } from 'react';
import {render} from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DateTime from 'react-datetime';
import moment from 'moment';
import {
  getAllActivities,
  handleEditActivities,
  handleDeleteActivities,
  handleInsertActivities,
} from './Activities_utils';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.setTableData = this.setTableData.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.beforeSaveCell = this.beforeSaveCell.bind(this);

    this.state = {
      tableData: []
    };
  }

  componentDidMount() {
    let activitiesPromise = getAllActivities();
    activitiesPromise.then(response => {
      if (response.data) {
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
		if (row && row.title != "" && row.description!= "" && row.grade != "" && row.station) {
      handleInsertActivities(row);
      this.setState((prevState) => {
        return {tableData: [...prevState.tableData, row]};
      });
    } else {
      alert("Please fill out all fields")
    }
  }
  
  onDeleteRow(activityIDs) {
		if (activityIDs) {
			handleDeleteActivities(activityIDs);
		}
  }

  beforeSaveCell(row, cellName, cellValue) {
    if (row.hasOwnProperty("id") && cellValue != "") {
      row[cellName] = cellValue;
			handleEditActivities(row);
    } else {
      alert("Please don't leave a field blank");
      return false;
    }
  }

  render() {
    if (this.state.tableData.length !== 0) {
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
          <h3> Activities </h3>
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
            <TableHeaderColumn dataField='id' dataSort isKey={ true } hidden hiddenOnInsert>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
            <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='station'>Station</TableHeaderColumn>
            <TableHeaderColumn dataField='grade'>Grade</TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Activities;
