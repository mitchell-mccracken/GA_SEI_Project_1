//print function used in place of console.log
const print = (input) => { console.log(input) };
print('js file connected')

// ====================  create array for the deck of cards, only using 1 deck of cards at first, format will be face value '-' suit value
const deckOfCards = [];
const cardNumberArray = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k', 'a'];
const cardSuitArray = [ 'heart' , 'diamond' , 'spade' , 'club'];

for (number of cardNumberArray) {
    let num = number;
    for (suit of cardSuitArray) {
        let cardSuit = suit;
        deckOfCards.push(`${num}-${cardSuit}`);
    }
}
print(deckOfCards);
let chosenCard = deckOfCards[0].split('-');
print(chosenCard);

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

