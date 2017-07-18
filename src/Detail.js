import React, {Component} from 'react';
import TodoItem from './TodoItem'

export default class Details extends Component {
  render() {
    return(
      <div>
        <h1>Id : {this.props.params.id}</h1>
      </div>
    )
  }
}
