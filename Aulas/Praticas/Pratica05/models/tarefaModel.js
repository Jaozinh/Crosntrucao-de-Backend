const tarefas = [];


function listar() {
  return tarefas;
}


function buscarPeloId(tarefaId) {
  const tarefa = tarefas.find(t => String(t.id) === String(tarefaId));
  return tarefa || null;
}

function criar(tarefa) {
  const novaTarefa = {
    id: Math.random().toString(36).substr(2, 4), 
    nome: tarefa.nome,
    concluida: tarefa.concluida || false,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function atualizar(tarefa) {
  const index = tarefas.findIndex(t => String(t.id) === String(tarefa.id));

  if (index !== -1) {
    tarefas[index] = { ...tarefas[index], ...tarefa };
    return tarefas[index];
  }
  return null;
}

function remover(tarefaId) {
  const index = tarefas.findIndex(t => String(t.id) === String(tarefaId));

  if (index !== -1) {
    const tarefaRemovida = tarefas[index];
    tarefas.splice(index, 1);
    return tarefaRemovida;
  }
  return null;
}

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover,
};
