import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders:[],
    processingOrder:false,
    purchased:false,
    loadingOrders:false

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.POST_ORDER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                processingOrder:false,
                purchased:true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.POST_ORDER_FAILED:
            return {
                ...state,
                processingOrder:false
            }
        case actionTypes.PROCESS_ORDER:
            return {
                ...state,
                processingOrder:true
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased:false
            }
        case actionTypes.REQUEST_ORDERS_INIT:
            return {
                ...state,
                loadingOrders:true
            }
        case actionTypes.REQUEST_ORDERS_SUCCESS:
            return {
                ...state,
                loadingOrders:false,
                orders:action.orders
            }
        case actionTypes.REQUEST_ORDERS_FAILED:
            return {
                ...state,
                loadingOrders:false
            }    
        default:
            return state;
    }
}
export default reducer;

