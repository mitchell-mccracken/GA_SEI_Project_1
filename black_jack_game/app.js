
// ====================  variables needed throughout the program
const deckOfCards = [];
const usedDeckOfCards = [];
const cardNumberArray = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const cardSuitArray = [ 'Hearts' , 'Diamonds' , 'Spades' , 'Clubs'];
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
let firstDealerCardImage = '';

// =============== populate the pots
const potUpdate = () => {
    document.querySelector('#dealer-winnings').innerText = `Dealer winnings: ${dealerPot}`;
    document.querySelector('#player-winnings').innerText = `Player winnings: ${playerPot}`;
    document.querySelector('#current-bet').innerText = 'Current Bet:';
};
potUpdate();


// ===========================================================
// ==================== adding event listeners ===============
document.querySelector('#hit-btn').addEventListener('click' , () => { 
    if (choice !== 'yes'){
        choice = 'yes';
        userChoice();
        return
    }
    let decision = 'hit';
    playerDecision(decision);
});

document.querySelector('#stay-btn').addEventListener('click' , () => { 
    let decision = 'stay';
    let firstDealerCard = document.querySelector('#dealer-hand > .card');
    firstDealerCard.style.backgroundImage = firstDealerCardImage;
    playerDecision(decision);
});

// ==================== function to determine point value
const pointValue = (faceValue) => {
    if (faceValue === 'Ace') {
        return 11;
    } else if (faceValue === cardNumberArray[9] || faceValue === cardNumberArray[10] || faceValue === cardNumberArray[11] ) {
        return 10;
    } else {
        return faceValue;
    }
}

// =================== function to determine color
const cardColor = (suitValue) => {
    if (suitValue === 'Hearts' || suitValue === 'Diamonds') {
        return 'red';
    } else {
        return 'black';
    }
}

// ================== Generate card image url
const imgURL = (faceValue , suitValue) => {
    if (faceValue.length > 2 && faceValue[0] ==='A' && suitValue[0] === 'D') {
        let imageURL = `url('images/${faceValue[0]}ce${suitValue[0]}.png')`;
        return imageURL;
    } 
    else if (faceValue.length > 2) {
        let imageURL = `url('images/${faceValue[0]}${suitValue[0]}.png')`;
        return imageURL;
    }
    else {
        let imageURL = `url('images/${faceValue}${suitValue[0]}.png')`;
        return imageURL;
    }
}

// ========== create class to generate card object
class CardGeneration {
    constructor (faceValue , suitValue) {
        this.faceValue = faceValue;
        this.suitValue = suitValue;
        this.pointValue = pointValue(faceValue);
        this.color = cardColor(suitValue);
        this.image = imgURL(faceValue , suitValue);
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
    nextRound();
    playerPot = 500;
    dealerPot = 0;
    potUpdate();
    setTimeout( userChoice , 1000);
    document.querySelector('#dealer-score').innerText = 'Count: ';
    document.querySelector('#player-score').innerText = 'Count: ';
}

document.querySelector('#restart-btn').addEventListener('click' , reset);

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
    checkIfAceInHand();         //check if dealer or player is > 21 and has an ace
    checkForBust();
    if (playerBust || dealerBust) {
        return
    }
    if (playerDecisionMade === 'not made'){
        setTimeout(playerDecision , 1000);
    } else if (playerDecisionMade === 'made') {  
        setTimeout( dealerDecisionModel , 1000);
    }
}

// ============== player decision
const playerDecision = (decision) => {
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
            playerPot += playerBet*1;
            dealerPot -= playerBet*1;
            potUpdate();
            setTimeout( () => {alert('player won! line 222')} , 500);
            userChoice();
            return
        }
        if (dealerPoints > playerPoints) { 
            playerPot -= playerBet*1;
            dealerPot += playerBet*1;
            potUpdate();
            setTimeout( () => {alert('dealer won! line 229')} , 500);
            setTimeout(userChoice , 1000);
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
            if (card.faceValue === 'Ace' && card.pointValue === 11) {
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
            if (card.faceValue === 'Ace' && card.pointValue === 11) {
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
    document.querySelector('#current-bet').innerText = `Current Bet: ${playerBet}`;
    return playerBet;
}

// ============ check for bust
const checkForBust = () => {
    if (playerPoints > 21) {
        let firstDealerCard = document.querySelector('#dealer-hand > .card');
        firstDealerCard.style.backgroundImage = firstDealerCardImage;
        setTimeout( ()=> {alert ('dealer wins, player hand is > 21 line 277')} , 500);
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
    // playerHand[1] = deckOfCards[(deckOfCards.length -1)];        // used to check ace from 11 to 1 functionality

    checkScore();           
}


// ==============================================================================
// ========================= UI FUNCTIONALITY ===================================
// ==============================================================================

// ============== function to generate a div that represents the randomly chosen card, this is for the UI portion. I will hold off on this for now.
const generateCard = (cardID , card) => {
    let divCard = document.createElement('div');
    if (cardID === '#dealer-hand' && dealerHand.length === 1) {
        divCard.style.backgroundImage = "url('images/gray_back.png')";
        firstDealerCardImage = card.image;
    }
    else {
        divCard.style.backgroundImage = card.image;
        console.log('the image for this card is ' + card.image)
    }
    divCard.setAttribute('class' , 'card');
    document.querySelector(cardID).appendChild(divCard);
    console.log('card generated and should be shown on UI');
}

// ================ start of game ================


setTimeout( userChoice , 1000);





