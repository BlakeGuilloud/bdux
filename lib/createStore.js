module.exports = (reducer) => {
  // By default, declare a null state value;
  let state;

  // Empty array of listener functions;
  let listeners = [];

  const dispatch = (action) => {
    // Dispatch should update state based on the rules laid out in the reduer;
    state = reducer(state, action);

    // Loop over subscribed listeners and invoke each one;
    listeners.forEach(listener => listener());
  };

  // Return the current state;
  const getState = () => state;

  // Concat new listeners into our listeners array;
  const subscribe = (listener) => {
    listeners = listeners.concat(listener);
  };

  return {
    dispatch,
    getState,
    subscribe,
  };
};
