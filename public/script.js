document.getElementById('shorten-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const formdata=new FormData(event.target);
    const url=formdata.get("url");
    const shortcode=formdata.get("shortcode");
    console.log(url);
    console.log(shortcode);
   
   
    
})