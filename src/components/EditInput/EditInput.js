import React from 'react';

export default class EditInput extends React.Component {
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
    console.log(this.props);
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="edit"
          value={label}
          onChange={this.onLabelChange}
          onBlur={this.onSubmit}
          autoFocus
        />
      </form>
    );
  }
}
