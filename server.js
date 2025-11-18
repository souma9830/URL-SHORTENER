const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const crypto=require("crypto");
const PORT = 3000;
const DATA_FILE=path.join("data","link.json")
const loadlink= async()=>{
    try {
        const data= await fs.readFile(DATA_FILE,"utf-8");
        return JSON.parse(data)
    } catch (error) {
        if(error.code === "ENOENT"){
            await fs.writeFile(DATA_FILE, JSON.stringify({}));
            return {};
        }
        throw error;
    }
}
const saveLink=async(link)=>{
    await fs.writeFile(DATA_FILE,JSON.stringify(link))
}

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
    if(req.method=== "POST" && req.url==="/shorten"){

        const link= await loadlink();

        let data="";
        req.on("data",(chunk)=>{
            data+=chunk;
        })
        req.on("end",async()=>{
            console.log(data);
            const {url, shortcode} = JSON.parse(data);
            if(!url){
                res.writeHead(400,{"Content-Type": "text/plain"});
                return res.end("URL is Required");
            }
            const finalshortcode= shortcode || crypto.randomBytes(4).toString("hex");
            if(link[finalshortcode]){
                res.writeHead(400,{"Content-Type": "text/plain"});
                return res.end("Short Code Already Exist Please Choose Another ");
            }
            link[finalshortcode]=url;
            await saveLink(link);
            res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify({success:true, shortcode: finalshortcode}))
        })
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
