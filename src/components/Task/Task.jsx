import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import EditInput from '../EditInput';

import './Task.scss';

const Task = ({ label, editing, min, sec, onDeleted, onToggleDone, onToggleEdit, done, timeStr, id, editTask }) => {
  const [btnPlay, setBtnPlay] = useState(false),
    [taskTimer, setTaskTimer] = useState(true),
    [taskMin, setTaskMin] = useState(Number(min)),
    [taskSec, setTaskSec] = useState(Number(sec));

  const onBtnPlay = () => {
    setBtnPlay(true);
    setTaskTimer(true);
  };

  const onBtnPause = () => {
    setBtnPlay(false);
  };

  const clock = () => {
    if (editing) {
      onBtnPause();
    }

    if (btnPlay) {
      if (taskMin === 0 && taskSec === 0) {
        return setTaskTimer(false);
      }
      if (taskSec === 0 && taskMin > 0) {
        setTaskMin(taskMin - 1);
        return setTaskSec(59);
      }
      if (taskTimer) {
        setTaskSec(taskSec - 1);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => clock(), 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const timer = ` ${taskMin}:${taskSec}`;

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
            <button className="icon icon-play" onClick={onBtnPlay} disabled={disabled}></button>
            <button className="icon icon-pause" onClick={onBtnPause} disabled={disabled}></button>
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
};

export default Task;

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

  //timeForm: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.func]),

  done: PropTypes.bool,
  editing: PropTypes.bool,
  label: PropTypes.string,
};
