// bring in http module from node
const http = require("http");
//bring in the controller
const Todo = require("./controller");
// bring in utilities
const { getReqData } = require("./utils");

// set the port the server should to run on
const PORT = process.env.PORT || 5000;

// create the server
const server = http.createServer(async (req, res) => {
    // set the request route
    switch(true) {
        case (req.url === '/api' && req.method === "GET"):
            // response headers
            res.writeHead(200, {"Content-Type": "application/json"});
            // set the response
            res.write("Sup, i'm a Node.js API");
            // end the response
            res.end();
            break;

        // list todos
        // api/todos     :  GET
        case (req.url === '/api/todos' && req.method === "GET"):
            const todos = await new Todo().listTodos();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(todos));
            break;

        // get single _todo by id
        // api/todos/:id    : GET
        case(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET"):
            try {
                const id = req.url.split("/")[3];
                const todo = await new Todo().getTodo(id);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(todo));
            } catch (error) {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: error}));
            }
            break;

        // create _todo
        // api/todos  : POST
        case(req.url === "/api/todos" && req.method === "POST"):
            // get the data from the request using the utility function
            let todoData = await getReqData(req);
            // create the _todo to send back - mocking, this will not actually persist a change to the data array
            let createdTodo = await new Todo().createTodo(JSON.parse(todoData));
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(createdTodo));
            break;


        // update _todo
        // api/todos/id      : PATCH
        case(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH"):
            try {
                let id = req.url.split("/")[3];

                // mock update, a new instance of the _todo is created in the controller function with one static change applied
                // and the "updated" _todo sent back. Normally you would send an object containing the changes to specific
                // properties. No changes are persisted in the data array

                let updatedTodo = await new Todo().updateTodo(id);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(updatedTodo));
            } catch (error){
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: error}));
            }
            break;
        // delete _todo by id
        // api/todos/:id      :    DELETE
        case(req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE"):
            try {
                let id = req.url.split("/")[3];

                // mock deletion in the controller method, simply confirms the _todo has been and sends back a message
                // does not make any actual change to the data array
                let message = await new Todo().deleteTodo(id);
                res.writeHead(200, {"Content-Type": "application/json"})
                res.end(JSON.stringify({ message }));
            } catch (error){
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: error}));
            }
            break;
        default:
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: "Route not found"}));
    }
});

// set the server to listen on the set PORT constant
server.listen(PORT, () => {
    // back ticks to enable variable
    console.log(`server started on port: ${PORT}`);
})

// node app.js
// to run the app
