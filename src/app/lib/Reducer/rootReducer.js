import { combineReducers } from 'redux';
import companyReducer, { setLogout as companySetLogout } from './companySlice';
import employeeReducer, { setLogout as employeeSetLogout } from './employeeSlice';

const appReducer = combineReducers({
    company: companyReducer,
    employee: employeeReducer,
    // other reducers
});

const rootReducer = (state, action) => {
    if (action.type === companySetLogout.type || action.type === employeeSetLogout.type) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;
