import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import Logo from '../images/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GoogleIcon from '@mui/icons-material/Google';
import { auth } from '../Firebase/fire-config';
import { deepPurple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
function Navbar(props) {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  //  Register Value input
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isError, setIsError] = useState(false);

  const [user, setUser] = useState(null);

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

  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginOpen(false);
  };

  // Register
  const registerUserHandler = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword,
        userName
      );
      const user = userCredential.user;
      setIsAuth(true);
      setOpen(false);
      setUserEmail('');
      setUserName('');
      setUserPassword('');
    } catch (error) {
      console.log(error);
      setIsError(true);
      setOpen(true);
      setUserEmail('');
      setUserName('');
      setUserPassword('');
    }
  };

  // Login

  const loginUserHandler = async () => {
    try {
      const userCredantial = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      setUser(userCredantial.user);
      handleClose();
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUserModal = () => {
    setLoginOpen(true);
    setOpen(false);
  };

  const registerUserModal = () => {
    setLoginOpen(false);
    setOpen(true);
  };

  useEffect(() => {
    const getUser = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuth(true);
    });

    return () => getUser();
  }, []);

  // LogOut
  const logoutUserHandler = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Google auth

  const googleAuthHandler = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      handleClose();
    } catch (error) {
      console.log(error);
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
          <div className='navbar__btns'>
            {isAuth && user ? (
              <div>
                <Button variant={'text'} onClick={handleClick}>
                  {user.photoURL ? (
                    <img
                      className='user_image'
                      src={user.photoURL}
                      alt='user-image'
                    />
                  ) : (
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
                  )}
                </Button>

                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {user.email === 'admin@gmail.com' ? (
                    <MenuItem onClick={handleClose}>
                      {' '}
                      <Button variant={'text'} onClick={props.handleClickOpen}>
                        Add Book
                      </Button>
                    </MenuItem>
                  ) : null}
                  <MenuItem onClick={handleClose}>{user.email}</MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button variant={'text'} onClick={logoutUserHandler}>
                      LogOut
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button variant={'outlined'} onClick={handleClickOpen}>
                Register
              </Button>
            )}
          </div>
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
      {/* Register */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Register</DialogTitle>

        <DialogContent style={{ width: '500px' }}>
          <p>
            Agar accountingiz bo'lsa{' '}
            <Button variant={'text'} onClick={loginUserModal}>
              Login
            </Button>
          </p>
          <div className='book_register'>
            <input
              type='text'
              value={userName}
              placeholder='Enter full name...'
              onChange={(e) => setUserName(e.target.value)}
            />{' '}
            <br />
            <input
              type='text'
              value={userEmail}
              placeholder='Enter email...'
              onChange={(e) => setUserEmail(e.target.value)}
            />{' '}
            <br />
            <input
              type='text'
              value={userPassword}
              placeholder='Enter password...'
              onChange={(e) => setUserPassword(e.target.value)}
            />{' '}
          </div>
          {isError ? (
            <span>
              Siz bu email orqali oldin ro'yxatdan o'tgansiz.{' '}
              <Button onClick={loginUserModal} variant={'text'}>
                Login
              </Button>{' '}
              qiling.
            </span>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} onClick={registerUserHandler}>
            Register
          </Button>
          <Button
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={handleClose}
            autoFocus
          >
            Cencel
          </Button>
        </DialogActions>
        <div style={{ margin: '10px' }}>
          <Button className='google_register' onClick={googleAuthHandler}>
            <GoogleIcon className='google_icon' />
            <span>Register with Google</span>
          </Button>
        </div>
      </Dialog>
      {/* Login  */}
      <Dialog
        open={loginOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Login</DialogTitle>

        <DialogContent style={{ width: '500px' }}>
          <p>
            Agar accountingiz bo'lsa{' '}
            <Button variant={'text'} onClick={registerUserModal}>
              Register
            </Button>
          </p>
          <div className='book_register'>
            <input
              type='text'
              value={userEmail}
              placeholder='Enter email...'
              onChange={(e) => setUserEmail(e.target.value)}
            />{' '}
            <br />
            <input
              type='text'
              value={userPassword}
              placeholder='Enter password...'
              onChange={(e) => setUserPassword(e.target.value)}
            />{' '}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} onClick={loginUserHandler}>
            Login
          </Button>
          <Button
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={handleClose}
            autoFocus
          >
            Cencel
          </Button>
        </DialogActions>
        <div style={{ margin: '10px' }}>
          <Button className='google_register' onClick={googleAuthHandler}>
            <GoogleIcon className='google_icon' />
            <span>Login with Google</span>
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default Navbar;
