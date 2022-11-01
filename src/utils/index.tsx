import { ITodo } from "../types/types";

export const completedTodo = (todos: ITodo[]) => [...todos].filter(todo => todo.completed === true);

export const activeTodo = (todos: ITodo[]) => [...todos].filter(todo => todo.completed === false)