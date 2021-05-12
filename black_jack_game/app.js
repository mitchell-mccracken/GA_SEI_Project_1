//print function used in place of console.log
const print = (input) => { console.log(input) };
console.log('js file connected')

// ====================  variables to create deck of cards array
const deckOfCards = [];
const usedDeckOfCards = [];
const cardNumberArray = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
const cardSuitArray = [ 'hearts' , 'diamonds' , 'spades' , 'clubs'];
let dealerHand = [];
let dealerPoints = 0;
let playerHand = [];
let playerPoints = 0;
let playerDecisionMade = 'not made';
let playerPot = 500;
let dealerPot = 0;
let playerBet = 0;
let playerBust = false;
let dealerBust = false;
let choice = '';

// =============== populate the pots
const potUpdate = () => {
    document.querySelector('#dealer-winnings').innerText = `Dealer winnings: ${dealerPot}`;
    document.querySelector('#player-winnings').innerText = `Player winnings: ${playerPot}`;
};
potUpdate();


// ===========================================================
// ==================== adding event listeners ===============
document.querySelector('#hit-btn').addEventListener('click' , () => { 
    let decision = 'hit';
    // return decision;
    playerDecision(decision);
});

document.querySelector('#stay-btn').addEventListener('click' , () => { 
    let decision = 'stay';
    // return decision;
    playerDecision(decision);
});




// ==================== function to determine point value
const pointValue = (faceValue) => {
    if (faceValue === 'ace') {
        return 11;
    } else if (faceValue === cardNumberArray[9] || faceValue === cardNumberArray[10] || faceValue === cardNumberArray[11] ) {
        return 10;
    } else {
        return faceValue;
    }
}

// =================== function to determine color
const cardColor = (suitValue) => {
    if (suitValue === 'hearts' || suitValue === 'diamonds') {
        return 'red';
    } else {
        return 'black';
    }
}

// ========== create class to generate card object
class CardGeneration {
    constructor (faceValue , suitValue) {
        this.faceValue = faceValue;
        this.suitValue = suitValue;
        this.pointValue = pointValue(faceValue);
        this.color = cardColor(suitValue);
    }
}

// =========== generate deck of cards
for (number of cardNumberArray) {
    let num = number;
    for (suit of cardSuitArray) {
        let cardSuit = suit;
        const card = new CardGeneration( num , cardSuit , 'nocolor');
        deckOfCards.push(card);
    }
}

// =============== function to reset the game
const reset = () => {
    console.log('game reset');
    playerHand = [];
    dealerHand = [];
}

// ============= next round function, used to reset at the beginning of each hand
const nextRound = () => {
    console.log('next round');
    let cardList = document.querySelectorAll('.card');
    for (i=0 ; i<cardList.length ; i++){
        cardList[i].remove();
    }
    dealerHand = [];
    dealerPoints = 0;
    playerHand = [];
    playerPoints = 0;
    playerDecisionMade = 'not made';
    playerBet = 0;
    playerBust = false;
    dealerBust = false;
}

// ================ random number generator based on length of deckOfCards array
const randNum = () => {
    let randomNumber =  Math.floor( Math.random() * deckOfCards.length );
    return randomNumber;
}

// ================= generate card
const generateCardValue = (forWho) => {
    let index = randNum();
    card = deckOfCards[index];
    forWho.push(card);
    usedDeckOfCards.push(card);
    deckOfCards.splice(index , 1);
    //this is for generating the card in the UI, will need to add if statement
    if (forWho === dealerHand) {
        generateCard('#dealer-hand' , card );
    } else if (forWho === playerHand) {
        generateCard('#player-hand' , card);
    }
    
}

