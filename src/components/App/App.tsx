import React, { useEffect, useMemo, useState } from 'react';
import { ITodo } from '../../types/types';
import Footer from '../Footer/Footer';
import Form from '../Form/Form';
import ItemTodo from '../ItemTodo/ItemTodo';
import List from '../List/List';

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [activeTodos, setActiveTodos] = useState<ITodo[]>([]);
  const [completedTodos, setCompletedTodo] = useState<ITodo[]>([]);
  const [existing, setExisting] = useState<ITodo[]>([...todos])

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

  const categoryTodo = (category: string) => {
    switch (category){
      case 'all':
        setExisting(todos);
        break
      case 'active':
        setExisting(activeTodos);
        break
      case 'completed':
        setExisting(completedTodos);
        break
    }
  }

  const deleteCompletedTodos = () => {
    setTodos(activeTodos);
  } 
 

  useEffect(() => {
    setExisting(todos);
  },[todos])

  useMemo(() => {
    setCompletedTodo([...todos].filter(todo => todo.completed == true))
    setActiveTodos([...todos].filter(todo => todo.completed == false))
  },[todos]);
  
  return (
    <div className='flex justify-center min-h-full'>
      <div className="mt-40 bg-slate-200 shadow-ld w-2/4">
        <Form addNewTodo={addNewTodo}></Form>
        <List items={existing} renderItem={(todo) => <ItemTodo removeTodo={removeTodo} completeTodo={completeTodo} key={todo.id} todo={todo}></ItemTodo>}></List>
        <Footer deleteCompletedTodos={deleteCompletedTodos} categoryTodo={categoryTodo} activeTodos={activeTodos}></Footer>
      </div>
    </div>
  );
}

export default App;