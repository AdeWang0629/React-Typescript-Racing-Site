import actions from './actions';

const initialState = {
  race_management_data: [],
  race_management_staus: false,
}

const gradeReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETGRADEMANAGEMENTDATAOK:
      return {
        ...state,
        race_management_data: action.payload,
        race_management_staus: true,
      }
    default:
      return state
  }
}

export default gradeReducer;