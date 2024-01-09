import actions from './actions';

const initialState = {
  expected_race_data: [],
  expected_race_status: false,
  expected_battle_data: [],
}

const raceReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETEXPECTEDRACEDATAOK:
      return {
        ...state,
        expected_race_data: action.payload,
        expected_race_status: true,
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