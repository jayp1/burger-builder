import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token:null,
    userId:null,
    loading:false,
    error:null,

}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_INIT:
            return {
                ...state,
                loading:true,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId:action.userId,
                token: action.token,
                error:null,
                loading:false,
            }
        case actionTypes.AUTH_FAILURE:
            return {
                ...state,
                token:null,
                userId:null,
                loading:false,
                error:action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token:null,
                userId:null,
            }
        default:
            return state;
    }
} 

export default reducer;