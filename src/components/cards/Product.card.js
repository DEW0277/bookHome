import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Badge, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductCard({ book }) {
  return (
    <>
      <Card key={book.name} className='card'>
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
          <Typography
            variant='h5'
            component='div'
            sx={{
              fontSize: '24px',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            {book.name}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {book.about_book}
          </Typography>

          <div className='card__footer'>
            <span>{book.cost} so'm</span>
            <Button variant={'contained'}>Buy Now</Button>
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
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