// ================ calculate dealer score
const calcDealerScore = () => {
    dealerPoints = 0;                   // I don't think this is needed
    //check if it is the first two cards for the dealer, if so only display one of them
    if (dealerHand.length === 2 && playerDecisionMade === 'not made') {
        dealerPoints = dealerHand[1].pointValue;
        console.log(`dealer card : ${dealerHand[1].faceValue} of ${dealerHand[1].suitValue}`);
        console.log(`dealer points: ${dealerPoints}`);
        document.querySelector('#dealer-score').innerText = `Count: ${dealerPoints}`;
    } else{
        for (i=0 ; i<dealerHand.length ; i++) {
            dealerPoints += dealerHand[i].pointValue;
            console.log(`dealer card : ${dealerHand[i].faceValue} of ${dealerHand[i].suitValue}`);
        }
        console.log(`dealer points: ${dealerPoints}`);
        document.querySelector('#dealer-score').innerText = `Count: ${dealerPoints}`;
        console.log('dealer points should update line 142');
    }
}

// ================ calculate user score
const calcPlayerScore = () => {
    playerPoints = 0;               //maybe not needed
    for (i=0 ; i<playerHand.length ; i++) {
        playerPoints += playerHand[i].pointValue;
        console.log(`player card : ${playerHand[i].faceValue} of ${playerHand[i].suitValue}`);
    }
    console.log(`player points: ${playerPoints}`);
    document.querySelector('#player-score').innerText = `Count: ${playerPoints}`;
}
// ================================================================
// ================= check score, main game loop ==================
// ================================================================
const checkScore = () => {
    playerPoints = 0;               //have to reset everytime I count because this is set as a global variable
    dealerPoints = 0;               //have to reset everytime I count because this is set as a global variable
    console.log('========= check score ===========')
    calcDealerScore();
    console.log(' ------------------');
    calcPlayerScore();

    // check if dealer or player is > 21 and has an ace
    checkIfAceInHand();         //only checks if score is >21
    checkForBust();
    if (playerBust || dealerBust) {
        return
    }
    if (playerDecisionMade === 'not made'){
        setTimeout(playerDecision , 1000);
    } else if (playerDecisionMade === 'made') {       // I should never get to this loop if user busts
        setTimeout( dealerDecisionModel , 1000);
    }
}

// ============== player decision
const playerDecision = (decision) => {
    // let decision = prompt('would you like to hit or stay line 160' , 'stay');
    // setTimeout( () => {
    //     let decision = prompt('would you like to hit or stay line 166' , 'stay');
    // } , 5000);
    let playerDecision = decision;
    console.log(decision);
    console.log('******************')
    if (playerDecision === 'hit') {
        generateCardValue(playerHand);
        checkScore();
    }
    else if (playerDecision === 'stay') {
        playerDecisionMade = 'made';
        checkScore();
    } 
}

// =========== the decision model for dealer getting dealer more cards 
const dealerDecisionModel = () => {
    if (playerDecisionMade === 'made'){      
        if (playerPoints === dealerPoints) {
            alert ('tie, no winners line 202');
            userChoice();
            return
        }
        if (dealerPoints < playerPoints) {
            console.log('generating card for dealer');
            generateCardValue(dealerHand);
            checkScore();
        } 
        else if (dealerPoints > playerPoints) {
            console.log('dealer wins, score greater than player score');
            checkForAWin();
        }
    }
}

// ============= check for a win
const checkForAWin = () => {
    if (playerDecisionMade = 'made'){ 
        if (playerPoints > dealerPoints) {
            setTimeout( () => {alert('player won! line 222')} , 1000);
            playerPot += playerBet*1;
            dealerPot -= playerBet*1;
            potUpdate();
            userChoice();
            return
        }
        if (dealerPoints > playerPoints) { 
            alert('dealer won! line 229');
            playerPot -= playerBet*1;
            dealerPot += playerBet*1;
            potUpdate();
            userChoice();
            return
        }
    }
}

