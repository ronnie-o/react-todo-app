import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux'; // for store
import './index.css';
import "./App.css";
import {todoReducer} from './Reducers'
import App from './App'

// store > reducer(로직) > store > view > action > store
// Reducers.js
// 1. reducer 생성 : 로직을 처리하는 함수
// action = {
//   type : "ADD",
//   id : 1,
//   text : "text",
//   complete : false
// }


// 2. store 생성 : reducer에 맞는 state를 만들어야 한다.
var store = createStore(todoReducer);

// 3. action creator
// Actions.js


// Provider : App 컴포넌트와 store를 연결
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
