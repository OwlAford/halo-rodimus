const LOCATION_CHANGE = 'LOCATION_CHANGE'

export const updateLocation = ({ dispatch }) => nextLocation => dispatch({
  type: LOCATION_CHANGE,
  payload: nextLocation
})

export default (state = {}, action) => action.type === LOCATION_CHANGE ? action.payload : state
