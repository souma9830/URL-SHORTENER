       else{
            const links=await loadlink();
            const sortcode=req.url.slice(1);
            if(links[sortcode]){
                res.writeHead(302, { "Location": links[sortcode] });
                return res.end();
            }
        }