import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '45%',
    height: '10rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    }
  },
}));

const HeaderImage = () => {
  const cs = useStyles();
  const src = 'https://res.cloudinary.com/dbezwd2bu/image/upload/v1632382047/laptop_njjtgr.png'
  return (
    <Typography component='div' className={cs.root}>
      <img src={src} width='100%' height='100%' alt='Iphone_Groups' />
    </Typography>
  )
}

export default HeaderImage