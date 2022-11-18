import Action from "./Action";

const Reducer = (state, action) => {
    switch (action.type) {
        case Action.ADD_TO_CART:
            return  [...state,action.payload];
        case Action.REMOVE_FROM_CART:
            return state.filter((item) => item.id !== action.payload.id);
        case Action.CLEAR_CART:
            return [];
        default:
            return state;
    }
}

export default Reducer;