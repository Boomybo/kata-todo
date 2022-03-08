import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
// import "./TaskList.css"

function TaskList({ data, onDeleted, onToggleDone, onToggleEdit, editTask }) {
  const elements = data.map((val) => {
    const { id } = val;
    const { ...itemProps } = val;

    return (
      <Task
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={() => onToggleEdit(id)}
        editTask={editTask}
        key={id}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  onToggleDone: () => {
    console.log('default function, add your logic');
  },

  onDeleted: () => {
    console.log('default function, add your logices');
  },

  onToggleEdit: () => {
    console.log('default function, add your logic');
  },

  editTask: () => {
    console.log('default function, add your logic');
  },

  data: [
    {
      label: 'some stuff',
      done: false,
      editing: false,
      id: 3,
      timeStr: formatDistanceToNow(new Date()),
      timeForm: new Date(),
    },
    {
      label: 'some stuff',
      done: false,
      editing: false,
      id: 4,
      timeStr: formatDistanceToNow(new Date()),
      timeForm: new Date(),
    },
    {
      label: 'some stuff',
      done: false,
      editing: false,
      id: 5,
      timeStr: formatDistanceToNow(new Date()),
      timeForm: new Date(),
    },
  ],
};

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onToggleDone: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleEdit: PropTypes.func,
  editTask: PropTypes.func,
};

export default TaskList;
