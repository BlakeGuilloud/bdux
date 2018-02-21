const initialState = {
  nextUserId: 0,
  users: {},
};

const handleCreateUser = (state, action) => {
  const nextUserId = state.nextUserId + 1;
  const newUser = {
    id: nextUserId,
    firstName: action.payload.firstName,
    lastName: action.payload.lastName,
  };

  return {
    ...state,
    nextUserId,
    users: {
      ...state.users,
      [nextUserId]: newUser,
    },
  };
};

const handleUpdateUser = (state, action) => {
  return {
    ...state,
    users: {
      ...state.users,
      [action.payload.id]: {
        ...state.users[action.payload.id],
        ...action.payload,
      },
    },
  };
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return handleCreateUser(state, action);
    case 'UPDATE_USER':
      return handleUpdateUser(state, action);
    default:
      return state;
  }
};
