const initialState = {
    createBasketStatus:undefined,
    updateBasketStatus:undefined,
    deleteBasketStatus:undefined,
    assignUserToBasketStatus:undefined,
    removeUserToBasketStatus:undefined,
}

const basketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'CREATE_BASKET_PENDING':
            return {...state, createBasketStatus:'pending'}
        case 'CREATE_BASKET_SUCCESS':
            return {...state, createBasketStatus:'done'}
        case 'CREATE_BASKET_ERROR':
            return {...state, createBasketStatus:'error'}

        case 'UPDATE_BASKET_PENDING':
            return {...state, updateBasketStatus:'pending'}
        case 'UPDATE_BASKET_SUCCESS':
            return {...state, updateBasketStatus:'done'}
        case 'UPDATE_BASKET_ERROR':
            return {...state, updateBasketStatus:'error'}

        case 'DELETE_BASKET_PENDING':
            return {...state, deleteBasketStatus:'pending'}
        case 'DELETE_BASKET_SUCCESS':
            return {...state, deleteBasketStatus:'done'}
        case 'DELETE_BASKET_ERROR':
            return {...state, deleteBasketStatus:'error'}

        case 'ASSIGN_USER_BASKET_PENDING':
            return {...state, assignUserToBasketStatus:'pending'}
        case 'ASSIGN_USER_BASKET_SUCCESS':
            return {...state, assignUserToBasketStatus:'done'}
        case 'ASSIGN_USER_BASKET_ERROR':
            return {...state, assignUserToBasketStatus:'error'}

        case 'REMOVE_USER_BASKET_PENDING':
            return {...state, removeUserToBasketStatus:'pending'}
        case 'REMOVE_USER_BASKET_SUCCESS':
            return {...state, removeUserToBasketStatus:'done'}
        case 'REMOVE_USER_BASKET_ERROR':
            return {...state, removeUserToBasketStatus:'error'}

        default:
            return state
    }
}
export default basketReducer
