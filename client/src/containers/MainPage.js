import React, { Component } from 'react';
import InputField from '../components/InputField/InputFiled';
import Todo from '../components/Todo/Todo';
import classes from './MainPage.module.css';
import axios from 'axios';
import Modal from 'react-modal';

//Binding modal to the app by Id
Modal.setAppElement('#root');


class MainPage extends Component {
    constructor() {
        super();

        this.state = {
            todo: '',
            todos: [],
            loading: false,
            showModal: false,
            todoId: null
        }
    }

    //GET TODOS 
    componentDidMount() {
        // console.log('COMPONENT DID Update TRIGGERED')
        this.setState({
            loading: true
        });

        axios.get('/')
            .then(response => {
                this.setState({
                    todos: response.data.todos,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    loading: false
                });
            })
    }

    onInputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //Add Todo
    onTodoAddHandler = () => {
        const newTodos = [...this.state.todos];

        const todoObj = {
            todo: this.state.todo
        }

        if(this.state.todo.length < 2){
            return
        }

        axios.post('/add-todo', todoObj)
            .then(response => {
                // console.log(response);
                newTodos.push(response.data.todo);
                this.setState({
                    todo: '',
                    todos: newTodos
                });
            })
            .catch(error => {
                console.log(error)
            });

    }

    //Delete Todo
    onDeleteTodoHandler = (id) => {
        this.setState({
            loading: true
        });
        axios.delete(`/delete-todo/${id}`)
            .then(response => {
                console.log(response);
                const todos = [...this.state.todos];
                const filteredTodos = todos.filter(todo => todo._id !== id);
                this.setState({
                    loading: false,
                    todos: filteredTodos
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                });
            })
    }

    //Edit Todo - Open Modal 
    onEditTodoHandler = (id) => {
        const todos = [...this.state.todos];
        const filteredTodo = todos.filter(todo => todo._id === id)[0];
        const { todo } = filteredTodo;
        this.setState({
            showModal: true,
            todo: todo,
            todoId: id
        });
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false,
            todo: '',
            todoId: null
        });
    }

    modalInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    //UPDATE Todo
    onUpdateTodoHandler = () => {  
      const todos = [...this.state.todos];
      let filteredTodo = todos.filter(todo => todo._id === this.state.todoId)[0];

      filteredTodo.todo = this.state.todo;
      
      axios.put(`/update-todo/${filteredTodo._id}`, filteredTodo)
      .then(response => {
         console.log(response);
      })
      .catch(error => {
          console.log(error);
      });

      this.closeModalHandler();

    }


    //Change todo state when clicked on Mark complete button
    onMarkCompleteHandler = (todoId) => {
        axios.put(`/update-todo-state/${todoId}`)
        .then(response => {
            const Newtodos = [...this.state.todos];
            Newtodos.forEach( todo => {
                if(todo._id === todoId){
                    todo.isCompleted = response.data.todo.isCompleted
                }
            });

            this.setState({
                todos: Newtodos
            });
          
        })
        .catch(error => {
            console.log(error)
        });

    }
  

    render() {
        //Modal overlay style
        const overlayStyle = {
            overlay:{
             background: '#2F363F'
            }
        }

        let todos;
        if (this.state.todos.length === 0) {
            todos = <h4>No todos to show. Please add todos..</h4>
        }
        else {
            todos = this.state.todos.map((todo) => {
                return < Todo
                    key={todo._id}
                    todoId = {todo._id}
                    isCompleted={todo.isCompleted}
                    markCompleteHandler = {this.onMarkCompleteHandler}
                    todoValue={todo.todo}
                    deleteTodo={() => this.onDeleteTodoHandler(todo._id)}
                    editTodo={() => this.onEditTodoHandler(todo._id)} />
            })
        }

        return (
            <div className={classes.mainContainer}>
                <div className={classes.inputContainer}>
                    <h1>TODO LIST</h1>
                    <InputField
                        todo={this.state.todo}
                        onChangeHandler={this.onInputChangeHandler}
                        addTodoHandler={this.onTodoAddHandler} />
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModalHandler}
                    className={classes.Modal}
                    style={overlayStyle}>

                    <h2 className={classes.modalHeading}>Edit your todo</h2>
                    <form className={classes.modalForm}>
                       <input type='text' 
                       name='todo' 
                       value={this.state.todo}
                       onChange={e => this.modalInputChange(e)}/>
                    </form>
                    <div className={classes.btnGroup}>
                        <button className={classes.closeBtn} 
                        onClick={this.closeModalHandler}>Close</button>
                        <button className={classes.updateBtn}
                        onClick={this.onUpdateTodoHandler}>Update</button>
                    </div>
                </Modal>

                <div className={classes.todosContainer}>
                    {this.state.loading ? <p>Loading...</p> : todos}
                </div>
            </div>
        )
    }
}

export default MainPage;