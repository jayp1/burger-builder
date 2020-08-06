import React from 'react';
import './Order.css';

const order = props => {
    const ingredients = [];

    for (let ingredName in props.ingredients) {
        ingredients.push(
            {
                name: ingredName,
                amount: props.ingredients[ingredName]
            }
        );
    }
    const ingredOutput = ingredients.map(ig => {
        return <span key={ig.name} 
            style={{
                    textTransform:'capitalize',
                    display:'inline-block',
                    margin:'0 8px',
                    padding: '5px'
                }}>
            {ig.name} ({ig.amount})
            </span>;
    });

    return (
        <div className="Order">
            <h3>ORDER #{props.orderNumber}</h3>
            <p>Ingredients: {ingredOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
        </div>

    );

};

export default order;