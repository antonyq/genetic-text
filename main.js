const START_POPULATION_COUNT = 10;
const ANCESTORS_COUNT = 5;
const GENRATIONS_LIMIT = 100;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz ';

const randInt = (min, max) => min + Math.ceil(Math.random() * (max - min));
const randChar = (word) => ALPHABET[randInt(0, ALPHABET.length)];

window.onload = () => {
    let word = prompt('Word:', 'space in lowercase');
    let population = randWords(START_POPULATION_COUNT, word.length);
    generateWord(randWords, word);
}

function randWord(symbolsCount) {
    let randWord = '';
    for (let i = 0; i < symbolsCount; i++) {
        randWord += randChar();
    }
    return randWord;
}

function randWords (count, symbolsCount) {
    let randWords = [];
    for (let i = 0; i < count; i++) {
        randWords.push(randWord(symbolsCount));
    }
    return randWords;
}

function hasTargetWord(population, targetWord) {
    for (let i = 0; i < population.length; i++) {
        if (!fitness(population, targetWord)) return true;
    }
    return false;
}

// EVOLUTION //
function evolution (population, targetWord) {
    if (!hasTargetWord(population, targetWord)) {
        console.log(targetWord);
    } else {
        while (!hasTargetWord(population, targetWord)) {

        }
    }
}

function fitness (word, targetWord) { // -> max
    let value = 0;
    for (let i = 0; i < word.length; i++) {
        value += (word[i] == targetWord[i]) ? 1 : 0;
    }
    return value;
}

function selection (word1, word2, targetWord) {

}

function crossover (word1, word2) {
    let childWord = '',
        separatorIndex = randInt(0, word1.length),
        crossoverIndex = randInt(0, 1);
    for (let i = 0; i < word1.length; i++) {
        if (i == separatorIndex) {
            childWord += ((crossoverIndex) ? word1[i] : word2[i]) + ((1 - crossoverIndex) ? word2[i] : word1[i]);
            i++;
        } else {
            childWord += word1[i];
        }
    }
    return childWord;
}

const mutation (word) => word.splice(randInt(0, word.length), 1, randChar());
// EVOLUTION END //
