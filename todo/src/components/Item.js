import React from 'react';
import axios from 'axios';

function Item(props) {
  return (
    <div style={{display: 'flex', align: 'center', justifyContent: 'center'}}>
      <div>
        {props.item.title}
      </div>
      <div>
        <button onClick={()=> props.remove(props.item.id)}>🗑</button>
        <button onClick={() => props.complete(props.item.id)}>✅</button>
      </div>
    </div>
  );
}

export default Item;
