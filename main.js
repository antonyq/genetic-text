const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const START_POPULATION_COUNT = 100;
const GENERATIONS_LIMIT = 100;
const FRACTION = 0.5;

const randInt = (min, max) => min + Math.ceil(Math.random() * (max - min));
const randChar = (alphabet) => alphabet[randInt(0, alphabet.length - 1)];

window.onload = () => {
    let word = prompt('Word:', 'word');
    let population = randWords(START_POPULATION_COUNT, word.length);
    evolution(population, word);
}



// EVOLUTION //
function evolution (population, targetWord) {
    for (let i = 0; i < GENERATIONS_LIMIT; i++) {
        if (population.indexOf(targetWord) == -1) {
            let offsprings = croossbreeding(JSON.parse(JSON.stringify(population)));
            population = population.concat(offsprings);
            population.push(targetWord);
            population = selection(population, targetWord);
            console.log(healthLevel(population));
        } else break;
    }
}

function fitness (word, targetWord) {
    let values = word.split('').map((char, index) => (char == targetWord[index]) ? 1 : 0);
    return values.reduce((a, b) => a + b);
}

function selection (population, targetWord) {
    let compare = (a, b) => {
        if (fitness(a, targetWord) < fitness(b, targetWord))
            return -1;
        if (fitness(a, targetWord) > fitness(b, targetWord))
            return 1;
        return 0;
    }

    population = population.sort(compare);
    population = population.filter((item, index, arr) => index/arr.length < FRACTION);
    return population;
}

function croossbreeding (parents) {
    let offsprings = [];
    while (parents.length > 1) {
        let first = parents.splice(randInt(0, parents.length - 1), 1)[0],
            second = parents.splice(randInt(0, parents.length - 1), 1)[0];
        offsprings.push(mutation(crossover(first, second)));
    }
    return offsprings;
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
    console.log(word1, word2, childWord);
    return childWord;
}

function mutation (word) {
    let pointer = randInt(0, word.length - 1);
    return word.split('').map((char, index) => index == pointer ? randChar(ALPHABET) : char).join('');
}

function healthLevel (population) {
    let personalHealth = population.map(fitness);
    let sum = personalHealth.reduce((a, b) => a + b);
    let avg = sum / personalHealth.length;
    return avg;
}
// EVOLUTION END //



// FUNCTIONS //
function randWord(symbolsCount) {
    let randWord = '';
    for (let i = 0; i < symbolsCount; i++) {
        randWord += randChar(ALPHABET);
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
// FUNCTIONS END //
