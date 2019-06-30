import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Description from '@material-ui/icons/Description';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import axios from "axios";
import actionsDocument from '../redux/actions/actionsDocument'
import { connect } from 'react-redux';
import store from "../redux/store";
import { Typography } from "@material-ui/core";
import { type } from "os";
//import store from "../redux/store";



const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%'
    },
    title: {
        marginLeft: '2%',
        marginTop:30
    },
    thumbnail: {
        width: '100%',
        height: '100%'
    }
});

const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};

class Product extends Component {
    constructor(props) {
        super(props);
       
        
        this.state = {
            valueRedux: "",
            query: "",
            _items: []
        };
        store.subscribe(() => {
            this.handleAllItem(store.getState());
        });
        
        
        
        
        
    }

    handleAllItem(value) {
    
        axios.get("https://api.mercadolibre.com/sites/MLA/search?q=:" + (value !== undefined ? value.reduceDocument : "ipod") + "").then(result => {
            if (result.data !== undefined) {
                this.setState({ _items: result.data.results });
                console.log("datos ", this.state._items);
            }
        }).catch(error => {
            console.log("Error ", error);
        })
    }

    handleClicChangeDocument(event) {


    }


    componentWillMount() {
        this.setState({valueRedux : store.getState()});
        this.handleAllItem();
    }


    componentDidMount() {
        this.setState({ valueRedux: store.getState() });
    }

    render() {
        const { classes } = this.props;

        return (
          
            
            <Paper className={classes.paper}>
                
                {this.state._items.map((product, index) => {
                    return (
                        <List className={classes.root}>
                            <ListItem alignItems="flex-start" className={classes.title}>
                                <Grid item xs={3} sm={2}>
                                    <a href={'/detail/' + product.id}><img src={product.thumbnail} className={classes.thumbnail} alt="alto" /></a>
                                </Grid>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <a href={'/detail/' + product.id}><Typography
                                                component="span"
                                                variant="h4"
                                                className={classes.title}
                                                color="textPrimary"
                                                
                                            >
                                                $ {parseInt(product.price).toLocaleString()}
                                            </Typography></a>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="h6"
                                                className={classes.title}
                                                color="textPrimary"
                                            >
                                                {product.title}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                <Grid item xs={3} sm={2} alignItems="flex-end">
                                    <small>{product.address.state_name}</small>
                                </Grid>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    )
                })}
            </Paper>
        );
    }
}

Product.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        reducerDocument: state.reducerDocument
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionsDocument: (value) => dispatch(actionsDocument(value))
    }
}


export default connect(mapDispatchToProps, mapStateToProps) && withStyles(styles)(Product);

