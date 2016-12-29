import React, {Component} from "react";
import "./App.css";

// store > reducer(로직) > store > view > action > store

class TodoItem extends Component {
  render() {
    var item = this.props.item;
    return (
      <li style={{textDecoration: item.complete ? 'line-through' : 'none'}}
          onClick={() => this.props.toggleComplete(item.id)}>{item.text}</li>
    );
  }
}

var increId = 1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: []
    }
  }

  addItem() {
    var inputValue = this.refs.inputbox.value;
    if (inputValue === "") {
      return;
    }

    this.setState(prevState => {
      prevState.todolist.push(
        {
          id: increId++,
          text: inputValue,
          complete: false
        }
      );
      return prevState;
    });

    this.refs.inputbox.value = "";
  }

  toggleComplete(id) {
    console.log("id : ", id);
    console.log("this.state : ", this.state);
    this.setState(prevState => {
      prevState.todolist
        .filter(item => item.id === id)
        .map(item => item.complete = !item.complete)
    });
  }

  render() {
    return (
      <div className="App">
        <h1>TODO LIST</h1>
        <input ref="inputbox"/>
        <button onClick={this.addItem.bind(this)}>add</button>
        <ul>
          {
            this.state.todolist.map((item, index) => {
              return (<TodoItem key={index} item={item}
                                toggleComplete={this.toggleComplete.bind(this)}/>)
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
