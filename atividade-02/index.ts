import * as fs from 'fs';
import * as path from 'path';

function extractCharacters(filePath: string): string[] {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return Array.from(fileContent);
}

function filterCharacters(chars: string[], undesiredChars: string[]): string[] {
  return chars.filter((char) => !undesiredChars.includes(char));
}

function printNumberedLines(filePath: string): void {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split(/\r?\n/);

  console.log('--- LISTAGEM NUMERADA ---');
  lines.forEach((line, index) => {
    console.log(`${index + 1}: ${line}`);
  });
  console.log('-------------------------\n');
}

function printCrossReference(filePath: string): void {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split(/\r?\n/);

  const crossRef: { [word: string]: Set<number> } = {};

  lines.forEach((line, lineIndex) => {
    const words = line.split(/\W+/).filter(Boolean);

    for (const w of words) {
      const word = w.toLowerCase();
      if (!crossRef[word]) {
        crossRef[word] = new Set();
      }
      crossRef[word].add(lineIndex + 1);
    }
  });

  const sortedWords = Object.keys(crossRef).sort();

  console.log('--- REFERÊNCIA CRUZADA DE PALAVRAS ---');
  for (const word of sortedWords) {
    // Converte o Set em array e junta as linhas com vírgula
    const linesForWord = [...crossRef[word]].join(', ');
    console.log(`${word} -> [${linesForWord}]`);
  }
  console.log('--------------------------------------\n');
}

function main(): void {
  const inputFile = path.join(__dirname, 'example.txt');

  const allChars = extractCharacters(inputFile);
  console.log('--- EXTRATOR DE CARACTERES ---');
  console.log(allChars);
  console.log('------------------------------\n');

  const undesired = [' ', '\t', '\n', '\r'];
  const filteredChars = filterCharacters(allChars, undesired);
  console.log('--- CARACTERES APÓS FILTRO ---');
  console.log(filteredChars);
  console.log('------------------------------\n');

  printNumberedLines(inputFile);

  printCrossReference(inputFile);
}

main();
