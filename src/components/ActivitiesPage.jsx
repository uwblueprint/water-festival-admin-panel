import React, { Component } from 'react';
import {render} from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DateTime from 'react-datetime';
import moment from 'moment'
import {
  getAllActivities,
  handleEditActivities,
  handleDeleteActivities,
  handleInsertActivities,
  dateFormatter
} from './Activities_utils';

const createDateEditor = (onUpdate, props) => (<DateEditor onUpdate={ onUpdate } {...props}/>);

class DateEditor extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange(this);
    this.state = {
      date: props.defaultValue,
      open: true
    };
  }
  focus() {
    this.refs.dateTimeRef.open = !this.refs.dateTimeRef.open;
  }
  updateData() {
    this.props.onUpdate(this.state.date);
  }
  handleClick(){
    this.setState({ backgroundColor: 'red' })
  }
  handleDateTimeChange(e) {
    if(e.target){
      this.setState({ date: e.target.value });
    }
  }
  render() {
    const fadeIn = this.state.open ? 'in' : '';
    const display = this.state.open ? 'block' : 'none';
    //style={ { display: 'inline', width: '50%' } }
    return (
      <div>
        <link rel="stylesheet" href="https://unpkg.com/react-datetime@2.11.0/css/react-datetime.css" />
        <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body'>
                <DateTime
                  ref='dateTimeRef'
                  value={ this.state.date}
                  input={true}
                  style={ { display: 'block', width: '500px' } }
                  defaultValue={moment()}
                  onChange={ e => { this.setState({ date: e }); } }
                />
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-primary' onClick={ this.updateData }>Save</button>
                <button type='button' className='btn btn-default' onClick={ this.close }>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  }

class Activities extends Component {
  constructor(props) {
    super(props);
    this.setTableData = this.setTableData.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.beforeSaveCell = this.beforeSaveCell.bind(this);

    this.state = {
      tableData: [
        {
          id: 0,
          createdAt: moment(),
          title: "Water Games",
          description: "It's fun",
          startTime: moment(),
          endTime: moment(),
          station: "MC",
          grade: 3
        },
        {
          id: 2,
          createdAt: moment(),
          title: "Dinosaur Excavation",
          description: "Come be a paleontologist for a day. Excavate dinosaur fossils!",
          startTime: moment(),
          endTime: moment(),
          station: "Museum",
          grade: 2
        }
      ]
    };
  }

  componentDidMount() {
		//e.preventDefault()
    var activitiesPromise = getAllActivities();
    activitiesPromise.then(response => {
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
		if(row && row.title != "" && row.description!= "" && row.grade != "" && row.station {
			handleInsertActivities(row);
    }else{
      alert("Please fill out all fields")
    }
	}
  onDeleteRow(activityIDs) {
		if(activityIDs) {
			handleDeleteActivities(activityIDs);
		}
  }
  beforeSaveCell(row, cellName, cellValue) {
    if(row.hasOwnProperty("id") && cellValue != "") {
      row[cellName] = cellValue;
			handleEditActivities(row);
    }else{
      alert("Please don't leave a field blank");
      return false;
    }
  }
  render() {
    if (this.state.tableData.length !== 0) {
      const inputFieldStyle = {
        width: "100%"
      }

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
            <TableHeaderColumn dataField='startTime' dataFormat={ dateFormatter } customEditor={ { getElement: createDateEditor } }>Start Time</TableHeaderColumn>
            <TableHeaderColumn dataField='endTime' dataFormat={ dateFormatter } customEditor={ { getElement: createDateEditor } }>End Time</TableHeaderColumn>
            <TableHeaderColumn dataField='station'>Station</TableHeaderColumn>
            <TableHeaderColumn dataField='grade'>Grade</TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }else{
      return null;
    }

  }
}

export default Activities;
