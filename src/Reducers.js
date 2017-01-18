import {ADD, COMPLETE} from './Actions'

var increId = 1;

export function todoReducer(state = [], action) {
  switch (action.type) {
    case ADD: {
      return [...state, { // [a,b,c] + [d] ==> [a, b, c, d]
        id: increId++,
        text: action.text,
        complete: false
      }];
    }
    case COMPLETE: {
      return state.map(item => {
        if (item.id === action.id) {
          item.complete = !item.complete;
        }
        return item;
      });
    }
    default:
      return state;
  }
}
