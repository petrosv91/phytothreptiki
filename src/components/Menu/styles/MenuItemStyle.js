import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    margin: 10,
    marginTop: 30,
    height: 200,
    boxSizing: 'border-box',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.9)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'centre',
    justifyContent: 'centre',
    positon: 'relative'
  },
  submenu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    transition: '0.8s ',
    overflow: 'hidden',
    width: 0,
    height: 0
  },
  image: {
    cursor: 'pointer',
    width: 150,
    height: 150
  },
  title: {
    fontFamily: 'Fira Sans Extra Condensed',
    color: 'white'
  },
  icon: {
    boxShadow: '0px 0px 50px 12px rgba(255,255,255,0.56)',
    border: 'solid 1px',
    borderRadius: '50%',
    padding: 30,
    width: 110,
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: 'Fira Sans Extra Condensed',
    opacity: 0.8,
    transition: 'all 100ms linear',
    '&:hover': {
      opacity: '1'
    }
  }
}));
export default useStyles;
