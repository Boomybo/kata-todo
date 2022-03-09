import React from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (this.state.label) {
      e.preventDefault();
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: '',
      });
    } else {
      e.preventDefault();
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
        ></input>
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
