
const { calcularMediaAluno } = require('../src/calcularMediaAluno');

    test('A função calcularMediaAluno estar definida', () => {
      expect(calcularMediaAluno).toBeDefined();
    });

    test('Erro se a1 ou a2 não forem informadas', () => {
     expect(() => calcularMediaAluno(undefined, 7)).toThrow('Notas a1 ou a2 não informadas');
      expect(() => calcularMediaAluno(5, undefined)).toThrow('Notas a1 ou a2 não informadas');
    });

    test('Erro se a1 ou a2 forem negativas', () => {
    expect(() => calcularMediaAluno(-1, 7)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(6, -2)).toThrow('Notas a1 ou a2 não podem ser negativas');
    });

     test('Calcular média quando a3 não for informada', () => {
    const resultado = calcularMediaAluno(5, 7);
    expect(resultado).toBeCloseTo(5 * 0.4 + 7 * 0.6);
    });

    test('Lançar erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(5, 7, -3)).toThrow('Nota a3 não pode ser negativa');
    });

    test('Usar a combinação (a1 + a3)', () => {
    const resultado = calcularMediaAluno(9, 4, 8);
    const esperado = 9 * 0.4 + 8 * 0.6;
    expect(resultado).toBeCloseTo(esperado);
    });

    test('Usar a melhor combinação (a2 + a3)', () => {
    const resultado = calcularMediaAluno(4, 9, 8);
    const esperado = 9 * 0.6 + 8 * 0.4;
    expect(resultado).toBeCloseTo(esperado);
    });
