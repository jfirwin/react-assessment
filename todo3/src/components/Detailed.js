import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Detailed extends Component {
  constructor() {
    super()

    this.state = {
      currentTask: {
        id: null,
        title: '',
        description: '',
        complete: null
      }
    }
  }
  setCurrentTask(id) {
    let taskIndex = this.props.tasks.findIndex(task => {return task.id == id})
    let currentTask = this.props.tasks[taskIndex]
    this.setState(currentTask)
  }

  componentDidMount(){
    this.setCurrentTask(this.props.match.params.id)
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps === this.props) {
      this.setCurrentTask(this.props.match.params.id)
    } else if(nextProps !== this.props) {
      this.setCurrentTask(nextProps.match.params.id)
    }
  }
  render() {
    return (
      <div>
        <h3>Detailed View</h3>
        <Link to='/'>{'<'} Back To Tasks</Link>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div>
          Task <input onChange={(e) => this.setState({title: e.target.value})}value={this.state.title}/>
          {this.state.completed?
            <button disabled={true}>☑️</button>
            :<button onClick={() => {
              axios.put(`https://practiceapi.devmountain.com/api/tasks/${this.state.id}`)
                .then(res => {
                  this.props.dispatch({type: 'COMPLETE_TASK', payload: res.data})
                  this.props.history.push('/')
                })
              }}>✅</button>}
          </div>
          <div>
          Description <input onChange={(e) => this.setState({description: e.target.value})}value={this.state.description}/>
          </div>
          <div>
              <button onClick={() => {
                axios.patch(`https://practiceapi.devmountain.com/api/tasks/${this.state.id}`, {title: this.state.title, description: this.state.description, completed: this.state.completed})
                  .then(res => {
                    this.props.dispatch({type: 'UPDATE_TASK', payload: res.data})
                    this.props.history.push('/')
                  })
              }}>Save</button>
            <button onClick={() => this.setCurrentTask(this.props.match.params.id)}>Cancel</button>
            <button onClick={() => {
              axios.delete(`https://practiceapi.devmountain.com/api/tasks/${this.state.id}`)
                .then(res => {
                  this.props.dispatch({type: 'DELETE_TASK', payload: res.data})
                  this.props.history.push('/')
                })

            }}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}
export default connect(mapStateToProps)(Detailed);
