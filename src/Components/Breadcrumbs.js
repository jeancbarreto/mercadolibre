import React, { Component } from "react";
import PropTypes, { func } from "prop-types";
import { fade, withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import actionsBreadcrumb from '../redux/actions/actionsBreadcrumb'
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import store from "../redux/store";


const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '1%',

            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 800,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
});

const config = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};


class bread extends Component {
    constructor(props) {
        super(props);

        store.subscribe(() => {
            console.log("breadcrumb " , store.getState());
        });

        this.state = {
            Views: []
        }
    }

    onChangeText(valor) {
        this.setState({ Views: valor });
        console.log(console.log("vistas de breadcrumbs ", this.state.Views));
    }

    handleSearching(e) {

        //console.log(this.state.searchQuery);

        const data = this.state.searchQuery
        const action = {
            type: "actionsDocument",
            payload: data
        }
        store.dispatch(action);


        /*this.props.actionsDocument(this.state.searchQuery);*/
    }

    componentWillMount() {
        //this.setState({ searchQuery: this.props.reducerDocument });
        //console.log("datos de redux ", this.props.reducerDocument);
    }


    componentDidMount() {
        //this.setState({ _actualizar: (this.state._datos === [] ? false : true) });
        //this.setState({ searchQuery: this.props.reducerDocument });
        this.state.Views.push(store.getState().reduceBreadcrumbs)
        this.onChangeText(store.getState().reduceBreadcrumbs);
        

    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Breadcrumbs separator="›" aria-label="Breadcrumb">
                    {this.state.Views.map((vista, index) =>{
                        
                        if(vista === "Producto"){
                            return(
                            <Link color="inherit" href="/" >
                                Productos
                            </Link>);
                        }else{
                            
                        }
                    })}
                    
                </Breadcrumbs>
            </div>
        )
    }
}
bread.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        reducerBreadcrumb: state.reducerBreadcrumb
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actionsBreadcrumb: (value) => dispatch(actionsBreadcrumb(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) && withStyles(styles)(bread);
