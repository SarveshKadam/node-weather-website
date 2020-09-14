// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })



const weatherform = document.querySelector('form')
const search  = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageone.textContent = "Loading...."
    messagetwo.textContent= ""

    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        console.log(data)
        if(data.error){
            console.log("Error has happened");
            messageone.textContent = JSON.stringify(data.error)
        }else{
        messageone.textContent = data.location
        messagetwo.textContent= data.forecast
        }
    })
})
    
})