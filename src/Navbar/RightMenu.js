import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import FingerprintIcon from '@material-ui/icons/Fingerprint';
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Fire from '../Fire';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {logoutUser} from "../Components/Auth/LoginHandler";


// export const parseJWT = token => {
//     let base64Url = token.split('.')[1];
//     let base64 = base64Url.replace('-', '+').replace('_', '/');
//     return JSON.parse(window.atob(base64));
// };


class RightMenu extends React.Component {

    state = {
        anchorEl: null,
    };

    menuID = 'menu-appbar';

    handleMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { photoURL, displayName } = this.props.user;
        return (
            <div style={this.props.style}>
                <IconButton
                    aria-owns={Boolean(this.state.anchorEl) ? this.menuID : null}
                    aria-haspopup="true"
                    onClick={this.handleMenuClick}
                    color="inherit"
                >
                    {photoURL ? <Avatar alt={displayName} src={photoURL} /> : <AccountCircle />}
                </IconButton>
                <Menu
                    id={this.menuID}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={this.props.onLogoutClick}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Logout" />
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.UserReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onLogoutClick: () => Fire.auth().signOut(),
        onLogoutClick: () => dispatch(logoutUser()),
        // move: newLocation => dispatch(push(newLocation)),
        // changeTitle: newTitle => dispatch({type: APPBAR_TITLE_CHANGE, payload: newTitle}),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightMenu);