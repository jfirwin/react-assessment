import React, { Component } from 'react';

class NewItem extends Component {
  constructor(){
    super()
    this.state = {title: ''}
  }
  addItem(title) {

  }
  render() {
    return (
      <div>
        <input value={this.state.title} placeholder={'Title'} onChange={(e) => this.setState({title: e.target.value})}/>
        <button disabled={this.state.title === ''} onClick={() => {
          this.props.add(this.state.title)
          this.setState({id: null, title: '', description: '', completed: false})
        }}>Add New To-Do</button>
      </div>
    );
  }
}

export default NewItem;
