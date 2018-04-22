
 let seconds =0,minutes = 0,interval;

let moves = document.querySelector('.moves');
let cardsDeck = document.querySelector('.deck'); 
let cards = document.querySelectorAll('.card'); 
let cardsArray = [...cards];
const repeatButton = document.querySelector('.restart');
let cardList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
			    " fa fa-bolt", "fa fa-cube", "fa fa-leaf",
			    "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond",
			    "fa fa-paper-plane-o", "fa fa-anchor", " fa fa-bolt", "fa fa-cube",
			    "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
let matchedCards = [];
let openedCards =[];
let li = document.getElementsByTagName('li');
let movesCount = 0;
let targetClass = "";
let starsElem = document.querySelector('.stars');
let starsNo = 3;


console.log('strs Element is: ' + starsElem.parentElement.innerHTML);
shuffle(cardList);
for (let i = 0; i<cardsArray.length;i++){
	cardsArray[i].innerHTML = '<i></i>';
	cardsArray[i].firstElementChild.className = cardList[i];
	};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    console.log("current index is: " + currentIndex)
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function displayCard(){
	event.target.classList.add('open');
};


function matchCard(){
	let openedCardsNo = openedCards.length;
	let matchedCardsNo = matchedCards.length;
	let targetList = event.target;
	if(targetList.nodeName === 'LI'){
		if (openedCards.length === 0 && targetList.className === 'card open'){
			openedCards[0] = targetList;
		}else if(openedCards.length === 1 && targetList.className === 'card open' && targetList!== openedCards[0]){
			openedCards[1] = targetList;
		}
			
		if (openedCards.length === 2){
			for (const openCard of openedCards){
				let openedCard1 = openedCards[0];
				let openedCard2 = openedCards[1];
				console.log('opened cards1 is: ' + openedCard1.innerHTML);
				console.log('opened cards2 is: ' + openedCard2.innerHTML);
	
				if(openedCard1.firstElementChild.className === openedCard2.firstElementChild.className){
					openedCard1.className += ' match';
					openedCard2.className += ' match';
					matchedCards.length = matchedCards.length + 2;
					openedCards.length = 0;
					console.log('matched cards = ' + matchedCards.length);
					if (matchedCards.length === 16){
						setTimeout(function(){
					 		gameWin();
						 }, 1500);
						
					} 
				}else{
					 setTimeout(function(){
					 openedCard1.className = 'card';
					 openedCard2.className = 'card';
					 }, 1000);
					 openedCard1.className = 'card not-matched';
				 	 openedCard2.className = 'card not-matched';
					
					 openedCards.length = 0;
				}
			}
		}
		countMoves();
	}
}

function countMoves (){
	movesCount++;
	moves.textContent = (movesCount);
}

function gameWin(){
	let gameFinish = document.querySelector('.no-win');
	let container = document.querySelector('.container');
	let finalMoves = document.querySelector('#countNumber');
	let finalRating = document.querySelector('#finalStars');
	let restartButton = document.querySelector('#restartButton');

	gameFinish.classList.toggle('no-win');
	gameFinish.classList.toggle('win');
	container.style.display = 'none';
	finalMoves.textContent = (movesCount);
	finalRating.textContent = (starsNo);

	restartButton.addEventListener('click',function(){
		window.location.reload();
	});

}

function rating(){
	if (movesCount >= 26 && movesCount < 34){
		document.getElementById('star3').style.color = 'black';
		starsNo = 2;
	}else if (movesCount >= 34 && movesCount <= 40){
		document.getElementById('star2').style.color = 'black';
		starsNo = 1;
	}
}
repeatButton.addEventListener('click', function(){
	shuffle(cardList);
	for (let i = 0; i<cardsArray.length;i++){
	cardsArray[i].classList.remove('match','open','not-matched');
	cardsArray[i].innerHTML = '<i></i>';
	cardsArray[i].firstElementChild.className = cardList[i];
	
	}
	openedCards.length = 0;
	movesCount = 0;
	
});

cardsDeck.addEventListener('click', function(event){
	displayCard();
	matchCard(event);
	rating();
});


function delay(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
};