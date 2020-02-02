import {GlobalSstore} from './Globalstore';

export const rootReducer = ( state = GlobalSstore, action ) => {
    switch (action.type) {
        case 'UPDATE_QUERY':
            return{
                ...state,
                activepage : action.activepage
            }
            
    }

    return state
}