import React from 'react';
import logo from './logo.svg';
import Productos from '../src/Components/Products';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Menu from '../src/Components/Menu';
import { withStyles } from "@material-ui/core/styles";
import './App.css';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft:'100px'
  },
});

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

function App() {
  const { classes } = styles;
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={1} lg={12} style={{ "width": "1400px", "paddingTop":"1%" }}>
          <Productos/>
        </Grid>
      </header>
    </div>
  );
}

export default App;
