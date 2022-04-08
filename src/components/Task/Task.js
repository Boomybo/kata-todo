import React from 'react';
import PropTypes from 'prop-types';

import EditInput from '../EditInput/EditInput';
//import './Task.css';

export default class Task extends React.Component {
  state = {
    label: this.props.label,
    btnPlay: false,
    btnPause: false,
    timer: true,
    min: Number(this.props.min),
    sec: Number(this.props.sec),
  };

  onBtnPlay = () => {
    return this.setState({
      btnPlay: true,
      btnPause: false,
      timer: true,
    });
  };

  onBtnPause = () => {
    return this.setState({
      btnPlay: false,
      btnPause: true,
    });
  };

  clock = () => {
    const { min, sec, btnPlay, timer } = this.state;
    const { editing } = this.props;

    if (editing) {
      this.onBtnPause();
    }

    if (btnPlay) {
      if (min === 0 && sec === 0) {
        return this.setState({
          timer: false,
        });
      }
      if (sec === 0 && min > 0) {
        this.setState({
          min: min - 1,
          sec: 60,
        });
      }
      if (timer) {
        this.setState({
          sec: this.state.sec - 1,
        });
      }
    }
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.clock(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { label, onDeleted, onToggleEdit, onToggleDone, editing, done, timeStr, id, editTask } = this.props;

    const { min, sec } = this.state;

    const timer = ` ${min}:${sec}`;

    let classNames = '';
    let disabled,
      checked = false;

    const editInput = editing ? <EditInput editTask={editTask} id={id} label={label} /> : null;

    if (done) {
      classNames += ' completed';
      disabled = true;
      checked = true;
    }

    if (editing) {
      classNames += 'editing';
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={checked} onClick={onToggleDone} id={id} readOnly />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.onBtnPlay} disabled={disabled}></button>
              <button className="icon icon-pause" onClick={this.onBtnPause} disabled={disabled}></button>
              {timer}
            </span>
            <span className="description">created {timeStr} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit} disabled={disabled}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editInput}
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
