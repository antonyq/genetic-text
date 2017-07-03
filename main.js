const ALPHABET = '123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
const DEFAULT_SENTENCE = "Evolve or dissolve";
const POPULATION_COUNT = 100;
const GENERATIONS_LIMIT = 1000;
const FRACTION = 0.9;

const randInt = (min, max) => min + Math.round(Math.random() * (max - min));
const randChar = (alphabet) => alphabet[randInt(0, alphabet.length - 1)];

window.onload = () => {
    let word = prompt('Sentence:', DEFAULT_SENTENCE);
    let population = randWords(POPULATION_COUNT, word.length);
    evolution(population, word);
}



// EVOLUTION //
function evolution (population, targetWord) {
    let dataTable = [];
    for (let i = 0; i < GENERATIONS_LIMIT; i++) {
        if (population.indexOf(targetWord) == -1) {
            let offsprings = croossbreeding(JSON.parse(JSON.stringify(population)));
            population = population.concat(offsprings);
            population = selection(population, targetWord);
            dataTable.push({
                'leader': population[0],
                'fitness': healthLevel(population, targetWord)
            });
        } else break;
    }

    console.log(`%c ${targetWord}`, 'color: #4AD');
    console.table(dataTable);
}

function fitness (word, targetWord) {
    let values = word.split('').map((char, index) => (char == targetWord[index]) ? 1 : 0);
    return values.reduce((a, b) => a + b) / targetWord.length;
}

function selection (population, targetWord) {
    let compare = (a, b) => {
        if (fitness(a, targetWord) < fitness(b, targetWord))
            return 1;
        if (fitness(a, targetWord) > fitness(b, targetWord))
            return -1;
        return 0;
    }

    population = population.sort(compare);
    population = population.filter((item, index, arr) => index < POPULATION_COUNT * FRACTION);
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
        parents = [word1, word2];
    for (let i = 0; i < word1.length; i++) {
        let parent = randInt(0, 1);
        childWord += parents[parent][i];
    }
    return childWord;
}

function mutation (word) {
    let pointer = randInt(0, word.length);
    return word.split('').map((char, index) => index == pointer ? randChar(ALPHABET) : char).join('');
}

function healthLevel (population, targetWord) {
    let personalHealth = population.map((word) => fitness(word, targetWord));
    let sum = personalHealth.reduce((a, b) => a + b);
    let avg = sum / personalHealth.length;
    return parseFloat(avg.toFixed(2));
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
