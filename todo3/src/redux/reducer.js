function reducer(state, action) {
    switch ( action.type ) {
      case 'INITIAL_LIST':
        return Object.assign({}, state, {
          tasks: action.payload,
        })
      case 'ADD_TASK':
        return Object.assign({}, state, {
          tasks: action.payload,
        })
      case 'COMPLETE_TASK':
        return Object.assign({}, state, {
          tasks: action.payload,
        })
      case 'DELETE_TASK':
        return Object.assign({}, state, {
          tasks: action.payload,
        })
      default: return state
    }
}
export default reducer;
