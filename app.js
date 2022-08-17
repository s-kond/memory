const startButton = document.querySelector('#btn-start');
const container = document.querySelector('.container');
const arrImages = [
    { img: 'images/anthony-delanoix-QAwciFlS1g4-unsplash.jpg', value: 1 },
    { img: 'images/anthony-delanoix-QAwciFlS1g4-unsplash.jpg', value: 1 },
    { img: 'images/claudio-schwarz-qlpjah8mSNs-unsplash.jpg', value: 2 },
    { img: 'images/claudio-schwarz-qlpjah8mSNs-unsplash.jpg', value: 2 },
    { img: 'images/david-kohler-VFRTXGw1VjU-unsplash.jpg', value: 3 },
    { img: 'images/david-kohler-VFRTXGw1VjU-unsplash.jpg', value: 3 },
    { img: 'images/derrick-sugden-xaf21mV7dYU-unsplash.jpg', value: 4 },
    { img: 'images/derrick-sugden-xaf21mV7dYU-unsplash.jpg', value: 4 }
];
let arrOpenCard = [];
let points = 0;
let count = 0;

startButton.addEventListener('click', start);

function start() {
    removeAllCards();
    createNewCards();
    mixCards();
    arrOpenCard.splice(0);
    points = 0;
    count = 0;
    applyTurnAroundToCard();
}

function removeAllCards() {
    while(container.lastChild) {
        container.removeChild(container.lastChild);
    }
}

function createNewCards(){
    for(let i=1; i<=8; i++){
        const card = document.createElement("div");
        card.classList.add(`card`);
        card.setAttribute('id', `card${i}`);
        container.appendChild(card);
    }
}

function mixCards() {
    const allCards = document.querySelectorAll('.card');
    let copyArrImages = [...arrImages];
    for (let card of allCards) {
        let rand = Math.floor(Math.random() * copyArrImages.length);
        card.innerHTML = `<img class="cardImg closed" src="${copyArrImages[rand].img}" value="${copyArrImages[rand].value}">`; //class= "cardImg"
        copyArrImages.splice(rand, 1);
        //console.log(copyArrImages);
    }
}


function applyTurnAroundToCard() {
    const allCards = document.querySelectorAll('.card');
    for (let card of allCards) {
        let cardImg = card.firstChild;
        card.addEventListener('click', function () {
            cardImg.classList.toggle('closed');
            arrOpenCard.push(card);
            clearCardArray();
            //console.log(arrOpenCard);
            //console.log(arrOpenCard.length);
            
        })
    }
}

async function clearCardArray() {
    if (arrOpenCard.length === 2) {
        const wait = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    for (let openCard of arrOpenCard) {
                        openCard.firstChild.classList.toggle('closed');
                        resolve('resolved');
                    }
                }, 1000);
            })
        }
        const waiting = await wait();
        compareCards();
        arrOpenCard.splice(0);
    } else if (arrOpenCard.length > 2) {
        for (let openCard of arrOpenCard) {
            openCard.firstChild.classList.toggle('closed');
        }
        arrOpenCard.splice(0);
    }
}

function compareCards() {
    const card1 = arrOpenCard[0];
    const card2 = arrOpenCard[1];
    count++;
    
    if(card1.firstChild.getAttribute('value') === card2.firstChild.getAttribute('value') && card1.id != card2.id){
        points++;
        console.log(`You got ${points} point(s)!`);
        card1.classList.toggle('closed');
        card2.classList.toggle('closed');
    };
    if(points === 4){
        container.innerHTML = `You did it! And you needed ${count} moves.`
    }
}
