import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';

class Logout extends React.Component {

    componentDidMount () {
        this.props.logout();
    }

    render() {
        return <Redirect to="/"/>;
    }

}

const MapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout()),
    }
};

export default connect(null, MapDispatchToProps)(Logout);