import React, { memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  button: {
    margin: 10
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
export default memo(function ModalComponent({
  state,
  message,
  CancelProcess,
  cancel
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (state) handleOpen();
    else handleClose();
  }, [state]);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        disableEscapeKeyDown={true}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.container}>
              <h3 id="simple-modal-title">Προσοχή!!!</h3>
              <p style={{ fontWeight: '400' }} id="simple-modal-description">
                {message}
              </p>
            </div>
            <div className={classes.buttonsContainer}>
              <Button
                onClick={() => {
                  CancelProcess();
                  handleClose();
                }}
                className={classes.button}
                variant="contained"
                style={{ backgroundColor: '#eb4034' }}
              >
                Ναι
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  cancel();
                }}
                className={classes.button}
                variant="contained"
              >
                Οχι
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
