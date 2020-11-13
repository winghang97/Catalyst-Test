const initialState = {};

const SORT_BY_CREATED_TIME = "SORT_BY_CREATED_TIME";
const SORT_BY_UPDATED_TIME = "SORT_BY_UPDATED_TIME";
const SORT_BY_NAME = "SORT_BY_NAME";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_FORK = "FILTER_BY_FORK";

export const sortByCreatedTime = (payload) => ({
  type: SORT_BY_CREATED_TIME,
  payload,
});
export const sortByUpdatedTime = (payload) => ({
  type: SORT_BY_UPDATED_TIME,
  payload,
});
export const sortByName = (payload) => ({
  type: SORT_BY_NAME,
  payload,
});
export const loadData = (payload) => ({
  type: LOAD_DATA,
  payload,
});
export const filterByFork = (payload) => ({
  type: FILTER_BY_FORK,
  payload,
});

const filterStore = (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY_CREATED_TIME:
      //sort by created time
      return state;
    case SORT_BY_UPDATED_TIME:
      //sort by updated time
      return state;
    case SORT_BY_NAME:
      //sort by full name
      return state;
    case FILTER_BY_FORK:
      //filter by forked/not forked
      return state;
    case LOAD_DATA:
      //load data
      let count = action.payload.count;
      let products = generate(count);
      return {
        ...state,
        products,
      };
    default:
      return state;
  }
};

export default filterStore;
