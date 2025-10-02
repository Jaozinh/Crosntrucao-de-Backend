const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
  const resultado = tarefaModel.listar();
  res.json(resultado);
}

function buscarPeloId(req, res) {
  const tarefaId = req.params.tarefaId;

  
  const resultado = tarefaModel.buscarPeloId(tarefaId);

  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

function criar(req, res) {
  const novaTarefa = req.body;

  const resultado = tarefaModel.criar(novaTarefa);

  res.status(201).json(resultado);
}

function atualizar(req, res) {
  const tarefaId = req.params.tarefaId;
  const dadosAtualizados = req.body;

  const tarefa = { id: tarefaId, ...dadosAtualizados };

  const resultado = tarefaModel.atualizar(tarefa);

  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

function remover(req, res) {
  const tarefaId = req.params.tarefaId;

  const resultado = tarefaModel.remover(tarefaId);

  if (resultado) {
    res.status(204).end();
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

    module.exports = {
    listar,
    buscarPeloId,
    criar,
    atualizar,
    remover,
    };
