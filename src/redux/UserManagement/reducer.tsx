import actions from './actions';

const initialState = {
  user_management_data: [],
  user_management_status: false,
}

const gradeReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETUSERMANAGEMENTDATAOK:
      return {
        ...state,
        user_management_data: action.payload,
        user_management_status: true,
      }
    default:
      return state
  }
}

export default gradeReducer;