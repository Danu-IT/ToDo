import React, { FC, MouseEvent, useRef } from 'react'
import { ITodo } from '../../types/types';

interface FooterProps {
    activeTodos: ITodo[];
    categoryTodo: (category: string) => void;
    deleteCompletedTodos: () => void
}

const Footer: FC<FooterProps> = ({deleteCompletedTodos, activeTodos, categoryTodo}) => {

    const changeCategory = (e: any) => {
        e.isDefaultPrevented();
        categoryTodo(e.target.id)
    }
  return (
    <div className='flex justify-between bg-white border-t-1 p-3'>
        <span>{activeTodos.length} items left</span>
        <div className='space-x-4 inline-block'>
            <button onClick={changeCategory} id='all'>All</button>
            <button onClick={changeCategory} id='active'>Active</button>
            <button onClick={changeCategory} id='completed'>Completed</button>
        </div>
        <button onClick={deleteCompletedTodos}>Clear completed</button>
    </div>
  )
}

export default Footer