import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import { fade, withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import actionsDocument from '../redux/actions/actionsDocument'
import { connect } from 'react-redux'
import axios from "axios";
import store from "../redux/store";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Typography } from "@material-ui/core";


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%'
    },
    title: {
        marginLeft: '2%',
        marginTop: 30
    },
    thumbnail: {
        width: '100%',
        height: '100%'
    },
    imageList: {
        width: 30,
        height: 30
    },
    button: {
        margin: theme.spacing(1),
    },
});

const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};


class DetailsProduct extends Component {
    constructor(props) {
        super(props);

        store.subscribe(() => {
            //console.log(store.getState());
        });
        this.state = {
            _items: [],
            _pictures: [],
            _imagePrincipal: "",
            _attributes: []
        }

        this.handleSearching(this.props.match.params.id);
    }

    onChangeText(e) {
        this.setState({ searchQuery: e.target.value })
    }

    handleSearching(id) {
        console.log("id ", id);
        axios.get("https://api.mercadolibre.com/items/" + id + "").then(result => {
            if (result.data !== undefined) {
                this.setState({ _items: result.data });
                this.setState({ _pictures: result.data.pictures });
                this.setState({ _imagePrincipal: result.data.pictures[0].url });
                this.setState({ _attributes: result.data.attributes})
               console.log("datos ", result.data);
            }
        }).catch(error => {
            console.log("Error ", error);
        })
    }

    componentWillMount() {
        this.setState({ searchQuery: this.props.reducerDocument });
        //console.log("datos de redux ", this.props.reducerDocument);
    }


    componentDidMount() {
        //this.setState({ _actualizar: (this.state._datos === [] ? false : true) });
        this.setState({ searchQuery: this.props.reducerDocument });
        //console.log("datos de redux ", this.state.htmlNew);

    }


    render() {
        const { classes } = this.props;

        return (
            <Grid container textAlign={"center"} spacing={1} lg={12} style={{ "width": "1400px", "paddingTop": "2 %" }}>
              
                <Paper className={classes.paper} style={{ "marginLeft": "15%" }}>
                    <Grid container sm={12} xs={12}>
                        <Grid item sm={6}>
                            <img src={this.state._imagePrincipal} alt="producto" />
                        </Grid>
                        <Grid item sm={6}>
                            <small></small>
                            <Typography variant="h4">
                                {this.state._items.title}
                            </Typography>
                            <Typography variant="h3">
                                $ {parseInt(this.state._items.price).toLocaleString()} 
                            </Typography>
                            <br/>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Comprar
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="h4" style={{"float":"left"}}>
                        Descripción del Producto
                    </Typography>
                    <Grid container sm={12} xs={12}>
                        {this.state._attributes.map((atributos, index) => {
                            return (
                                <b>
                                    {atributos.name}: {atributos.value_name} &nbsp; 
                                </b>
                            )
                        })}
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}
DetailsProduct.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps) && withStyles(styles)(DetailsProduct);
