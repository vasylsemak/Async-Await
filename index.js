const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);

const mostFrequentWord = (text) => {
  const words = text.toLowerCase().match(/[^_\W]+/g);
  const tally = {};
  let mostFrequentWord = null;

  words.forEach(word => {
    tally[word] = (tally[word] || 0) + 1 ;
    if(!tally[mostFrequentWord] || tally[word] > tally[mostFrequentWord])
      mostFrequentWord = word;
  });
  return mostFrequentWord;
}

const findPassword = async () => {
  try {
    const poem1 = await readFileAsync('poems/starting-poem.txt', 'utf-8');
    const poem1Word = mostFrequentWord(poem1);
    console.log("1 -> ", poem1Word);

    const poem2 = await fs.readFileSync(`poems/${poem1Word}.txt`, 'utf-8');
    const poem2Word = mostFrequentWord(poem2);
    console.log("2 -> ", poem2Word);

    const poem3 = await readFileAsync(`poems/${poem2Word}.txt`, 'utf-8');
    const poem3Word = mostFrequentWord(poem3);

    console.log("3 -> ", poem3Word);
  } catch (error) {
    throw error;
  }
}

findPassword();
