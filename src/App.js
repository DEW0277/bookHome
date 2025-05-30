import { useEffect, useState } from 'react';
import './App.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import ProductCard from './components/cards/Product.card';
import { Button } from '@mui/material';
import { db } from './Firebase/fire-config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';

function App() {
  const [value1, setValue1] = useState('');
  const [imageValue1, setImageValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [authorImage, setAuthorImage] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [createBookDate, setCreateBookDate] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [books, setBooks] = useState([]);

  const booksCollectionRef = collection(db, 'books');

  const onInputSubmit = async () => {
    if (
      value1 &&
      value2 &&
      value3 &&
      value4 &&
      imageValue1 &&
      authorImage &&
      bookDescription &&
      createBookDate
    ) {
      const newData = {
        name: value1,
        author: value2,
        type: value3,
        cost: value4,
        book_image: imageValue1,
        author_image: authorImage,
        about_book: bookDescription,
        date: createBookDate,
        id: uuidv4(),
      };
      try {
        await addDoc(booksCollectionRef, newData);

        setValue1('');
        setValue2('');
        setValue3('');
        setValue4('');
        setImageValue1('');
        setAuthorImage('');
        setBookDescription('');
        setCreateBookDate('');
      } catch (error) {
        console.log(error);
      }

      handleClose();
    } else {
      alert("Bo'sh maydonni to'ldiring");
    }
  };

  const fetchBooks = () => {
    onSnapshot(booksCollectionRef, (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));

      setBooks(booksData);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // deleteBook
  const deleteBookHandler = async (docId) => {
    try {
      await deleteDoc(doc(db, 'books', docId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar books={books} handleClickOpen={handleClickOpen} />

      <Dialog
        style={{ padding: '20px' }}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Kitob qo'shish</DialogTitle>
        <DialogContent style={{ width: '500px' }}>
          <div className='modal'>
            <input
              type='text'
              value={value1}
              placeholder='Kitob nomi...'
              onChange={(e) => setValue1(e.target.value)}
            />{' '}
            <br />
            <input
              type='text'
              value={imageValue1}
              placeholder='Kitob rasmi...'
              onChange={(e) => setImageValue1(e.target.value)}
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
              value={authorImage}
              placeholder='muallifning rasmi...'
              onChange={(e) => setAuthorImage(e.target.value)}
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
            <input
              type='date'
              value={createBookDate}
              placeholder='narxini kiriting...'
              onChange={(e) => setCreateBookDate(e.target.value)}
            />
            <br />
            <textarea
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
            ></textarea>
            <Button variant={'contained'} onClick={onInputSubmit}>
              AddBooks
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className='books_cards'>
        {books.map((book) => (
          <ProductCard
            key={book.docId}
            book={book}
            deleteBookHandler={deleteBookHandler}
          />
        ))}
      </div>
    </>
  );
}
export default App;
