import React from 'react';

import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import classes from './Burger.module.css';

const Burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map( (_, i) =>
            <BurgerIngredient key={ingKey +i} type={ingKey}/>
        );
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );

}
export default Burger;
