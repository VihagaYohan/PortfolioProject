import {createStore,combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';

// reducers
import cartReducer from './reducers/cart'

const rootReducer = combineReducers({
    cart:cartReducer
})

const configureStore = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default configureStore;