import { Button } from '@mui/material';
import Logo from '../images/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
function Navbar(props) {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState([]);
  const resultSearch = (e) => {
    if (searchInput) {
      e.preventDefault();
      const searchValue = searchInput.toLowerCase();
      const filteredBooks = props.books.filter((book) =>
        book.name.toLowerCase().includes(searchValue)
      );
      setBooks(filteredBooks);

      setSearchInput('');
    } else {
      setBooks([]);
    }
  };

  return (
    <>
      <div className='navbar_nav'>
        <div className='logo'>
          <a href='/'>
            <img src={Logo} alt='logo-image' />
            <span>BookHome</span>
          </a>
        </div>
        <div className='navbar_nav_btns'>
          <div className='navbar_product__search'>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='book search...'
              type='text'
            />
            <Button
              onClick={resultSearch}
              variant='contained'
              className='search_btn'
            >
              <SearchIcon />
            </Button>
          </div>
          <Button variant={'outlined'} onClick={props.handleClickOpen}>
            Add Book
          </Button>
        </div>
      </div>
      <div>
        {books && books.length > 0
          ? books.map((book) => (
              <div key={book.name} className='card'>
                <h3>Search results</h3>
                <img src={book.book_image} alt='book-image' />
                <h3>{book.name}</h3>
                <p>{book.about_book}</p>
                <span>{book.cost} so'm</span>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default Navbar;
