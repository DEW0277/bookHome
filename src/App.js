import { useEffect, useState } from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Badge } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Navbar from './components/Navbar';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

function App() {
  const [value1, setValue1] = useState('');
  const [imageValue1, setImageValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [authorImage, setAuthorImage] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [createBookDate, setCreateBookDate] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(bookDescription);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem('books'))
      ? JSON.parse(localStorage.getItem('books'))
      : []
  );

  const onInputSubmit = () => {
    if (
      value1 !== '' &&
      value2 !== '' &&
      value3 !== '' &&
      value3 !== '' &&
      value4 !== '' &&
      imageValue1 !== '' &&
      authorImage !== '' &&
      bookDescription !== '' &&
      createBookDate !== ''
    ) {
      alert("Bo'sh maydonni to'ldiring");
    } else {
      const newData = {
        name: value1,
        author: value2,
        type: value3,
        cost: value4,
        book_image: imageValue1,
        author_image: authorImage,
        about_book: bookDescription,
        date: createBookDate,
      };

      setBooks([...books, newData]);
      setValue1('');
      setValue2('');
      setValue3('');
      setValue4('');
    }
  };

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [value1]);

  console.log(books);

  return (
    <>
      <Navbar handleClickOpen={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
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
            <button onClick={onInputSubmit}>AddBooks</button>
          </div>
        </DialogContent>
      </Dialog>

      {books.map((book) => (
        <Card key={book.name} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={book.author_image}
                  alt='author-image'
                />
              </Avatar>
            }
            action={<Badge color='secondary'>{book.type}</Badge>}
            title={book.author}
            subheader={book.date}
          />
          <CardMedia
            component='img'
            height='194'
            image={book.book_image}
            alt='Paella dish'
          />
          <CardContent>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {book.about_book}
            </Typography>

            <div className='card__footer'>
              <span>{book.cost} so'm</span>
              <button>Buy Now</button>
            </div>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton>
            <IconButton aria-label='share'>
              <DeleteIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don&apos;t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
}
export default App;
