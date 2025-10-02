const request = require('supertest');

const app = require('../app');

let tarefaId; 

const api = request(app);

describe('Testes da API de Tarefas', () => {

  test('GET /tarefas deve retornar status 200 e um array vazio (JSON)', async () => {
    const response = await api.get('/tarefas');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /tarefas deve criar uma nova tarefa e retornar status 201', async () => {
    const novaTarefa = { nome: 'Estudar Node', concluida: false };
    const response = await api.post('/tarefas')
      .send(novaTarefa);

    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe('Estudar Node');
    expect(response.body.concluida).toBe(false);

    tarefaId = response.body.id;
  });

  test('GET /tarefas/:id deve retornar status 200 e a tarefa recém-criada', async () => {
    const response = await api.get(`/tarefas/${tarefaId}`);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBe(tarefaId);
    expect(response.body.nome).toBe('Estudar Node');
  });

  test('GET /tarefas/1 (ID não existente) deve retornar status 404', async () => {
    const response = await api.get('/tarefas/1');

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual({ msg: 'Tarefa não encontrada' });
  });

  test('PUT /tarefas/:id deve atualizar a tarefa e retornar status 200', async () => {
    const dadosAtualizados = { nome: 'Estudar Node e Express', concluida: true };
    const response = await api.put(`/tarefas/${tarefaId}`)
      .send(dadosAtualizados);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBe(tarefaId);
    expect(response.body.nome).toBe('Estudar Node e Express');
    expect(response.body.concluida).toBe(true);
  });

  test('PUT /tarefas/1 (ID não existente) deve retornar status 404', async () => {
    const response = await api.put('/tarefas/1')
      .send({ nome: 'Teste', concluida: false });

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual({ msg: 'Tarefa não encontrada' });
  });

  test('DELETE /tarefas/:id deve remover a tarefa e retornar status 204 e sem conteúdo', async () => {
    const response = await api.delete(`/tarefas/${tarefaId}`);

    expect(response.statusCode).toBe(204);
    expect(response.text).toBe('');
  });

  test('DELETE /tarefas/1 (ID não existente) deve retornar status 404 e JSON', async () => {
    const response = await api.delete('/tarefas/1');

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual({ msg: 'Tarefa não encontrada' });
  });
});
