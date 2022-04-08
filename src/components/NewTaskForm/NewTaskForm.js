import React from 'react';
import PropTypes from 'prop-types';

//import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    todoTimerMin: '',
    todoTimerSec: '',
  };

  onLabelChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { label, todoTimerMin, todoTimerSec } = this.state;

    if (label) {
      this.props.onItemAdded(label, todoTimerMin, todoTimerSec);
      this.setState({
        label: '',
        todoTimerMin: '',
        todoTimerSec: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          name="label"
          type="text"
          className="new-todo"
          placeholder="Task"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <input
          name="todoTimerMin"
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onLabelChange}
          value={this.state.todoTimerMin}
        />
        <input
          name="todoTimerSec"
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onLabelChange}
          value={this.state.todoTimerSec}
        />
        <button type="submit"></button>
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
