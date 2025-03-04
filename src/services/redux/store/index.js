import {legacy_createStore as createStore} from 'redux' ;
import UserReducer from '../UserReducer';
const store  =  createStore(UserReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 
export default store ;