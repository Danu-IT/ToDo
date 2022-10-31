import React, { FC, KeyboardEvent, useState } from 'react'
import { MdKeyboardArrowDown }  from 'react-icons/md'
import { ITodo } from '../../types/types';

interface FormProps {
  addNewTodo: (todo: ITodo) => void;
}

const Form:FC<FormProps> = ({addNewTodo}) => {
  const [value, setValue] = useState('');

  const addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.code === 'Enter') {
      e.preventDefault();
      if(value.trim() == '') return false
      const newTodo:ITodo = {
        id: Date.now(),
        title: value,
        completed: false
      }
      addNewTodo(newTodo);
      setValue('');
    }
  }
  return (
    <form>
      <label htmlFor="text" className='relative text-gray-400 focus-within:text-gray-1000 block'>
        <MdKeyboardArrowDown style={{cursor: 'pointer'}} className='pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3'/>
        <input onKeyDown={addTodo} value={value} onChange={(e) => setValue(e.target.value)} type="text" className='text-black form-input w-full outline-none pl-20  py-3 placeholder:opacity-50' placeholder='What needs to be done?'/>
      </label>
    </form>
  )
}

export default Form