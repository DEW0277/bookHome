import { Button } from '@mui/material';
import Logo from '../images/logo.png';
import SearchIcon from '@mui/icons-material/Search';
function Navbar(props) {
  return (
    <div className='navbar_nav'>
      <div className='logo'>
        <a href='/'>
          <img src={Logo} alt='logo-image' />
          <span>BookHome</span>
        </a>
      </div>
      <div className='navbar_nav_btns'>
        <div className='navbar_product__search'>
          <input placeholder='book search...' type='text' />
          <Button variant='contained' className='search_btn'>
            <SearchIcon />
          </Button>
        </div>
        <Button variant={'outlined'} onClick={props.handleClickOpen}>
          Add Book
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
