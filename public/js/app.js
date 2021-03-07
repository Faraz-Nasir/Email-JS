let submit=document.querySelector("#submit-email-content")
let reset=document.querySelector("#reset")
console.log("sadasoduvaskdk")

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector("form").submit()
    console.log("Buttondsf")
})

reset.addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelector("textarea").value=""
    document.querySelector("input").value=""
})