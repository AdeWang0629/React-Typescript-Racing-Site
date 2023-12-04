import actions from './actions';

const initialState = {
  isAuthenticated: true,
  userData: {}
}

const authReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
      }
    default:
      return state
  }
}

export default authReducer;