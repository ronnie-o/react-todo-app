import React, {Component} from "react";
import ReactDOM from 'react-dom';
import './index.css';
import "./App.css";
import {createStore} from 'redux'; // for store

var increId = 1;

// store > reducer(로직) > store > view > action > store

// 1. reducer 생성 : 로직을 처리하는 함수
// action = {
//   type : "ADD",
//   id : 1,
//   text : "text",
//   complete : false
// }
function todoReducer(state = [], action) {
  switch (action.type) {
    case 'ADD': {
      return [...state, { // [a,b,c] + [d] ==> [a, b, c, d]
        id: increId++,
        text: action.text,
        complete: false
      }];
    }
    case 'COMPLETE': {
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

// 2. store 생성 : reducer에 맞는 state를 만들어야 한다.
var store = createStore(todoReducer);

// 3. action creator
function addTodo(text) {
  return {
    type : 'ADD',
    text : text
  };
}

function completeTodo(id) {
  return {
    type : 'COMPLETE',
    id : id
  };
}

class TodoItem extends Component {
  render() {
    var item = this.props.item;
    return (
      <li style={{textDecoration: item.complete ? 'line-through' : 'none'}}
          onClick={() => this.props.toggleComplete(item.id)}>{item.text}</li>
    );
  }
}

class App extends Component {
  addItem() {
    var inputValue = this.refs.inputbox.value;
    if (inputValue === "") {
      return;
    }

    this.props.dispatch(addTodo(inputValue));
    this.refs.inputbox.value = "";
  }

  toggleComplete(id) {
    this.props.dispatch(completeTodo(id))
  }

  render() {
    return (
      <div className="App">
        <h1>TODO LIST</h1>
        <input ref="inputbox"/>
        <button onClick={this.addItem.bind(this)}>add</button>
        <ul>
          {
            this.props.todos.map((item, index) => {
              return (<TodoItem key={index} item={item}
                                toggleComplete={this.toggleComplete.bind(this)}/>)
            })
          }
        </ul>
      </div>
    );
  }
}

// select 함수 : application 상태(store 안에 있는 state), 컴포넌트(App)가 어떤 props가 필요한지를 연결시켜주는 함수
function select(state) {
  return {
    todos : state // Component가 받을 props : store가 가진 state
  }
}

import {connect, Provider} from 'react-redux';

App = connect(select)(App); // 함수, 상태값과 컴포넌트를 연결
// Provider : App 컴포넌트와 store를 연결
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
