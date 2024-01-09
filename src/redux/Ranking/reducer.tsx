import actions from './actions';

const initialState = {
  ranking_data: [],
  ranking_status: false,
  my_ranking_data: [],
  my_ranking_status: false,
}

const rankingReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETRANKINGDATAOK:
      return {
        ...state,
        ranking_data: action.payload,
        ranking_status: true
      }
    case actions.GETMYPAGEUSERDATAOK:
      return {
        ...state,
        my_ranking_data: action.payload,
        my_ranking_status: true,
      }
    default:
      return state
  }
}

export default rankingReducer;