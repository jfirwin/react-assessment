import React from 'react';
import { Link } from 'react-router-dom';

function Item(props) {
  return (
    <Link to={`/details/${props.item.id}`}>
      <div style={{display: 'flex', align: 'center', justifyContent: 'center'}}>
        <div>
          {props.item.title}
        </div>
        <div>
          <button onClick={()=> props.remove(props.item.id)}>🗑</button>
          <button onClick={() => props.complete(props.item.id)}>✅</button>
        </div>
      </div>
    </Link>
  );
}

export default Item;
