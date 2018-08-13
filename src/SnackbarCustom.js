import React from 'react';
import {connect} from "react-redux";
import {Snackbar} from "@material-ui/core/es/index";
import {SNACKBAR_RESTORE} from "./Reducers/Actions";

class SnackbarCustom extends React.Component {
    style = {
        textAlign: 'center',
    };

    render() {
        return (
            <Snackbar
                open={this.props.open}
                autoHideDuration={4000}
                onClose={this.props.restore}
                message={this.props.message}
                action={this.props.action}
                SnackbarContentProps={{style: this.style}}
            />
        );
    }
}

const mapStateToProps = state => {
    const {open, message, action} = state.SnackbarReducer;
    return {
        open, message, action
    };
};

const mapDispatchToProps = dispatch => {
    return {
        restore: () => dispatch({type: SNACKBAR_RESTORE})
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SnackbarCustom);