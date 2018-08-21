import React, { Component } from 'react';
import {connect} from "react-redux";
import {push} from 'connected-react-router';
import { Home } from '@material-ui/icons'
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";
import RightMenu from "./RightMenu";
import {Link} from "react-router-dom";
import Hidden from "../../node_modules/@material-ui/core/Hidden/Hidden";
import Drawer from "../../node_modules/@material-ui/core/Drawer/Drawer";
import Divider from "../../node_modules/@material-ui/core/Divider/Divider";
import MenuIcon from '@material-ui/icons/Menu';
import List from "../../node_modules/@material-ui/core/List/List";
import ListItem from "../../node_modules/@material-ui/core/ListItem/ListItem";
import ListItemIcon from "../../node_modules/@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "../../node_modules/@material-ui/core/ListItemText/ListItemText";
import DateRange from '@material-ui/icons/DateRange';

const styles = {
    appBar: {
        // flexGrow: 1,
        // position: 'fixed'
        position: 'static'
    },
    // text: {
    //     flex: 1,
    // },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    appLabel: {
        fontFamily: "'Shadows Into Light Two', cursive",
        fontWeight: 'bold'
    },
    // homeButton: {
    //     marginLeft: -12,
    //     marginRight: 20,
    // },
    rightMenu: {
        flexGrow: 1,
        display: 'inherit',
        justifyContent: 'flex-end'
    },
    verticalDivider: {
        borderLeft: '1px solid',
        height: '63px',
        marginLeft: '24px',
    }
};

class Navbar extends Component {

    state = {
        drawerOpen: false,
    };

    actions = [
        {
            label: 'Calendar',
            icon: <DateRange/>,
            action: () => {
                this.setState({drawerOpen: false});
                this.props.move('/calendar');
            }
        }
    ];

    homeLink = (
        <Tooltip title="To homepage">
            {/*<IconButton*/}
            {/*style={styles.homeButton}*/}
            {/*color="inherit"*/}
            {/*aria-label="Home"*/}
            {/*onClick={() => this.props.move('/')}*/}
            {/*>*/}
            {/*<Home/>*/}
            {/*</IconButton>*/}
            <Link to='/' style={styles.link}>
                <Typography
                    variant="title"
                    color="inherit"
                    noWrap
                    style={styles.appLabel}
                >
                    SportScope
                </Typography>
            </Link>
        </Tooltip>
    );

    handleDrawerToggle = () => {
        this.setState(state => ({ drawerOpen: !state.drawerOpen }));
    };

    toolbarButtons = (
        <Hidden xsDown>
            <Divider style={styles.verticalDivider}/>
            {this.actions.map((item, index) => (
                <Tooltip title={item.label} key={index}>
                    <IconButton
                        color="inherit"
                        onClick={item.action}
                    >
                        {item.icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Hidden>
    );
    menuIcon = (
        <Hidden smUp>
            <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
            >
                <MenuIcon />
            </IconButton>
        </Hidden>
    );
    drawer = () => (

            <Drawer
                variant="temporary"
                anchor='left'
                open={this.state.drawerOpen}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <List>
                    {this.actions.map((item, index) => (
                        <ListItem button key={index} onClick={item.action}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
    );

    render() {
        // console.log('nav props', this.props);
        console.log(this.state);
        return (

            <AppBar style={styles.appBar}>
                {this.drawer()}
                <Toolbar>
                    {this.menuIcon}
                    {this.homeLink}
                    {this.toolbarButtons}
                    <RightMenu style={styles.rightMenu}/>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        move: newLocation => dispatch(push(newLocation)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);