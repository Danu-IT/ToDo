import React, { useState, useMemo } from 'react';
import { ITodo } from '../../types/types';
import { activeTodo, completedTodo } from '../../utils';
import Footer from '../Footer/Footer';
import Form from '../Form/Form';
import ItemTodo from '../ItemTodo/ItemTodo';
import List from '../List/List';

import classes from './App.module.scss'

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  let todosToShow: ITodo[] = [];
  let activeTodoLength: number = 0;

  switch (selectedFilter) {
    case 'completed':
      todosToShow = completedTodo(todos);
      break
    case 'active':
      todosToShow = activeTodo(todos);
      break
    case 'all':
      todosToShow = [...todos];
    }

  const addNewTodo = (todo: ITodo) => {
    setTodos([...todos, todo])
  }

  const completeTodo = (id: number): void => {
    setTodos([...todos].map(todo => {
      if(todo.id !== id) return todo;
      return {...todo, completed: !todo.completed}
    }))
  };

  const removeTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id!== id));
  };

  const applyFilter = (value: string) => {
    setSelectedFilter(value);
  }

  const deleteCompletedTodos = () => {
    const active = activeTodo(todos)
    setTodos(active)
  } 

  useMemo(() => {
    activeTodoLength = activeTodo(todos).length;
  },[todos, selectedFilter])
  
  return (
    <div className={classes.app}>
      <div className="mt-40 bg-slate-200 shadow-ld w-2/4">
        <Form addNewTodo={addNewTodo}></Form>
        <List items={todosToShow} renderItem={(todo) => <ItemTodo removeTodo={removeTodo} completeTodo={completeTodo} key={todo.id} todo={todo}></ItemTodo>}></List>
        <Footer selectedFilter={selectedFilter} activeTodoLength={activeTodoLength} deleteCompletedTodos={deleteCompletedTodos} applyFilter={applyFilter}></Footer>
      </div>
    </div>
  );
}

export default App;