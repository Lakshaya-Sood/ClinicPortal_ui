const initialState = {
  articles: []
};
const reducer1 = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ARTICLE":
      return { ...state, articles: [...state.articles, action.payload] };
    default:
      return state;
  }
};
export default reducer1;