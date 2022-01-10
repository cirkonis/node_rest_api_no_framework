// bring in http module from node
const http = require("http");

// set the port the server should to run on
const PORT = process.env.PORT || 5000;

// create the server
const server = http.createServer(async (req, res) => {
    // set the request route
    if (req.url === "/api" && req.method === "GET") {
        // response headers
        res.writeHead(200, {"Content-Type": "application/json"});
        // set the response
        res.write("Sup, i'm an Node.js API");
        // end the response
        res.end();
    }

    // if no route present
    else{
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
