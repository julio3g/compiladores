import * as fs from 'node:fs';
import * as path from 'node:path';

/* Funções já existentes */

// Extrai todos os caracteres de um arquivo
function extractCharacters(filePath: string): string[] {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return Array.from(fileContent);
}

// Filtra caracteres indesejados
function filterCharacters(chars: string[], undesiredChars: string[]): string[] {
  return chars.filter((char) => !undesiredChars.includes(char));
}

// Imprime as linhas do arquivo numeradas
function printNumberedLines(filePath: string): void {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split(/\r?\n/);

  console.log('--- LISTAGEM NUMERADA ---');
  lines.forEach((line, index) => {
    console.log(`${index + 1}: ${line}`);
  });
  console.log('-------------------------\n');
}

// Mostra uma referência cruzada de palavras para as linhas onde aparecem
function printCrossReference(filePath: string): void {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split(/\r?\n/);

  const crossRef: { [word: string]: Set<number> } = {};

  lines.forEach((line: string, lineIndex: number) => {
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
    const linesForWord = [...crossRef[word]].join(', ');
    console.log(`${word} -> [${linesForWord}]`);
  }
  console.log('--------------------------------------\n');
}

/* 5 - Conversão Numérica */
// Converte uma string numérica de uma base específica para decimal
function convertToDecimal(numStr: string, base: number): number {
  return parseInt(numStr, base);
}

// Converte um número decimal para outra base com formatação customizada
function convertFromDecimal(num: number, base: number, minDigits: number = 0, signAfter: boolean = false): string {
  let sign = num < 0 ? '-' : '';
  let absNum = Math.abs(num);
  let converted = absNum.toString(base);
  while (converted.length < minDigits) converted = '0' + converted;
  if (signAfter && sign) {
    converted = converted + sign;
    sign = '';
  }
  return sign + converted;
}

/* 6 - Tabela de Símbolos */
// Interface para atributos dos símbolos
interface SymbolAttributes {
  [key: string]: any;
}

// Representação de uma entrada na tabela de símbolos
interface SymbolEntry {
  name: string;
  attributes: SymbolAttributes;
}

// Classe que implementa a tabela de símbolos
class SymbolTable {
  private symbols: SymbolEntry[] = [];

  // Adiciona um símbolo, se não existir ainda
  addSymbol(name: string, attributes: SymbolAttributes = {}): void {
    if (!this.findSymbol(name)) {
      this.symbols.push({ name, attributes });
    } else {
      console.log(`Símbolo "${name}" já existe.`);
    }
  }

  // Procura um símbolo na tabela
  findSymbol(name: string): SymbolEntry | undefined {
    return this.symbols.find(sym => sym.name === name);
  }

  // Ordena os símbolos alfabeticamente
  sortSymbols(): void {
    this.symbols.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Atualiza atributos de um símbolo já existente
  updateSymbol(name: string, attributes: SymbolAttributes): boolean {
    const symbol = this.findSymbol(name);
    if (symbol) {
      symbol.attributes = { ...symbol.attributes, ...attributes };
      return true;
    }
    return false;
  }

  // Imprime a tabela de símbolos
  printTable(): void {
    console.log('--- TABELA DE SÍMBOLOS ---');
    this.symbols.forEach(sym => {
      console.log(`${sym.name}: ${JSON.stringify(sym.attributes)}`);
    });
    console.log('--------------------------\n');
  }
}

/* 7 - Pesquisa em Tabelas de Conteúdo Fixo */
// Pesquisa linear em um vetor de palavras fixas (ex.: palavras reservadas)
function searchFixedTable(fixedTable: string[], word: string): number {
  return fixedTable.findIndex(w => w === word);
}

// Pesquisa binária em um vetor ordenado
function binarySearchFixedTable(sortedTable: string[], word: string): number {
  let low = 0;
  let high = sortedTable.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (sortedTable[mid] === word) {
      return mid;
    } else if (sortedTable[mid] < word) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
}

/* Função principal demonstrando todas as funcionalidades */
function main(): void {
  const inputFile = path.join(__dirname, 'example.txt');

  // Demonstração das funções de leitura e processamento de arquivo
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

  // Demonstração 5 - Conversão Numérica
  console.log('--- CONVERSÃO NUMÉRICA ---');
  const numberInHex = "1A3F"; // número em hexadecimal
  const convertedDecimal = convertToDecimal(numberInHex, 16);
  console.log(`Hexadecimal "${numberInHex}" -> Decimal ${convertedDecimal}`);
  // Convertendo para binário com pelo menos 8 dígitos e sinal posicionado à direita se negativo
  const formattedOutput = convertFromDecimal(convertedDecimal, 2, 8, true);
  console.log(`Decimal ${convertedDecimal} -> Binário "${formattedOutput}"`);
  console.log('--------------------------\n');

  // Demonstração 6 - Tabela de Símbolos
  const symTable = new SymbolTable();
  symTable.addSymbol("alpha", { tipo: "variável", valor: 10 });
  symTable.addSymbol("beta", { tipo: "função", parâmetros: 2 });
  symTable.addSymbol("gamma", { tipo: "constante", valor: 3.14 });
  symTable.printTable();
  
  symTable.sortSymbols();
  console.log('Após ordenação:');
  symTable.printTable();

  const foundSym = symTable.findSymbol("beta");
  if (foundSym) {
    console.log(`Símbolo encontrado: ${foundSym.name} -> ${JSON.stringify(foundSym.attributes)}`);
  }
  
  symTable.updateSymbol("beta", { valor: 42 });
  console.log('Após atualização:');
  symTable.printTable();

  // Demonstração 7 - Pesquisa em Tabelas de Conteúdo Fixo
  console.log('--- PESQUISA EM TABELA DE CONTEÚDO FIXO ---');
  const reservedWords = ["if", "else", "while", "return", "function", "const", "let", "var"];
  // Ordena a lista para usar a busca binária
  reservedWords.sort();
  console.log(`Posição da palavra reservada "return": ${binarySearchFixedTable(reservedWords, "return")}`);
  console.log(`Posição da palavra reservada "for": ${binarySearchFixedTable(reservedWords, "for")}`);
  console.log('--------------------------\n');
}

main();
