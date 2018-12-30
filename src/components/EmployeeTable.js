import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchEmployees, saveEmployeeData, selectEmployeeToEdit, handleValueChange, cancelEdit, addMoreRow, deleteSelectedEmployee } from '../actions/employees';
import Login from './Login';
import { connect } from 'react-redux';

class Table extends Component {
  static propTypes = {
    employees: PropTypes.object.isRequired,
    fetchEmployees: PropTypes.func.isRequired,
    saveEmployeeData: PropTypes.func.isRequired,
    addMoreRow: PropTypes.func.isRequired,
    handleEditCancel: PropTypes.func.isRequired,
    selectEmployeeToEdit: PropTypes.func.isRequired,
    deleteSelectedEmployee: PropTypes.func.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    token: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.submitChange = this.submitChange.bind(this);
    this.addMoreRow = this.addMoreRow.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.saveEmployeeData();
    }
  }

  addMoreRow() {
    this.props.addMoreRow();
  }

  handleEditCancel() {
    this.props.handleEditCancel();
  }

  submitChange() {
    this.props.saveEmployeeData();
  }

  edit(id) {
    this.props.selectEmployeeToEdit(id);
  }

  delete(id) {
    this.props.deleteSelectedEmployee(id);
  }

  handleChange(event) {
    this.props.handleValueChange(event.target);
  }

  componentDidMount() {
    if (!this.props.employees.data.length) {
      this.props.fetchEmployees();
    }
  }

  render() {
    const { employees } = this.props;
    const { selectedId, showInput, name, surname, showLoginPage } = employees;

    return (
      <React.Fragment>
        <If condition={showLoginPage}>
          <Login />
        </If>
        <div className="text-left">
          <button disabled={selectedId !== 0 || selectedId === ''} className="btn btn-default text-left"
                  onClick={this.addMoreRow}>add more data</button><br /><br />
        </div>
        <table className="table table-condensed table-hover table-bordered text-center">
          <thead>
            <tr className="text-center">
              <th className="text-center">Id</th>
              <th className="text-center">Name</th>
              <th className="text-center">Surname</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <Choose>
              <When condition={employees.data.length}>
                <For each="employee" of={employees.data}>
                  <tr key={index}>
                    <td>{employee.id}</td>
                    <Choose>
                      <When condition={selectedId === employee.id && showInput}>
                        <td>
                          <input className="form-control" value={name}
                                 onChange={this.handleChange} onKeyPress={this.handleKeyPress} name="name" />
                        </td>
                        <td>
                          <input className="form-control" value={surname}
                                 onChange={this.handleChange} onKeyPress={this.handleKeyPress} name="surname" />
                        </td>
                        <td>
                          <button onClick={this.submitChange} className="btn btn-success"><span className="glyphicon glyphicon-ok" /></button>
                          <span> &nbsp;</span>
                          <button onClick={this.handleEditCancel} className="btn btn-danger"><span className="glyphicon glyphicon-remove" /></button>
                        </td>
                      </When>
                      <Otherwise>
                        <td onClick={() => this.edit(employee.id)}>{employee.Name}</td>
                        <td onClick={() => this.edit(employee.id)}>{employee.Surname}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => this.edit(employee.id)}>
                            <span className="glyphicon glyphicon-pencil" />
                          </button>&nbsp;
                          <button className="btn btn-danger" onClick={() => this.delete(employee.id)}>
                            <span className="glyphicon glyphicon-trash" />
                          </button>
                        </td>
                      </Otherwise>
                    </Choose>

                  </tr>
                </For>
              </When>
              <When condition={employees.isLoading}>
                <tr><td colSpan="4"><span className="fa fa-circle-o-notch fa-spin form-control-feedback" /></td></tr>
              </When>
              <When condition={employees.error}>
                <tr><td colSpan="4">We are facing some issue at our end, please try again later!</td></tr>
              </When>
              <Otherwise>
                <tr><td colSpan="4">No Data available!</td></tr>
              </Otherwise>
            </Choose>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Table = connect(state => ({
  employees: state.employees,
  token: state.session.token
}), dispatch => ({
  dispatch,
  fetchEmployees: () => dispatch(fetchEmployees()),
  saveEmployeeData: () => dispatch(saveEmployeeData()),
  selectEmployeeToEdit: id => dispatch(selectEmployeeToEdit(id)),
  handleValueChange: value => dispatch(handleValueChange(value)),
  handleEditCancel: () => dispatch(cancelEdit()),
  addMoreRow: () => dispatch(addMoreRow()),
  deleteSelectedEmployee: id => dispatch(deleteSelectedEmployee(id)),
}))(Table);

export default Table;
