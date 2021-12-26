
import './App.css';
import React, { Component } from 'react';
import Customer from './components/Customer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { mergeClasses, withStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class App extends Component {

  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1})
  }

  render() {
    const { classes } = this.props;
    return (
        <div>
          {this.state.customers ? this.state.customers.map(c => {
            return(
              <Customer 
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            )
          }) : 
          <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
          }
        </div>
    );
  }
}

export default App;
