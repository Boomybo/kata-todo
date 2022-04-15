import React from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

const filterBtns = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
];

function TasksFilter({ filter, onFilterChange }) {
  const buttons = filterBtns.map(({ name, label }) => {
    const isActive = name === filter;
    const classNames = isActive ? 'selected' : '';

    return (
      <li key={name}>
        <button type="button" onClick={() => onFilterChange(name)} className={classNames}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{buttons}</ul>;
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {
    console.log('add your function');
  },
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TasksFilter;
