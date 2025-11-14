const http=require("http");
const fs=require("fs").promises;
const path=require("path");
const PORT=3000;
const server=http.createServer(async (req,res)=>{   
    if(req.method==="GET"){
        if(req.url==='/'){
            try {
                const data=await fs.readFile(path.join("public","index.html"))
                res.writeHead(200,{'Content-Type':"text/html"})
                res.end(data);

            } catch (error) {
                res.writeHead(404,{'Content-Type':"text/html"})
                res.end("404 Not Found")
            }
        }
        else  if(req.method==="GET"){
            if(req.url==="/style.css")
            try {
                const data=await fs.readFile(path.join("public","style.css"))
                res.writeHead(200,{'Content-Type':"text/css"})
                res.end(data);

            } catch (error) {
                res.writeHead(404,{'Content-Type':"text/html"})
                res.end("404 Not Found")
            }
        }
    }
})
server.listen(PORT,()=>{
    console.log(`You are in Port ${PORT}`);
    
})