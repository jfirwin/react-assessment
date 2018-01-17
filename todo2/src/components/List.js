import React, { Component } from 'react';
import Item from './Item.js'
import CompleteItem from './CompleteItem.js'
import NewItem from './NewItem.js'
import axios from 'axios'
import { connect } from 'react-redux'

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
      .then(res => this.props.dispatch({type: 'COMPLETE_TASK', payload: res.data}))
  }
  taskDelete(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`)
      .then(res => this.props.dispatch({type: 'DELETE_TASK', payload: res.data}))
  }
  taskAdd(title) {
    axios.post(`https://practiceapi.devmountain.com/api/tasks`, {title: title})
      .then(res => this.props.dispatch({type: 'ADD_TASK', payload: res.data}))
  }
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/tasks')
      .then(res => this.props.dispatch({type: 'INITIAL_LIST', payload: res.data}))
      .catch(error => console.log(error))
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps === this.props) {
      this.setState({tasks: this.props.tasks})
    } else if(nextProps !== this.props) {
      this.setState({tasks: nextProps.tasks})
    }
  }
  render() {
    return (
      <div>
        <h3>To Do List</h3>
        <NewItem add={this.taskAdd}/>
        {
          this.state.tasks.length > 0
          ?
          this.props.tasks.map(item => {
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
function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}
export default connect(mapStateToProps)(List);
