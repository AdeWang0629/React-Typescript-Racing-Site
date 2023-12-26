import actions from './actions';

const initialState = {
  user_management_data: [],
}

const gradeReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETUSERMANAGEMENTDATAOK:
      return {
        ...state,
        user_management_data: action.payload
      }
    default:
      return state
  }
}

export default gradeReducer;