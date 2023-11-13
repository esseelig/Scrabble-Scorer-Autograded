// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "\n\n";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Let's play some scrabble!\n\nEnter a word to score: ");
}

let simpleScorer = function(word) {
	word = word.toUpperCase();
	return word.length;
 }

let vowelBonusScorer = function(word) {

	word = word.toUpperCase();
   let vowelTotal = 0;

   for (let i = 0; i < word.length; i++) {
      if (word[i] === "A" || word[i] === "E" || word[i] === "I" ||word[i] === "O" ||word[i] === "U") {
         vowelTotal += 3;
      } else {
         vowelTotal += 1;
      }
   }
	return vowelTotal;
 }

let scrabbleScorer = function(word) {
	word = word.toLowerCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (let letterValue in newPointStructure) {
 
		 if (letterValue === word[i]) {
			letterPoints += newPointStructure[letterValue];
		 }
 
	  }
	}
	return letterPoints;
 }


let simpleAlgorithm = {
   name: "Simple",
   description: "One point per character",
   scorerFunction: simpleScorer
}

let vowelBonusAlgorithm = {
   name: "Vowel Bonus",
   description: "Vowels are worth 3 points",
   scorerFunction: vowelBonusScorer
}

// let oldScrabbleAlgorithm = {
//    name: "Scrabble",
//    description: "Uses scrabble point system",
//    scorerFunction: oldScrabbleScorer
// }

let ScrabbleAlgorithm = {
   name: "Scrabble",
   description: "Uses scrabble point system",
   scorerFunction: scrabbleScorer
}


const scoringAlgorithms = [simpleAlgorithm, vowelBonusAlgorithm, ScrabbleAlgorithm];

function scorerPrompt(word) {

   console.log("Which scoring algorithm would you like to use?\n");
   
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
   }

   let userScoringChoice = input.question("Enter 0, 1, or 2: ");

   while (/^[0-2]*$/.test(userScoringChoice) === false) {
      console.log(`
\tSorry, '${userScoringChoice}' is not a valid choice.
`);

      console.log("Which scoring algorithm would you like to use?\n");
         
      for (let i = 0; i < scoringAlgorithms.length; i++) {
         console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
      }

      userScoringChoice = input.question("Enter 0, 1, or 2: ");

      }

   return scoringAlgorithms[userScoringChoice].scorerFunction(word);
}

function transform(preTransformedObject) {

   let transformedLetterValueList = {};
   for (keyValuePairTransform in preTransformedObject) {

      for (i = 0; i < preTransformedObject[keyValuePairTransform].length; i++) {
         transformedLetterValueList[preTransformedObject[keyValuePairTransform][i].toLowerCase()] = Number(keyValuePairTransform);
      }
   }

   return transformedLetterValueList;
}

let newPointStructure = transform(oldPointStructure);
newPointStructure[' '] = 0;

function runProgram() {
   let userWord = initialPrompt();

   while (/^[A-Za-z\s]*$/.test(userWord) === false) {
      userWord = input.question(`
\tSorry, '${userWord}' is not a valid word.

Please enter a valid word: `);
   }

console.log(`Score for '${userWord}': ${scorerPrompt(userWord)}`);

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
