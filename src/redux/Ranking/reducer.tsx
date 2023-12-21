import actions from './actions';

const initialState = {
  ranking_data: [],
  my_ranking_data: []
}

const rankingReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETRANKINGDATAOK:
      return {
        ...state,
        ranking_data: action.payload
      }
    case actions.GETMYPAGEUSERDATAOK:
      return {
        ...state,
        my_ranking_data: action.payload
      }
    default:
      return state
  }
}

export default rankingReducer;