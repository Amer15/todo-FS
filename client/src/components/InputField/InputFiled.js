import React from 'react';
import classes from  './InputField.module.css'

const InputField = props => {
    return (
        <div className={classes.inputContainer}>
            <input
            type='text'
            name='todo'
            placeholder='add a todo...'
            value={props.todo}
            onChange={(e) => props.onChangeHandler(e)}
            autoComplete='off'/>

            <button onClick={props.addTodoHandler}>Add Todo</button>
        </div>
    )
}

export default InputField;