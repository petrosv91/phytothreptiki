/* MENU COMPONENT THAT RENDERS THE MENU ITEMS */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from './MenuItem';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 0),
    width: '100%',
    margin: 'auto',
    minHeight: 300,
    backgroundColor: 'inherit'
  }
}));

export default function Menu(props) {
  const [menus, setMenus] = useState([]);
  const classes = useStyles();
  const updateMenus = updatedMenus => {
    setMenus(updatedMenus);
  };
  useEffect(() => {
    setMenus(JSON.parse(localStorage.getItem('MenuStructure')));
    //init steps when user loads the menu
  }, []);
  const backgrounds = [
    '#EA2173',
    '#82BB27',
    '#11ACE0',
    '#8D489B',
    '#FF5000',
    '#59C3B6',
    '#F3B01A',
    '#D62527'
  ];
  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container justify="flex-start">
        {menus.map((menu, index) => (
          <Grid key={index} item xs={6} lg={6} sm={6}>
            <MenuItem
              update={updateMenus}
              index={index}
              menu={menu}
              color={backgrounds[index]}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
