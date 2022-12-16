import { FC } from 'react';
import { ITodo } from '../interfaces';

interface TodoProps {
  todo: ITodo;
  onHandleComplete?(id: number, value: boolean): void;
}

const Todo: FC<TodoProps> = ({ todo, onHandleComplete }) => {
  return (
    <div className='d-flex mb-2 mt-2 bcol-ibm-gray-20'>
      <button
        className='mr-3 cursor-pointer'
        onClick={(e) =>
          onHandleComplete ? onHandleComplete(todo.id, !todo.isComplete) : null
        }
      >
        X
      </button>
      <div>
        <h3
          className={todo.isComplete ? 'deco-line-through' : ''}
        >{`${todo.amount}x ${todo.title}`}</h3>
        <h5>{todo.dueDate.toLocaleString()}</h5>
      </div>
    </div>
  );
};

export default Todo;
