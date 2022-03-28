/* eslint-disable */


import React from 'react';
import './Task.css';
import PropTypes from 'prop-types';

export default class Task extends React.Component {
  state = {
    label: this.props.label,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editTask(this.props.id, this.state.label);
  };

  render() {
    const { label, onDeleted, onToggleEdit, onToggleDone, editing, done, timeStr } = this.props;

    let classNames = '';
    let inp,
      disabled,
      checked = false;

    if (done) {
      classNames += 'completed';
      disabled = true;
      checked = true;
    }

    if (editing) {
      classNames += 'editing';
      inp = (
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            value={this.state.label}
            onChange={this.onLabelChange}
            onBlur={this.onSubmit}
            autoFocus
          />
        </form>
      );
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={checked}
            onClick={onToggleDone}
            id={this.props.id}
            readOnly
          />
          <label htmlFor={this.props.id}>
            <span className='title'>{label}</span>
            <span className="description">
                  <button className="icon icon-play"></button>
                  <button className="icon icon-pause"></button>
                  12:25
            </span>
            <span className="description">created {timeStr} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit} disabled={disabled}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {inp}
      </li>
    );
  }
}

Task.defaultProps = {
  onToggleDone: () => {
    console.log('default function, add your logic');
  },

  onDeleted: () => {
    console.log('default function, add your logic');
  },

  onToggleEdit: () => {
    console.log('default function, add your logic');
  },

  editTask: () => {
    console.log('default function, add your logic');
  },

  timeForm: new Date().toDateString,
  done: false,
  editing: false,
  label: 'defaultProp',
};

Task.propTypes = {
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  editTask: PropTypes.func,

  timeForm: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),

  done: PropTypes.bool,
  editing: PropTypes.bool,
  label: PropTypes.string,
};
