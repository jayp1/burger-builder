import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// action creators for submitting orders

export const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.POST_ORDER_SUCCESS,
        orderId: id,
        orderData: orderData

    }
}
export const orderFailure = (error) => {
    return {
        type: actionTypes.POST_ORDER_FAILED,
        error: error
    }
}
export const processOrder = () => {
    return {
        type: actionTypes.PROCESS_ORDER
    }
}

export const placeOrder = (order, token) => {
    return dispatch => {
        axios.post('/orders.json?auth=' +token, order)
            .then(response => {
                dispatch(orderSuccess(response.data.name, order));
                //this.props.history.push('/');
            })
            .catch(error => {
                dispatch(orderFailure(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const requestOrdersInit = () => {
    return {
        type: actionTypes.REQUEST_ORDERS_INIT
    }
}

export const requestOrders = (token, userId) => {
    return dispatch => {
        dispatch(requestOrdersInit());
        const queryParams = '?auth='+ token +'&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' +queryParams)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(requestOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(requestOrdersFailed(error));
            });
    }
}

export const requestOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.REQUEST_ORDERS_SUCCESS,
        orders: fetchedOrders
    }

}
export const requestOrdersFailed = (error) => {
    return {
        type: actionTypes.REQUEST_ORDERS_FAILED,
        error:error
    }
}