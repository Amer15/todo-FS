const Todo = require('../model/todo.model');

exports.getTodos = (__, res) => {
  Todo.find({}).exec((err, todos) => {
      if(err) res.status(400).json({
          error: 'something went wrong'
      });

      return res.json({
          no_of_todos: todos.length,
          todos
      });
  })
}

exports.addTodo = (req, res) => {
    const { todo } = req.body;

    if(todo === '' || todo.length < 2){
        return res.status(400).json({
            error: 'todo should not be empty or less than 2 characters'
        });
    }

    const todoInstance = new Todo();
    todoInstance.todo = todo;

    todoInstance.save((err, todo) => {
        if(err) res.status(400).json({
            error: 'something went wrong'
        });
  
        return res.json({
           message: 'todo added successfully',
            todo
        });
    })
}

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;
    console.log(todo);


    Todo.findByIdAndUpdate({ _id: id }, { todo: todo}).exec((err, todo) => {
        if(err) res.status(400).json({
            error: 'something went wrong'
        });
  
        return res.json({
            message: 'todo updated successfully',
            todo
        });
    })
}

exports.deleteTodo = (req, res) => {
    const { id } = req.params;

    Todo.findByIdAndDelete({ _id: id}).exec((err, result) => {
        if(err) res.status(400).json({
            error: 'something went wrong'
        });
  
        return res.json({
            message: 'todo deleted successfully',
            result
        });
    })
}


exports.updateTodoState = (req, res) => {
    const { id } = req.params;

    Todo.findById({ _id: id}).exec((err, todo) => {
        if(err) return res.status(400).json({
            error: 'Something went wrong.'
        });

        if(!todo) return res.status(400).json({
            error: 'todo does not exist'
        });

        if(todo){
            todo.isCompleted = !todo.isCompleted

            todo.save((err, todo) => {
                if(err) return res.status(400).json({
                    error: 'Something went wrong.'
                });

                return res.json({
                    message: 'todo state updated successfully',
                    todo
                });
            });
        }
    });

}