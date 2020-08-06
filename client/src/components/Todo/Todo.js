import React from 'react';
import classes from './Todo.module.css';


const Todo = (props) => {
    return (
        <div className={
           props.isCompleted  ? classes.todoContainerChecked : classes.todoContainer
        }>
            <div className={classes.todoBox}>
                <p className={
                  props.isCompleted  ? classes.check : classes.uncheck
                }>{props.todoValue}</p>
            </div>

            <button 
            className={classes.checkBtn}
            onClick={() => props.markCompleteHandler(props.todoId)}>
                <i className="fas fa-check-circle"></i>
            </button>    
            <button 
            className={classes.editBtn}
            onClick={props.editTodo}>
                 <i className="fas fa-edit"></i>
            </button>  
            <button 
            className={classes.deleteBtn}
            onClick={props.deleteTodo}>
                <i className="fas fa-trash-alt"></i>
            </button>    
           
        </div>
    )
}


export default Todo;