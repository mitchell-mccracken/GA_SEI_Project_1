//print function used in place of console.log
const print = (input) => { console.log(input) };
print('js file connected')

// ====================  variables to create deck of cards array
const deckOfCards = [];
const cardNumberArray = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
const cardSuitArray = [ 'heart' , 'diamond' , 'spade' , 'club'];
const dealerHand = [];
const playerHand = [];

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

// ============== function to generate a div that represents the randomly chosen card
const generateCard = () => {
    let divCard = document.createElement('div');
    let divText = document.createElement('div');
    divCard.setAttribute('class' , 'card');
    divText.setAttribute('class' , 'card-text');
    divText.innerText = '2 hearts';
    divCard.appendChild(divText);
    document.querySelector('#dealer-cards').appendChild(divCard);

}

