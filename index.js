const conatiner_card = document.getElementById("card_container")
const timer = document.getElementById("timerValue");
const findValue = document.getElementById("findValue");
const Btn_Start = document.getElementById("start");
const Btn_PauseResume = document.getElementById("PauseResume");
let timerInterval;
let PauseState = false;
let noTouchState=false;
let timerValue = 0;
Btn_Start.addEventListener("click", function(){
    clearInterval(timerInterval);
    conatiner_card.innerHTML="";
    timerValue=0;
    SuccessCount=0;
    findValue.innerHTML=0;
    CardStart()
    timerInterval = setInterval(() => {
        timerValue+=1;
        timer.innerText=timerValue;
    }, 1000);
})
Btn_PauseResume.addEventListener("click", function() {
    console.log(Btn_PauseResume.innerText);
    if(Btn_PauseResume.innerText==="Pause")
    {
        clearInterval(timerInterval);
        noTouchState=true;
        Btn_PauseResume.innerText="Resume";
    }
    else
    {
        timerInterval = setInterval(() => {
            timerValue+=1;
            timer.innerText=timerValue;
        }, 1000);
        noTouchState=false;
        Btn_PauseResume.innerText="Pause";
    }
})
function CardStart()
{
    let CardList = [];
    let FlippingCard=null;
    let SuccessCount = 0;
    for(let i = 0; i < 25; i++)
    {
        let cardNumber = Math.floor((Math.random()*54)+1);
        let cardShape = 0;
        if(1<=cardNumber && cardNumber<=13){
            cardShape="s";
        }
        else if(14<=cardNumber && cardNumber<=26){
            cardShape="d";
            cardNumber-=13;
        }
        else if(27<=cardNumber && cardNumber<=39){
            cardShape="h";
            cardNumber-=26;
        }
        else if(40<=cardNumber && cardNumber<=52){
            cardShape="c";
            cardNumber-=39;
        }
        else if(cardNumber===53){
            cardShape="b";
            cardNumber="j";
        }
        else{
            cardShape="r";
            cardNumber="j";
        }
        CardList.push(`${cardShape}${cardNumber}`);
        CardList.push(`${cardShape}${cardNumber}`);
    }

    for(let i=0;i<500;i++)
    {
        let randomNumber1 = Math.floor(Math.random()*50);
        let randomNumber2 = Math.floor(Math.random()*50);
        [CardList[randomNumber1], CardList[randomNumber2]] = [CardList[randomNumber2], CardList[randomNumber1]];
    }
    for(let i=0;i<50;i++)
    {
        let card = document.createElement("div");
        let front_card = document.createElement("div");
        let front_card_img = document.createElement("img");
        let back_card = document.createElement("div");
        let back_card_img = document.createElement("img");

        card.classList.add("card");
        front_card.classList.add("card-face");
        front_card.classList.add("card-front");
        back_card.classList.add("card-face");
        back_card.classList.add("card-back");
        front_card_img.src=`./images/${CardList[i]}.png`;
        back_card_img.src="./images/bb.png";
        front_card_img.alt=`${CardList[i]}`;
        back_card_img.alt = "Back Card";

        conatiner_card.appendChild(card);
        card.appendChild(front_card);
        card.appendChild(back_card);
        front_card.appendChild(front_card_img);
        back_card.appendChild(back_card_img);

        card.dataset.cardInfo = CardList[i];
        card.dataset.flip=0;

        card.addEventListener("click", function() {
            if(noTouchState===false)
            {
                if(card.dataset.flip==="0")
                {
                    card.classList.toggle("flip")
                    if(FlippingCard===card)
                    {
                        FlippingCard=null;
                    }
                    else if(FlippingCard===null)
                    {
                        FlippingCard=card;
                    }
                    else if(FlippingCard.dataset.cardInfo!==card.dataset.cardInfo)
                    {
                        noTouchState=true;
                        setTimeout(function() {
                            FlippingCard.classList.remove("flip");
                            card.classList.remove("flip");
                            FlippingCard=null;
                            noTouchState=false;
                        }, 1000)
                    }
                    else if(FlippingCard.dataset.cardInfo===card.dataset.cardInfo)
                    {
                        noTouchState=true;
                        FlippingCard.dataset.flip=SuccessCount+1;
                        card.dataset.flip=SuccessCount+1;
                        FlippingCard=null;
                        SuccessCount+=1;
                        if(SuccessCount===25)
                        {
                            clearInterval(timerInterval);
                        }
                        findValue.innerText=SuccessCount;
                        noTouchState=false;
                    }
                }
            }
        })
    }
}