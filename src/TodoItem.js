import React, {Component} from 'react';
import {completeTodo} from './Actions';
import {Link} from 'react-router';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  toggleComplete(id) {
    this.props.dispatch(completeTodo(id));
  }

  render() {
    var item = this.props.item;
    // return (
    //   <li style={{textDecoration: item.complete ? 'line-through' : 'none'}}
    //       onClick={() => this.props.toggleComplete(item.id)}>{item.text}</li>
    // );
    var url = "/" + item.id;
    return (
      <li style={{textDecoration : item.complete ? 'line-through' : 'none'}}>
        <Link to={url}>{item.text}</Link> <button onClick={()=>this.toggleComplete(item.id)} >DONE</button>
      </li>
    )
  }
}
