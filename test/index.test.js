import { createStore } from '../lib';
import userReducer from './helpers/userReducer';

describe('createStore', () => {
  const store = createStore(userReducer);

  describe('subscribing a function', () => {
    it('should subscribe a basic function', () => {
      function greet() {
        return store.getState();
      }

      store.subscribe(greet);
    });

    it('should update local state based on subscribtion', () => {
      let count = 0;

      function updateCount() {
        count += 1;
        console.log('count', count);
      }

      store.subscribe(updateCount);
    });
  });

  describe('basic behavior laid out in reducer', () => {
    it('should create a user', () => {
      store.dispatch({
        type: 'CREATE_USER',
        payload: {
          firstName: 'Blake',
          lastName: 'Guilloud',
        },
      });

      store.dispatch({
        type: 'CREATE_USER',
        payload: {
          firstName: 'Carolyn',
          lastName: 'Rogers',
        },
      });

      const { users } = store.getState();

      expect(users[1]).toHaveProperty('id');
      expect(users[1]).toHaveProperty('firstName');
      expect(users[1].firstName).toEqual('Blake');
      expect(users[1].lastName).toEqual('Guilloud');

      expect(users[2]).toHaveProperty('id');
      expect(users[2]).toHaveProperty('firstName');
      expect(users[2].lastName).toEqual('Rogers');
    });

    it('should update a user', () => {
      store.dispatch({
        type: 'UPDATE_USER',
        payload: {
          id: 1,
          firstName: 'Forrest',
        },
      });

      const { users } = store.getState();

      expect(users[1]).toHaveProperty('id');
      expect(users[1]).toHaveProperty('firstName');
      expect(users[1].firstName).toEqual('Forrest');
      expect(users[1].lastName).toEqual('Guilloud');
    });
  });
});