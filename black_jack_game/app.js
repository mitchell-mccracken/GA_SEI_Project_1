//print function used in place of console.log
const print = (input) => { console.log(input) };
print('js file connected')

// ====================  variables to create deck of cards array
const deckOfCards = [];
const cardNumberArray = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
const cardSuitArray = [ 'heart' , 'diamond' , 'spade' , 'club'];
let dealerHand = [];
let dealerPoints = 0;
let playerHand = [];
let playerPoints = 0;

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
    if (suitValue === 'heart' || suitValue === 'diamond') {
        return 'red';
    } else {
        return 'black';
    }
}

// ========== create class to generate card object
class CardGeneration {
    constructor (faceValue , suitValue, color) {
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
        // deckOfCards.push(`${num}-${cardSuit}`);
        const card = new CardGeneration( num , cardSuit , 'nocolor');
        deckOfCards.push(card);
    }
}

// =============== function to reset the game
const reset = () => {
    print('game reset');
    playerHand = [];
    dealerHand = [];
}

// ================ random number generator based on length of deckOfCards array
const randNum = () => {
    let randomNumber =  Math.floor( Math.random() * deckOfCards.length );
    print(randomNumber);
    return randomNumber;
}

// ================= generate card
const generateCardValue = (forWho) => {
    card = deckOfCards[randNum()];
    forWho.push(card);
}

// ================= check points
const checkScore = () => {
    //check if it is the first two cards for the dealer, if so only display one of them
    if (dealerHand.length === 2) {
        dealerPoints = dealerHand[1].pointValue;
        print(`dealer card : ${dealerHand[1].faceValue} of ${dealerHand[1].suitValue}`);
    } else{
        for (i=0 ; i<dealerHand.length ; i++) {
            dealerPoints += dealerHand[i].pointValue;
            print(`dealer card : ${dealerHand[i].faceValue} of ${dealerHand[i].suitValue}`);
        }
    }
    print(`dealer points: ${dealerPoints}`);
    print(' ------------------');
    for (i=0 ; i<playerHand.length ; i++) {
        playerPoints += playerHand[i].pointValue;
        print(`player card : ${playerHand[i].faceValue} of ${playerHand[i].suitValue}`);
    }
    print(`player points: ${playerPoints}`);
    ///should probably include playerDecision in this function then allow it to loop back to this function if player hits, also may need to add a check to see if anyone has lost yet
}

// ============== player decision
const playerDecision = () => {
    let decision = prompt('would you like to hit or stay' , 'stay');
    print(decision);
    if (decision === 'hit') {
        generateCardValue(playerHand);
    }
    else if (decision === 'stay') {
        //need to check score
        //if 
    }
}

// ============ function to start game
const startGame = () => {
    generateCardValue(dealerHand);
    generateCardValue(dealerHand);
    generateCardValue(playerHand);
    generateCardValue(playerHand);
    checkScore();
    setTimeout(playerDecision , 2000);
}










// ================ start of game ================
startGame();


// ==============================================================================
// ========================= UI FUNCTIONALITY ===================================
// ==============================================================================

// ============== function to generate a div that represents the randomly chosen card, this is for the UI portion. I will hold off on this for now.
const generateCard = () => {
    let divCard = document.createElement('div');
    let divText = document.createElement('div');
    divCard.setAttribute('class' , 'card');
    divText.setAttribute('class' , 'card-text');
    divText.innerText = '2 hearts';
    divCard.appendChild(divText);
    document.querySelector('#dealer-cards').appendChild(divCard);

}

