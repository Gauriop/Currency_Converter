const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){
    for(let code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from"&& code==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to"&& code==="INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let code =element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;

}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let atval=amount.value;
    console.log(atval);
    if(atval===""||atval<1){
        atval=1;
        amount.value="1";
    }
    
    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;   
    let response=await fetch(URL); 
    let data= await response.json();
    let rate=data(toCurr.value.tolower());
    let final=atval*rate;
    msg.innerText=`${atval}${fromCurr.value}${atval}${toCurr.value}`

});