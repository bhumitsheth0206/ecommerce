import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import productReducer from './ProductReducer';
import subProductReducer from './SubProductReducer';

const combinedReducers = combineReducers({
    eCommerceUser: userReducer,
    eCommerceProduct: productReducer,
    eCommerceSubProduct: subProductReducer,
});

export default combinedReducers;