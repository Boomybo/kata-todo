import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.scss';

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState(''),
    [todoTimerMin, setTodoTimerMin] = useState(''),
    [todoTimerSec, setTodoTimerSec] = useState('');

  const onLabelChange = (e) => {
    const name = e.target.name;

    if (name === 'label') {
      return setLabel(e.target.value);
    } else if (name === 'todoTimerMin') {
      return setTodoTimerMin(e.target.value);
    } else if (name === 'todoTimerSec') {
      return setTodoTimerSec(e.target.value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (label) {
      onItemAdded(label, todoTimerMin, todoTimerSec);
      setLabel('');
      setTodoTimerMin('');
      setTodoTimerSec('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form" autoComplete="off">
      <label htmlFor="label"></label>
      <input
        name="label"
        id="label"
        type="text"
        className="new-todo"
        placeholder="Task"
        onChange={onLabelChange}
        value={label}
      />
      <label htmlFor="min"></label>
      <input
        id="min"
        name="todoTimerMin"
        type="text"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onLabelChange}
        value={todoTimerMin}
      />
      <label htmlFor="sec"></label>
      <input
        if="sec"
        name="todoTimerSec"
        type="text"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onLabelChange}
        value={todoTimerSec}
      />
      <button type="submit"></button>
    </form>
  );
};

export default NewTaskForm;

NewTaskForm.defaultProps = {
  onItemAdded: () => {
    console.log('add your function');
  },
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
