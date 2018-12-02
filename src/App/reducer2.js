const initialState = {
    users: []
  };
  const reducer2 = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_ARTICLE":
        return { ...state, users: [...state.users, action.payload] };
      default:
        return state;
    }
  };
  export default reducer2;