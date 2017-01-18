import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import {addTodo, completeTodo} from './Actions';
import TodoItem from './TodoItem'


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

export default connect(select)(App); // 함수, 상태값과 컴포넌트를 연결
