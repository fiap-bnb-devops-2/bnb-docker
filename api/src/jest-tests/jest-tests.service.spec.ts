describe('Primeiro grupo de testes', () => {

  test('Primeiro teste', () => {

    const message = 'Meu primeiro teste no Jest!!!';

    expect(message).toBe('Meu primeiro teste no Jest!!!');

  });

  it('Segundo teste', () => {

    const myNumber = 10;

    expect(myNumber).toBe(10);

  });

});

function multiplyNumber(num1: number, num2: number) {

  num1 = Number(num1);
  num2 = Number(num2);

  if (isNaN(num1) || isNaN(num2)) {
    return {
      message: 'Número inválido',
    };
  }

  return num1 * num2;

}

describe('multiplyNumber function', () => {

  // POSITIVO - Esperamos um resultado correto
  it('should multiply a number', () => {

    const result = multiplyNumber(2, 6);

    expect(result).toBe(12);

  });

  // POSITIVO - Esperamos um resultado correto
  it.only('should multiply a string number', () => {

    const result = multiplyNumber('10' as unknown as number, 5);

    expect(result).toBe(50);

  });

  // NEGATIVO - O que fazer quando uma informação inválida é passada
  it('should return an error when provide an invalid number', () => {

    const result = multiplyNumber(Number('abc'), 10);

    expect(result).toHaveProperty('message', 'Número inválido');

  });

});

function splitString(text: string) {

  if (!text) {
    return "Informe o texto";
  }

  return text.split('');

}

describe('splitString function', () => {

  // POSITIVO - Uma informação válida é passada
  it('should split a string', () => {

    const result = splitString('jest');

    expect(result).toEqual(['j', 'e', 's', 't']);

  });

  // NEGATIVO - Uma informação inválida é passada
  it.skip('should return a message when text is not provided', () => {

    const response = splitString('');

    expect(response).toBe('Informe o texto');

  });

  /*
  // Executa algo antes de cada teste do agrupamento "splitString function"
  beforeEach(() => {

    console.log("Executando ANTES do teste da função");

  });

  // Executa algo depois de cada teste do agrupamento "splitString function"
  afterEach(() => {

    console.log("Executando DEPOIS do teste da função");

  });
  */

});


// Executa algo antes de cada teste
beforeEach(() => {

  console.log("Executando ANTES do teste");

});

// Executa algo depois de cada teste
afterEach(() => {

  console.log("Executando DEPOIS do teste");

});

beforeAll(() => {

  console.log("Conectando no Banco de Dados");

});

afterAll(() => {

  console.log("Fechando a conexão com o Banco de Dados");

});