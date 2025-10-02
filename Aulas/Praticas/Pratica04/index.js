    const express = require('express');

    const tarefas = [
    { id: 1, nome: "Estudar middleware", concluida: false },
    { id: 2, nome: "Praticar Express", concluida: true }
    ];

    const app = express();
    const PORT = 3000;

    app.use(express.json());

     app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); 
    });

    const tarefaRouter = express.Router();

    app.use('/tarefas', tarefaRouter);

    const getTarefaId = (req) => parseInt(req.params.tarefaId, 10);
    
    tarefaRouter.get('/', (req, res) => {
    res.json(tarefas);
    });


        tarefaRouter.post('/', (req, res) => {
            const novaTarefa = req.body;
            const newId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1;
            novaTarefa.id = newId;
            novaTarefa.concluida = novaTarefa.concluida || false; 
    
    tarefas.push(novaTarefa);
    
    res.status(201).json(novaTarefa);
    });

     tarefaRouter.get('/:tarefaId', (req, res, next) => {
        const id = getTarefaId(req);
        const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        const error = new Error("Tarefa não localizada");
        error.statusCode = 404; 
        return next(error);
    }

    res.json(tarefa);
    });

        tarefaRouter.put('/:tarefaId', (req, res, next) => {
            const id = getTarefaId(req);
            const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        const error = new Error("Tarefa não localizada");
        error.statusCode = 404; 
        
        return next(error);
    }

    tarefas[index] = { ...tarefas[index], ...req.body, id: id };
    res.json(tarefas[index]);
    });

      tarefaRouter.delete('/:tarefaId', (req, res, next) => {
        const id = getTarefaId(req);
        const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
         const error = new Error("Tarefa não localizada");
        error.statusCode = 404; 
        return next(error);
    }
        tarefas.splice(index, 1);
        res.status(204).end();
    });


    
    app.use((err, req, res, next) => {
        console.error(err.stack); 
        const statusCode = err.statusCode || 400; 
        res.status(statusCode).json({
        msg: err.message
        });
    });


    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

module.exports = app;
