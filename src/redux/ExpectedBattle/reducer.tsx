import actions from './actions';

const initialState = {
  expected_race_data: [],
  expected_battle_data: [],
}

const raceReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETEXPECTEDRACEDATAOK:
      return {
        ...state,
        expected_race_data: action.payload
      }
    case actions.GETEXPECTEDBATTLEDATAOK:
      return {
        ...state,
        expected_battle_data: action.payload
      }
    default:
      return state
  }
}

export default raceReducer;