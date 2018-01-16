import React, { Component } from 'react';
import Item from './Item.js'
import CompleteItem from './CompleteItem.js'
import NewItem from './NewItem.js'
import axios from "axios"

class List extends Component {
  constructor(){
    super()
    this.state = {tasks: []}
    this.taskDelete = this.taskDelete.bind(this)
    this.taskComplete = this.taskComplete.bind(this)
    this.taskAdd = this.taskAdd.bind(this)
  }

  taskComplete(id) {
    axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`)
      .then(res => this.setState({tasks: res.data}))
  }
  taskDelete(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
      .then(res => this.setState({tasks: res.data}))
  }
  taskAdd(title) {
    axios.post(`https://practiceapi.devmountain.com/api/tasks`, {title: title})
      .then(res => this.setState({tasks: res.data}))
  }
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/tasks')
      .then(res => this.setState({tasks: res.data}))
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        <h3>To Do List</h3>
        <NewItem add={this.taskAdd}/>
        {
          this.state.tasks.length > 0
          ?
          this.state.tasks.map(item => {
            return item.completed ?
              <CompleteItem key={item.id} item={item} complete={this.taskComplete} remove={this.taskDelete}/>
              :
              <Item key={item.id} item={item} complete={this.taskComplete} remove={this.taskDelete}/>
          })
          :
          'Nothing Here'
        }
      </div>
    );
  }
}

export default List;
