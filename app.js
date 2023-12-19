let BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropDowns = document.querySelectorAll("select");
let btn = document.querySelector("button")
let fromCurr = document.querySelector(".from select")
let toCurry = document.querySelector(".to select");
let msg = document.querySelector(".msg")

window.addEventListener("load",()=>{
    updateExchangeRate()
})


for(select of dropDowns){
    for(currCode in countryList){

      
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode
        if(select.name==="form" && currCode==="USD"){
            newOption.selected ="seleted"
        }else if(select.name==="To" && currCode==="INR"){
            newOption.selected ="seleted"
        }
        select.append(newOption)
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)

    })
}


const updateFlag=(element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let srcLink = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img=  element.parentElement.querySelector("img")
  img.src=srcLink;
   

}
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate()
   
})


const updateExchangeRate= async()=>{
    let input = document.querySelector("input");
    let amtValue=input.value;
    if(amtValue ==="" || amtValue<1){
        amtValue=1
        input.value="1"
    }
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurry.value.toLowerCase()}.json`;
let res = await fetch(URL)
let data = await res.json()
let rate = data[toCurry.value.toLowerCase()];
let finalRate = amtValue * rate;
msg.innerText=`${amtValue} ${fromCurr.value} =${finalRate} ${toCurry.value}`
console.log(rate)
}

// for(currCode in countryList){
//  console.log(currCode,countryList[currCode])  
// }
// selet.innerText =countryList
// console.log(selet)