import React, { Component } from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
	getAllUsers,
	handleDeleteUsers,
	handleInsertUsers
} from './Users_utils';

class Users extends Component {
	constructor(props) {
		super(props);
		this.setTableData = this.setTableData.bind(this);
		this.onAddRow = this.onAddRow.bind(this);
		this.onDeleteRow = this.onDeleteRow.bind(this);

		this.state = {
			tableData: []
		};
	}

	componentDidMount() {
		this.setTableData();
	}

	setTableData() {
		getAllUsers().then(response => {
			if (response.data) this.setState({ tableData: response.data });
		}).catch(function (error) {
			console.log(error);
		});
	}

	validateData(row) {
		if (!row.name.length) {
			alert('Name cannot be empty');
			return false;
		} else if (!row.username.length) {
			alert('Username cannot be empty');
			return false;
		} else if (isNaN(row.day)) {
			alert('Day has to be a valid number');
			return false;
		} else if (isNaN(row.phoneNumber)) {
			alert('Phone number has to be a valid number');
			return false;
		}

		return true;
	}

	onAddRow(row) {
		let isValid = this.validateData(row);

		if (!isValid) return;

		let { day, activities } = row;
		day = Number(day);
		if (activities.slice(-1) === ',') activities = activities.slice(0, -1);
		activities = activities.split(",");

		const newRow = Object.assign({}, row, {
			day,
			activities,
			password: 'password'
		});

		delete newRow.id;

		handleInsertUsers(newRow, success => {
			if (success) this.setTableData();
		});
	}

	onDeleteRow(activityIDs) {
		if (activityIDs) {
			handleDeleteUsers(activityIDs);
		}
	}

	render() {
		const options = {
			onDeleteRow: this.onDeleteRow,
			onAddRow: this.onAddRow,
			defaultSortName: 'name',
			defaultSortOrder: 'asc'
		};
		const selectRow = {
			mode: 'checkbox' //radio or checkbox
		};
		return (
			<div>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
				<link rel="stylesheet" href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"></link>
				<h3> Users </h3>
				<BootstrapTable
					data={this.state.tableData}
					insertRow
					deleteRow
					selectRow={ selectRow }
					striped
					hover
					condensed
					pagination
					search
					options={options}
				>
					<TableHeaderColumn dataField='id' dataSort isKey={ true } hidden hiddenOnInsert>ID</TableHeaderColumn>
					<TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
					<TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
					<TableHeaderColumn dataField='school'>School</TableHeaderColumn>
					<TableHeaderColumn dataField='day' width='70'>Day</TableHeaderColumn>
					<TableHeaderColumn dataField='phoneNumber'>Phone Number</TableHeaderColumn>
					<TableHeaderColumn dataField='activities'>Activity IDs</TableHeaderColumn>
				</BootstrapTable>
			</div>
		);
	}
}

export default Users;
