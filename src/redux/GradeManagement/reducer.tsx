import actions from './actions';

const initialState = {
  race_management_data: [],
}

const gradeReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETGRADEMANAGEMENTDATAOK:
      return {
        ...state,
        race_management_data: action.payload
      }
    default:
      return state
  }
}

export default gradeReducer;