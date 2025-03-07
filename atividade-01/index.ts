// Valida se a string representa um número binário par (termina em 0)
function validateBinaryEven(input: string): boolean {
  const regex = /^[01]*0$/;
  return regex.test(input);
}

// Valida se a palavra binária termina com "00" (deve ter pelo menos um dígito antes)
function validateBinaryWordEndingWith00(input: string): boolean {
  const regex = /^[01]+00$/;
  return regex.test(input);
}

// Valida se a string está entre aspas duplas (sem considerar escapes)
function validateQuotedString(input: string): boolean {
  const regex = /^"([^"]*)"|'([^'])*'$/;
  return regex.test(input);
}

// Valida telefones em SC (considera DDD 47, 48 ou 49, com ou sem parênteses, e com 4 ou 5 dígitos iniciais)
function validateTelephoneSC(input: string): boolean {
  const regex = /^\(?\s?(?:47|48|49)\s?\)?\s?(?:9?\d{4})-?\d{4}$/;
  return regex.test(input);
}

// Valida placas de veículos no Brasil (formato tradicional AAA-9999 ou novo padrão Mercosul AAA9A99)
function validateBrazilLicensePlate(input: string): boolean {
  const regex = /^(?:[A-Z]{3}-\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/;
  return regex.test(input);
}

// Valida e-mails que terminam com ".br" ou ".com.br"
function validateEmail(input: string): boolean {
  const regex = /^[\w\.-]+@[\w\.-]+\.(?:com\.)?br$/;
  return regex.test(input);
}

// Valida comentários de linha que começam com //
function validateLineComment(input: string): boolean {
  const regex = /^\s*\/\/.*$/;
  return regex.test(input);
}

// Valida comentários de múltiplas linhas delimitados por /* e */
function validateMultiLineComment(input: string): boolean {
  const regex = /\/\*[\s\S]*?\*\//;
  return regex.test(input);
}

// Função principal para testar as validações
function main(): void {
  console.log("Validação de Binários Pares:");
  console.log("1010 ->", validateBinaryEven("1010")); // true
  console.log("1011 ->", validateBinaryEven("1011")); // false

  console.log("\nValidação de Palavras Binárias com '00' no final:");
  console.log("1100 ->", validateBinaryWordEndingWith00("1100")); // true
  console.log("101 ->", validateBinaryWordEndingWith00("101")); // false

  console.log("\nValidação de String entre aspas:");
  console.log('"Hello World" ->', validateQuotedString('"Hello World"')); // true
  console.log("Hello World ->", validateQuotedString("Hello World")); // false

  console.log("\nValidação de Telefones em SC:");
  console.log("(47) 91234-5678 ->", validateTelephoneSC("(47) 91234-5678")); // true
  console.log("47 1234-5678 ->", validateTelephoneSC("47 1234-5678")); // true
  console.log("50 1234-5678 ->", validateTelephoneSC("50 1234-5678")); // false

  console.log("\nValidação de Placas de Veículos no Brasil:");
  console.log("ABC-1234 ->", validateBrazilLicensePlate("ABC-1234")); // true
  console.log("ABC1D23 ->", validateBrazilLicensePlate("ABC1D23"));   // true (novo padrão Mercosul)
  console.log("ABCD-123 ->", validateBrazilLicensePlate("ABCD-123"));   // false

  console.log("\nValidação de E-mail (.br ou .com.br):");
  console.log("teste@dominio.com.br ->", validateEmail("teste@dominio.com.br")); // true
  console.log("teste@dominio.br ->", validateEmail("teste@dominio.br"));         // true
  console.log("teste@dominio.com ->", validateEmail("teste@dominio.com"));       // false

  console.log("\nValidação de Comentários de Linha:");
  console.log("// Este é um comentário ->", validateLineComment("// Este é um comentário")); // true
  console.log("Não é comentário ->", validateLineComment("Não é comentário"));             // false

  console.log("\nValidação de Comentários de Múltiplas Linhas:");
  const multiLineComment = "/* Este é um \n comentário de múltiplas linhas */";
  console.log(multiLineComment, "->", validateMultiLineComment(multiLineComment)); // true
  const invalidMultiLine = "/* Comentário não finalizado";
  console.log(invalidMultiLine, "->", validateMultiLineComment(invalidMultiLine)); // false
}

main();