// ============== check if user has ace in hand
const checkIfAceInHand = () => {
    if (playerPoints > 21) {
        // check if player has an ace, if so change value from 11 to 1
        for (i=0 ; i<playerHand.length ; i++) {
            let card = playerHand[i];
            if (card.faceValue === 'ace' && card.pointValue === 11) {
                console.log('ace found, changing from 11 to 1 point *******');
                card.pointValue = 1;
                calcPlayerScore();
            }
        }
    }
    if (dealerPoints > 21) {
        // check if dealer has an ace, if so change value from 11 to 1
        for (i=0 ; i<dealerHand.length ; i++) {
            let card = dealerHand[i];
            if (card.faceValue === 'ace' && card.pointValue === 11) {
                console.log('ace found, changing from 11 to 1 point *******');
                card.pointValue = 1;
                calcDealerScore();
            }
        }
    }
}

// =========== allow user to bet
const userBet = (message) => {
    playerBet = prompt( message + ' line 241' , '50');
    if (playerBet > playerPot) {
        setTimeout( () => {alert ('you do not have enough money! line 268')} , 1000);
        userBet(message);
    }
    return playerBet;
}

// ============ check for bust
const checkForBust = () => {
    if (playerPoints > 21) {
        setTimeout( ()=> {alert ('dealer wins, player hand is > 21 line 277')} , 500);
        // alert('dealer wins, playerhand is > 21 line 278');
        console.log('check for win, player');
        playerBust = true;                // added this so that playerdecision function is not triggered again. 
        playerPot -= playerBet*1;
        dealerPot += playerBet*1;
        potUpdate();
        setTimeout( () => {userChoice()} , 1000);
        return
    }
    else if (dealerPoints > 21) {
        setTimeout( ()=> {alert ('player wins, dealer hand is > 21 line 286')} , 500);
        // alert('player wins, dealer hand is >21 line 288');
        console.log('check for win, dealer');
        dealerBust = true;
        playerPot += playerBet*1;
        dealerPot -= playerBet*1;
        potUpdate();
        setTimeout( () => {userChoice()} , 1000);
        return
    }
}

// ============= user chooses to start game or not
const userChoice = () => {
    choice = prompt('would you like to play blackjack? enter yes or no line 298' , 'yes');
    if (choice === 'no') {
        return
    } else if (choice === 'yes') {
        startGame();
    } else {
         console.log('no choice line 304')
        return
    }
}


// ============ function to start game
const startGame = () => {
    nextRound();
    console.log(`Player pot: ${playerPot}`);
    console.log(`Dealer pot: ${dealerPot}`);
    setTimeout( userBet('how much would you like to bet?') , 500);
    generateCardValue(dealerHand);
    generateCardValue(dealerHand);
    generateCardValue(playerHand);
    generateCardValue(playerHand);
    // playerHand[0].pointValue = 2;
    // playerHand[1].pointValue =2;
    // dealerHand[0].pointValue =2;
    // dealerHand[1].pointValue = 2;
    // playerHand[1] = deckOfCards[(deckOfCards.length -1)];        // used to check ace from 11 to 1 functionality

    checkScore();           //might want to hard code the dealer score check of the single card then roll into score check of player followed by player choice. player choice wll be essentially a loop until they choose stay or 5 cards are delt. After stay or 5 player cardss then it will go into the dealer loop checking the following : is dealer score? > 21 -no-> is dealer score > player score? -no-> deal card for dealer, start at the beginning of checks
    
}


// ==============================================================================
// ========================= UI FUNCTIONALITY ===================================
// ==============================================================================

// ============== function to generate a div that represents the randomly chosen card, this is for the UI portion. I will hold off on this for now.
const generateCard = (cardID , card) => {
    let divCard = document.createElement('div');
    let divText = document.createElement('div');
    divCard.setAttribute('class' , 'card');
    divText.setAttribute('class' , 'card-text');
    // divText.innerText = '2 hearts';
    divText.innerText = `${card.faceValue} ${card.suitValue}`;
    divCard.appendChild(divText);
    // document.querySelector('#dealer-cards').appendChild(divCard);
    document.querySelector(cardID).appendChild(divCard);
    console.log('card generated and should be shown on UI');
}










// ================ start of game ================
// window.addEventListener('DOMContentLoaded', userChoice());


// //this did work
setTimeout( userChoice , 1000);





