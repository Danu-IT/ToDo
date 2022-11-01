import React, { FC, useState } from 'react'

interface FooterProps {
    applyFilter: (value: string) => void;
    deleteCompletedTodos: () => void;
    activeTodoLength: number;
    selectedFilter: string;
}

const Footer: FC<FooterProps> = ({applyFilter, deleteCompletedTodos, activeTodoLength, selectedFilter}) => {
    const [category, setCategory] = useState<string>('all');
    const classNameBtn = 'border p-1 border-sky-500 border-2'
    const changeCategory = (e: any) => {
        e.isDefaultPrevented();
        applyFilter(e.target.id);
        setCategory(e.target.id);
    }

    const deleteCompleted = () => {
        deleteCompletedTodos();
    }
  return (
    <div className='flex justify-between bg-white border-t-1 p-3'>
        <span>{activeTodoLength} items left</span>
        <div className='space-x-4 inline-block'>
            <button className={category === 'all' ? classNameBtn : ''} onClick={changeCategory} id='all'>All</button>
            <button className={category === 'active' ? classNameBtn : ''} onClick={changeCategory} id='active'>Active</button>
            <button className={category === 'completed' ? classNameBtn : ''} onClick={changeCategory} id='completed'>Completed</button>
        </div>
        <button onClick={deleteCompleted}>Clear completed</button>
    </div>
  )
}

export default Footer