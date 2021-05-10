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

// ================ random number generator based on length of deckOfCards array
const randNum = () => {
    let randomNumber =  Math.floor( Math.random() * deckOfCards.length );
    // console.log(randomNumber);
    return randomNumber;
}

// ================= generate card
const generateCardValue = (forWho) => {
    let index = randNum();
    card = deckOfCards[index];
    forWho.push(card);
    usedDeckOfCards.push(card);
    deckOfCards.splice(index , 1);
}

// ================ calculate dealer score
const calcDealerScore = () => {
    dealerPoints = 0;                   // I don't think this is needed
    //check if it is the first two cards for the dealer, if so only display one of them
    if (dealerHand.length === 2 && playerDecisionMade === 'not made') {
        dealerPoints = dealerHand[1].pointValue;
        console.log(`dealer card : ${dealerHand[1].faceValue} of ${dealerHand[1].suitValue}`);
        console.log(`dealer points: ${dealerPoints}`);
    } else{
        for (i=0 ; i<dealerHand.length ; i++) {
            dealerPoints += dealerHand[i].pointValue;
            console.log(`dealer card : ${dealerHand[i].faceValue} of ${dealerHand[i].suitValue}`);
        }
        console.log(`dealer points: ${dealerPoints}`);
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
}

// ================= check score
const checkScore = () => {
    playerPoints = 0;               //have to reset everytime I count because this is set as a global variable
    dealerPoints = 0;               //have to reset everytime I count because this is set as a global variable
    console.log('========= check score ===========')
    calcDealerScore();
    console.log(' ------------------');
    calcPlayerScore();
    // check if dealer or player is > 21 and has an ace
    checkIfAceInHand();
    checkForAWin();

    if (playerDecisionMade === 'not made'){
        setTimeout(playerDecision , 1000);
    } else if (playerDecisionMade === 'made') {
        dealerDecisionModel();
    }
    
    ///should probably include playerDecision in this function then allow it to loop back to this function if player hits, also may need to add a check to see if anyone has lost yet
}

// ============== player decision
const playerDecision = () => {
    let decision = prompt('would you like to hit or stay' , 'stay');
    console.log(decision);
    console.log('******************')
    if (decision === 'hit') {
        generateCardValue(playerHand);
        checkScore();
    }
    else if (decision === 'stay') {
        playerDecisionMade = 'made';
        checkScore();
    } 
}

// =========== the decision model for dealer getting dealer more cards 
const dealerDecisionModel = () => {
    if (playerDecisionMade === 'made'){      
        if (dealerPoints < playerPoints) {
            console.log('generating card for dealer');
            generateCardValue(dealerHand);
            checkScore();
        } else if (dealerPoints > playerPoints && dealerPoints > 21) {
            alert('*** dealer loses!');                                     //might need to check for an ace here
            return
        } else if (dealerPoints > playerPoints && dealerPoints <= 21){
            alert('***** dealer wins!');
            return
        }
    }
}

// ============= check for a win
const checkForAWin = () => {
    if (playerPoints > 21) {
        alert ('dealer wins, player hand is > 21');
        return
    }
    if (dealerPoints > 21) {
        alert ('player wins, dealer hand is > 21');
        return
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


// ============ function to start game
const startGame = () => {
    generateCardValue(dealerHand);
    // dealerHand[0] = deckOfCards[(deckOfCards.length -1)];
    generateCardValue(dealerHand);
    generateCardValue(playerHand);
    generateCardValue(playerHand);
    playerHand[1] = deckOfCards[(deckOfCards.length -1)];
    checkScore();           //might want to hard code the dealer score check of the single card then roll into score check of player followed by player choice. player choice wll be essentially a loop until they choose stay or 5 cards are delt. After stay or 5 player cardss then it will go into the dealer loop checking the following : is dealer score? > 21 -no-> is dealer score > player score? -no-> deal card for dealer, start at the beginning of checks
    
}










// ================ start of game ================
startGame();


// ==============================================================================
// ========================= UI FUNCTIONALITY ===================================
// ==============================================================================

// ============== function to generate a div that represents the randomly chosen card, this is for the UI portion. I will hold off on this for now.
// const generateCard = () => {
//     let divCard = document.createElement('div');
//     let divText = document.createElement('div');
//     divCard.setAttribute('class' , 'card');
//     divText.setAttribute('class' , 'card-text');
//     divText.innerText = '2 hearts';
//     divCard.appendChild(divText);
//     document.querySelector('#dealer-cards').appendChild(divCard);
// }



