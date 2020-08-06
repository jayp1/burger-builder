import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Bacon", type: "bacon" },
    { label: "Salad", type: "salad" },
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl =>
                <BuildControl 
                    key={ctrl.label}
                    label={ctrl.label}
                    add={() => props.addIngredient(ctrl.type)}
                    remove={()=>props.removeIngredient(ctrl.type)}
                    disabled={props.disabledInfo[ctrl.type]} />
            )}
            <button className={classes.OrderButton}
                disabled={!props.orderStatus}
                onClick={props.orderNow}>{props.isLoggedIn ?
                    "ORDER NOW" : "LOGIN TO ORDER"}</button>
        </div>
    );
}

export default BuildControls;