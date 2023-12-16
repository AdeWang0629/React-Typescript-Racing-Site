import actions from './actions';

const initialState = {
  places: [],
  races: [],
  specific_races: [],
}

const expectedReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETPLACESOK:
      return {
        ...state,
        places: action.payload
      }
    case actions.GETRACESDATAOK:
      return {
        ...state,
        races: action.payload
      }
    case actions.GETSPECIFICRACEDATAOK:
      return {
        ...state,
        specific_races: action.payload
      }
    default:
      return state
  }
}

export default expectedReducer;