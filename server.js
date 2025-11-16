const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const PORT = 3000;

const server = http.createServer(async (req, res) => {

    if (req.method === "GET") {
        if (req.url === "/") {
            try {
                const data = await fs.readFile(path.join("public", "index.html"));
                res.writeHead(200, { "Content-Type": "text/html" });
                return res.end(data);
            } catch (error) {
                res.writeHead(404, { "Content-Type": "text/html" });
                return res.end("404 Not Found");
            }
        }

      
        if (req.url === "/style.css") {
            try {
                const data = await fs.readFile(path.join("public", "style.css"));
                res.writeHead(200, { "Content-Type": "text/css" });
                return res.end(data);
            } catch (error) {
                res.writeHead(404, { "Content-Type": "text/html" });
                return res.end("404 Not Found");
            }
        }

    
        if (req.url === "/script.js") {
            try {
                const data = await fs.readFile(path.join("public", "script.js"));
                res.writeHead(200, { "Content-Type": "application/javascript" });
                return res.end(data);
            } catch (error) {
                res.writeHead(404, { "Content-Type": "text/html" });
                return res.end("404 Not Found");
            }
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
