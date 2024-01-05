import actions from './actions';

const initialState = {
  point_month_data: [],
  double_circle_month_data: [],
  single_month_data: [],
  multiple_month_data: [],
  point_first_half_year_data: [],
  double_circle_first_half_year_data: [],
  single_first_half_year_data: [],
  multiple_first_half_year_data: [],
  point_year_data: [],
  double_circle_year_data: [],
  single_year_data: [],
  multiple_year_data: [],
}

const homeReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actions.GETHOMEDATAOK:
      return {
        ...state,
        point_month_data: action.payload.point_month_data,
        double_circle_month_data: action.payload.double_circle_month_data,
        single_month_data: action.payload.single_month_data,
        multiple_month_data: action.payload.multiple_month_data,
        point_first_half_year_data: action.payload.point_first_half_year_data,
        double_circle_first_half_year_data: action.payload.double_circle_first_half_year_data,
        single_first_half_year_data: action.payload.single_first_half_year_data,
        multiple_first_half_year_data: action.payload.multiple_first_half_year_data,
        point_year_data: action.payload.point_year_data,
        double_circle_year_data: action.payload.double_circle_year_data,
        single_year_data: action.payload.single_year_data,
        multiple_year_data: action.payload.multiple_year_data,
      }
    default:
      return state
  }
}

export default homeReducer;