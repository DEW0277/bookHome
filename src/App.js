import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // let name = 'Samariddin';

  // localStorage.setItem('ism', name);

  // let fullName = localStorage.getItem('ism');

  // console.log(fullName);

  // let person = {
  //   name: 'Abdulbosit',
  //   email: 'abdulbosit@gmail.com',
  //   parol: '312312dasd',
  // };

  // const jsonUser = JSON.stringify(person);

  // localStorage.setItem('user', jsonUser);

  // console.log(JSON.parse(localStorage.getItem('user')));

  // localStorage.removeItem('ism');

  // Counter

  const [count, setCount] = useState(
    localStorage.getItem('count') ? +localStorage.getItem('count') : 0
  );

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem('books'))
      ? JSON.parse(localStorage.getItem('books'))
      : []
  );

  const onInputSubmit = () => {
    const newData = {
      name: value1,
      author: value2,
      type: value3,
      cost: value4,
    };

    setBooks([...books, newData]);

    setValue1('');
    setValue2('');
    setValue3('');
    setValue4('');
  };

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [value1]);


  console.log(books)

  return (
    <>
      <div>
        <button onClick={decrement}>-</button>
        <span>{count}</span>
        <button onClick={increment}>+</button>
      </div>
      <input
        type='text'
        value={value1}
        placeholder='Kitob nomi...'
        onChange={(e) => setValue1(e.target.value)}
      />{' '}
      <br />
      <input
        type='text'
        value={value2}
        placeholder='Muallifni kiriting...'
        onChange={(e) => setValue2(e.target.value)}
      />{' '}
      <br />
      <input
        type='text'
        value={value3}
        placeholder='Janrini kirting...'
        onChange={(e) => setValue3(e.target.value)}
      />{' '}
      <br />
      <input
        type='number'
        value={value4}
        placeholder='narxini kiriting...'
        onChange={(e) => setValue4(e.target.value)}
      />
      <br />
      <button onClick={onInputSubmit}>AddBooks</button>




      {books.map((book) =>(
        <div key={book.name} className="book_card">
          <h1>{book.name}</h1>
          <h5>{book.author}</h5>
          <h3>{book.cost}</h3>
        </div>

      ))}
    </>
  );
}
export default App;
