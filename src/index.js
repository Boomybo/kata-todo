import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  maxId = 3;

  state = {
    items: [
      this.createTodoItem('One Task', 1, 1),
      this.createTodoItem('Two Task', 1, 2),
      this.createTodoItem('Three Task', 0, 3),
    ],
    filter: 'all',
  };

  createTodoItem(label, min, sec) {
    return {
      label,
      min,
      sec,
      done: false,
      editing: false,
      id: this.maxId++,
      timeStr: formatDistanceToNow(new Date()),
      timeForm: new Date(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ items }) => {
      const newArr = items.filter((val) => val.id !== id);

      return {
        items: newArr,
      };
    });
  };

  addItem = (text, min, sec) => {
    if (isNaN(min) || isNaN(sec)) {
      throw new Error(alert('you can add only number'));
    }
    const newItem = this.createTodoItem(text, min, sec);

    this.setState(({ items }) => {
      const newArr = [...items, newItem];

      return {
        items: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);

    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  editTodo = (id, text) => {
    this.setState({
      items: this.state.items.map((val) => {
        if (val.id === id) {
          val.label = text;
          val.editing = false;
        }
        return val;
      }),
    });
  };

  onToggleDone = (id) => {
    this.setState(({ items }) => {
      return {
        items: this.toggleProperty(items, id, 'done'),
      };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ items }) => {
      return {
        items: this.toggleProperty(items, id, 'editing'),
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filterItems(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
    }
  }

  clearCompleted = () => {
    this.setState(({ items }) => {
      const newArr = items.filter((val) => !val.done);
      return {
        items: newArr,
      };
    });
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(({ items }) => {
      let newArr = items.map((val) => {
        let newTime = val.timeForm;

        const newItem = { ...val, timeStr: formatDistanceToNow(newTime), timeForm: newTime };
        return newItem;
      });

      return {
        items: newArr,
      };
    });
  }

  render() {
    const { items, filter } = this.state;
    const doneCount = items.filter((el) => !el.done).length;
    const visibleItems = this.filterItems(items, filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            tasks={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            editTask={this.editTodo}
          />
          <Footer
            itemsLeft={doneCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
