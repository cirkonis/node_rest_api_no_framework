// bring in temp data
const data = require("./data");

class Controller {

    // getting all _todos
    async listTodos(){
        return new Promise((resolve, _) => resolve(data));
    }

    // getting one _todo by id
    async getTodo(id) {
        return new Promise(((resolve, reject) => {
            // get the _todo, data.find is the function we would replace with model function that retrieves the data from a DB
            let todo = data.find((todo) => todo.id === parseInt(id));
            if(todo){
                resolve(todo);
            } else {
                reject(`Todo with id ${id} not found`);
            }
        }));
    };

    // create _todo
    async createTodo(todo) {
        return new Promise((resolve, _) => {
            // create a _todo using data sent and assigning a random id
            let newTodo = {
                id: Math.floor(4 + Math.random() * 10),
                    ...todo,
            }
            resolve(newTodo);
        });
    }

    // update _todo
    async updateTodo(id){
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));

            // reject if _todo not found
            if(!todo) {
                reject(`No todo with id ${id} found`);
            }

            todo["status"] = "updated"

            resolve(todo);
        });
    }

    // delete _todo
    async deleteTodo(id){
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));
            if(!todo) {
                reject(`Todo not found`);
            }
            resolve(`Todo "deleted"`);
        });
    }
}
module.exports = Controller;