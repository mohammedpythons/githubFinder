const alertReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ALERT":
      return payload;

    case "REMOVE_ALERT":
      return null;

    default:
      return state;
  }
};

export default alertReducer;
