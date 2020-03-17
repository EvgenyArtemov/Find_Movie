const initialState = {
    isLoading: false,
    isError: false,
    data: []
}

const randomMoviesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_RANDOM_MOVIES':
          return {
            ...state,
            data: action.data,
        };

        case 'LOAD_START':
            return {
                ...state,
                isLoading: true
            };

        case 'LOAD_END':
            return {
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}

export default randomMoviesReducer;