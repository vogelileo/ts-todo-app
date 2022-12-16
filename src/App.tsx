import './cssClasses20221216.scss';

import { ChangeEvent, FC, useState } from 'react';
import { IInputData, ITodo } from './interfaces';

import Todo from './components/Todo';

type TInputDataKey = keyof IInputData;

const App: FC = () => {
  const [data, setData] = useState<IInputData>({
    title: '',
    amount: 0,
    date: new Date(),
  });

  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: TInputDataKey
  ): void => {
    let dataTemp: IInputData = { ...data };
    if (type === 'title') {
      dataTemp[type] = event.target.value;
    }
    if (type === 'amount') {
      dataTemp[type] = Number(event.target.value);
    }
    if (type === 'date') {
      dataTemp[type] = new Date(event.target.value);
    }

    setData(dataTemp);
  };

  const handleAdd = (): void => {
    setTodos([
      ...todos,
      {
        id: todos.length,
        title: data.title,
        amount: data.amount,
        dueDate: data.date,
        isComplete: false,
      },
    ]);
  };

  const handleCompleteChange = (id: number, value: boolean): void => {
    let tempTodos = [...todos];
    tempTodos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = value;
      }
      return todo;
    });
    setTodos(tempTodos);
  };

  return (
    <div className='App'>
      <input
        type='text'
        placeholder='Enter title'
        value={data.title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'title')
        }
      />
      <input
        type='number'
        placeholder='Enter amount'
        value={data.amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'amount')
        }
      />
      <input
        type='date'
        placeholder='Enter due date'
        value={data.date.toISOString().split('T')[0]}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'date')}
      />
      <button onClick={handleAdd}>Submit</button>
      <div>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            onHandleComplete={(id, value) => handleCompleteChange(id, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
