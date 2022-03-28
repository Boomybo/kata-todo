/* eslint-disable */


import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    todoTimerMin: '',
    todoTimerSec: ''
  };

  constructor(props){
    super(props)
  }

  onLabelChange = (e) => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault()
    console.log("something get wrong")
    if (this.state.label) {
      e.preventDefault();
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: '',
      });
    } else {
      e.preventDefault()
    } 
  };

  render() {
    
    return (
      <form onSubmit={(e) => onSubmit(e)} className='new-todo-form'>
        <input
          name="label"
          type='text'
          className="new-todo"
          placeholder="Task"
          onChange={this.onLabelChange}
          value={this.state.label}
        ></input>
        <input 
          name="todoTimerMin"
          type='text'
          className="new-todo-form__timer" 
          placeholder="Min" 
          onChange={this.onLabelChange}
          value={this.state.todoTimerMin}
          autoFocus/>
        <input 
          name="todoTimerSec"
          type='text'
          className="new-todo-form__timer" 
          placeholder="Sec" 
          onChange={this.onLabelChange}
          value={this.state.todoTimerSec}
          autoFocus/>
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {
    console.log('add your function');
  },
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
