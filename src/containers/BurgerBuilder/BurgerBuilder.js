import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as builderActions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        order: false,
    }
    componentDidMount() {
        if (!this.props.ings) {
            this.props.initIngredients();
        } 
        
    }

    handleOrder = () => {
        if(this.props.isLoggedIn){
            this.setState({ order: true });
        } else {
            this.props.history.push('/login');
        }
        
    }

    updatePurchaseState = (price) => {
        return price > 4.1;
    }

    handleCancel = () => {
        this.setState({ order: false });
    }
    handleConfirm = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }


    render() {
        const disabledProp = { ...this.props.ings };
        for (let key in disabledProp) {
            disabledProp[key] = disabledProp[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Error: Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {

            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        price={this.props.totalPrice}
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabledInfo={disabledProp}
                        orderStatus={this.updatePurchaseState(this.props.totalPrice)}
                        orderNow={this.handleOrder} 
                        isLoggedIn={this.props.isLoggedIn}/>
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                modalClosed={this.handleCancel}
                confirm={this.handleConfirm}
                ingredients={this.props.ings}
                price={this.props.totalPrice} />;
        }
        
        return (
            <Auxiliary>
                <Modal modalClosed={this.handleCancel}
                    show={this.state.order}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.build.ingredients,
        totalPrice: state.build.totalPrice,
        error: state.build.error,
        isLoggedIn: state.auth.token !== null,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(builderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(builderActions.removeIngredient(ingName)),
        initIngredients: () => dispatch(builderActions.initIngredients()),
        initPurchase: () => dispatch(builderActions.purchaseInit())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));