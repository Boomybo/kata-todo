import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import '../App/App.scss';

let maxId = 3;
const App = () => {
  const createTodoItem = (label, min, sec) => {
    return {
      label,
      min,
      sec,
      done: false,
      editing: false,
      id: maxId++,
      timeStr: formatDistanceToNow(new Date()),
      timeForm: new Date(),
    };
  };

  const initialItems = [
    createTodoItem('One Task', 1, 1),
    createTodoItem('Two Task', 1, 2),
    createTodoItem('Three Task', 0, 3),
  ];

  const [items, setItem] = useState(initialItems),
    [filter, setFilter] = useState('all');

  const deleteItem = (id) => {
    setItem((items) => {
      const newArr = items.filter((val) => val.id !== id);

      return newArr;
    });
  };

  const addItem = (text, min, sec) => {
    if (!min || !sec) {
      throw new Error(alert('You must add number'));
    }
    if (isNaN(min) || isNaN(sec)) {
      throw new Error(alert('you can add only number'));
    }
    const newItem = createTodoItem(text, min, sec);

    setItem((items) => {
      const newArr = [...items, newItem];

      return newArr;
    });
  };

  const toggleProperty = (arr, id, propName) => {
    const index = arr.findIndex((el) => el.id === id);

    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  const editTodo = (id, text) => {
    setItem((items) => {
      return items.map((val) => {
        if (val.id === id) {
          val.label = text;
          val.editing = false;
        }
        return val;
      });
    });
  };

  const onToggleDone = (id) => {
    setItem((items) => {
      return toggleProperty(items, id, 'done');
    });
  };

  const onToggleEdit = (id) => {
    setItem((items) => {
      return toggleProperty(items, id, 'editing');
    });
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const filterItems = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
    }
  };

  const clearCompleted = () => {
    setItem((items) => {
      const newArr = items.filter((val) => !val.done);

      return newArr;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => tick(), 10000);

    return () => {
      clearInterval(interval);
    };
  });

  const tick = () => {
    setItem((items) => {
      let newArr = items.map((val) => {
        let newTime = val.timeForm;
        const newItem = { ...val, timeStr: formatDistanceToNow(newTime), timeForm: newTime };
        return newItem;
      });
      return newArr;
    });
  };

  const doneCount = items.filter((el) => !el.done).length;
  const visibleItems = filterItems(items, filter);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          tasks={visibleItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          editTask={editTodo}
        />
        <Footer
          itemsLeft={doneCount}
          filter={filter}
          onFilterChange={onFilterChange}
          onClearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};

export default App;
