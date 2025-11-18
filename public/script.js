
const fetchShortenUrl=async()=>{
    const response= await fetch("/links");
    const links= await response.json();
    console.log("links: ",links);
    const list=document.getElementById("shorten-url");
    list.innerHTML="";
    for(const [shortcode,url] of Object.entries(links)){
        const li=document.createElement("li");
        li.innerHTML=`<a href="/${shortcode}" target="_blank">${window.location.origin}/${shortcode}</a> - ${url}`;
        list.appendChild(li);
    }
}


document.getElementById('shorten-form').addEventListener('submit', async(event)=>{
    event.preventDefault();
    const formdata=new FormData(event.target);
    const url=formdata.get("url");
    const shortcode=formdata.get("shortcode");
    console.log(url);
    console.log(shortcode);   

try {
    const response=await fetch("/shorten",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({url,shortcode})
    });
    if(response.ok){
        fetchShortenUrl();
        alert("Form Submitted Succesfully");
        event.target.reset();
    }
    else{
      const errormsg=await response.text();
      alert(errormsg)  
    }

} catch (error) {
    console.log(error);
}
})


fetchShortenUrl();