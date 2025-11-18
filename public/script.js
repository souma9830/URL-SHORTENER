document.getElementById('shorten-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const formdata=new FormData(event.target);
    const url=formdata.get("url");
    const shortcode=formdata.get("shortcode");
    console.log(url);
    console.log(shortcode);   
})
try {
    const response=await fetch("/shorten",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({url,shortcode})
    });
    if(response.ok){
        alert("Form Submitted Succesfully");
    }
    else{
      const errormsg=await response.text();
      alert(errormsg)  
    }

} catch (error) {
    console.log(error);
    
}