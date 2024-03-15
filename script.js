const API_KEY='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';

const submitButton=document.querySelector("#submit")
const outputElement=document.querySelector("#output")
const inputElement=document.querySelector('input')
const historyElement=document.querySelector('.history')
const buttonElement=document.querySelector('button')

function changeInput(value){
    const inoutElement=document.querySelector('input')
    inputElement.value=value
}

async function getmessage(){
    console.log("clicked");
    const options={
        method:'POST',
        headers:{
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens:1000
        })
    }
    try{
        const response =await fetch('https://api.openai.com/v1/chat/completions',options);
        const data= await response.json()
        console.log(data)
        outputElement.textContent=data.choices[0].message.content
        if(data.choices[0].message.content && inputElement.value){
            const pElement=document.createElement('p')
            pElement.textContent=inputElement.value
            pElement.addEventListener('click',()=>changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch (error){
        console.error(error)
    }
}

submitButton.addEventListener('click',getmessage)

function clearInput(){
    inputElement.value= ''
}

buttonElement.addEventListener('click',clearInput)