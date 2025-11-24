import React from 'react';
import { Link } from 'react-router';

function Cards({name, description, onDelete, location}: {name:string, description:string, onDelete:Function, location:string}) {
    return (
        <Link to={location}>
        <div className='h-30 w-40 border-3 border-primary'>
            <h3>{name}</h3>
            <span>{description}</span>
            <button onClick={ onDelete}>Delete</button>

        </div>
        </Link>
    );
}

export default Cards;