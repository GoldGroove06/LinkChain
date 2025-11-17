import React from 'react';

function Cards({name, description}:{name:string, description:string}) {
    return (
        <div className='h-30 w-40 border-3 border-primary'>
            <h3>{name}</h3>
            <span>{description}</span>
        </div>
    );
}

export default Cards;