import React, { Component } from 'react';
import {render} from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
	getAllActivities,
	handleEditActivities,
	handleDeleteActivities,
	handleInsertActivities
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
		getAllActivities().then(response => {
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

	validateData(row, cellName, cellValue) {
		if (!row.hasOwnProperty('id')) {
			alert('Invalid row');
			return false;
		} else if (cellName === 'station' && isNaN(cellValue)) {
			alert('Station has to be a valid number');
			return false;
		} else if (cellName === 'grade' && isNaN(cellValue) && !Array.isArray(cellValue) && cellValue.indexOf(',') < 0) {
			alert('Grade has to be a number or a comma-separated list of numbers');
			return false;
		} else if ((cellName === 'isNewActivity' || cellName === 'isOpen') && cellValue.toLowerCase() !== 'true' && cellValue.toLowerCase() !== 'false') {
			alert('Invalid boolean value. Has to be "true" or "false"');
			return false;
		} else if (cellName === 'title' && cellValue === '') {
			alert('Title cannot be empty');
			return false;
		}

		return true;
	}

	onAddRow(row) {
		let isValid = true;
		Object.keys(row).every(name => {
			if (!this.validateData(row, name, row[name])) {
				isValid = false;
				return false;
			} else return true;
		});

		let { station, grade, isNewActivity, isOpen } = row;
		station = Number(station);
		if (grade.slice(-1) === ',') grade = grade.slice(0, -1);
		grade = grade.split(",").map(s => Number(s));
		isNewActivity = Boolean(isNewActivity);
		isOpen = Boolean(isOpen);

		const newRow = Object.assign({}, row, {
			id: null,
			station,
			grade,
			isNewActivity,
			isOpen
		});

		if (isValid) handleInsertActivities(newRow);
	}

	onDeleteRow(activityIDs) {
		if (activityIDs) {
			handleDeleteActivities(activityIDs);
		}
	}

	beforeSaveCell(row, cellName, cellValue) {
		if (!this.validateData(row, cellName, cellValue)) return false;
		const newRow = Object.assign({}, row);
		if (cellName === 'grade') {
			if (cellValue.slice(-1) === ',') cellValue = cellValue.slice(0, -1);
			const grade = cellValue.split(",").map(s => Number(s));
			newRow['grade'] = grade;
		}
		if (cellName === 'station') {
			newRow[cellName] = Number(cellValue);
		}
		if (cellName === 'isNewActivity' || cellName === 'isOpen') {
			newRow[cellName] = Boolean(cellValue);
		}
		handleEditActivities(newRow);
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
					<TableHeaderColumn dataField='station' width='70'>Station</TableHeaderColumn>
					<TableHeaderColumn dataField='grade' width='80'>Grade</TableHeaderColumn>
					<TableHeaderColumn dataField='isNewActivity' width='90'>Is New?</TableHeaderColumn>
					<TableHeaderColumn dataField='isOpen' width='80'>Open?</TableHeaderColumn>
					<TableHeaderColumn dataField='state'>State</TableHeaderColumn>
				</BootstrapTable>
			</div>
		);
	}
}

export default Activities;
