import React, { useState } from 'react';

const EditInput = ({ label, editTask, id }) => {
  const [editLabel, setEditLabel] = useState(label);

  const onLabelChange = (e) => {
    setEditLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTask(id, editLabel);
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <label htmlFor={id} className="hidden-label"></label>
      <input
        type="text"
        id={id}
        className="edit"
        value={editLabel}
        onChange={onLabelChange}
        onBlur={onSubmit}
        autoFocus
      />
    </form>
  );
};

export default EditInput;
