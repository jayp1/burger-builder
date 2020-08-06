import React from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import {connect} from 'react-redux';

class Layout extends React.Component {
    state = {
        showSidedrawer: false
    }

    handleSidedrawerClose = () => {
        this.setState({ showSidedrawer: false });
    }
    handleToggleClicked = () => {
        this.setState((prevState) => {
            return { showSidedrawer: !prevState.showSidedrawer };
        });
    }


    render() {
        return (
            <Auxiliary>
                <Toolbar clicked={this.handleToggleClicked} isLoggedIn={this.props.loggedIn} />
                <Sidedrawer open={this.state.showSidedrawer} closed={this.handleSidedrawerClose} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
};
const mapStateToProps = state => {
    return {
        loggedIn: state.auth.token != null, 
    }
}

export default connect(mapStateToProps)(Layout);