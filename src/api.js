import express, { response } from 'express'
import cors from 'cors'

let PORT = 8080

let nomeProduto
let precoProduto
let nomeProdutoAtualizar
let listaProdutos = [];

const app = express();
app.use(cors())

app.use(express.json());

//---------------------CRIAR ROTA---(POST)---------------------------//
app.post('/criar-produto', (req, res) => {
    try {
        const { nomeProduto, precoProduto } = req.body;
        
        if (!nomeProduto) {
            return res.status(400).send({ message: 'Nome inválido! Informe o nome.' });
        }

        if (!precoProduto || isNaN(precoProduto)) {
            return res.status(400).send({ message: 'Preço inválido! Informe um preço válido.' });
        }

        const novoProduto = {
            nomeProduto,
            precoProduto
        };

        listaProdutos.push(novoProduto);
        console.log(listaProdutos);
        res.status(201).send({ message: 'Produto criado com sucesso!', data: listaProdutos });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).send({ message: 'Erro interno no servidor.' });
    }
});



/*
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    if (nome && preco) {
        listaProdutos.push({ nomeProduto: nome, precoProduto: preco });
        res.status(201).json({ message: `Novo produto "${nome}" adicionado com sucesso por R$ ${preco}` });
    } else {
        res.status(400).json({ message: 'Erro: Nome e preço são obrigatórios!' });
    }
});
*/

//---------------------LER ROTA---(GET)-----------------------------//
app.post('/criar-produto', (req, res) => {
    const { nomeProduto, precoProduto } = req.body;
    try {
        if (!nomeProduto) {
            return res.status(400).send({ message: 'Nome inválido! Informe o nome!' });
        }
        if (!precoProduto) {
            return res.status(400).send({ message: 'Preço inválido! Informe o preço!' });
        }
        const novoProduto = {
            nomeProduto,
            precoProduto
        }
        listaProdutos.push(novoProduto);
        console.log(listaProdutos);
        res.status(201).send({ message: `Produto criado com sucesso!`, data: listaProdutos });
    } catch (error) {
        res.status(500).send({ message: 'Erro interno' });
    }
});

app.get('/produtos', (req, res) => {
    try {
        if (listaProdutos.length > 0) {
            res.status(200).json({ success: true, message: `Produtos retornados com sucesso.`, data: listaProdutos });
        } else {
            res.status(404).send({ message: `Lista vazia` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Erro interno' });
    }
});


/*
app.get('/produtos', (req, res) => {
    if (listaProdutos.length === 0) {
        res.status(404).json({ message: 'Estoque vazio. Cadastre produtos!' });
    } else {
        res.status(200).json(listaProdutos);
    }
});
*/


//---------------------ATUALIZAR ROTA---(PUT)-----------------------//
app.put('/produtos/:NomeDoProduto', (req, res) => {
    const nomeProdutoAtualizado = req.params.nomeProdutoAtualizado;
    const novoNomeProduto = req.body.nomeProduto;
    const novoPrecoProduto = req.body.precoProduto;

    try {
        const indiceProdutoBuscado = listaProdutos.findIndex((produto) =>
            produto.nomeProduto === nomeProdutoAtualizado
        );

        if (indiceProdutoBuscado === -1) {
            return res.status(404).send({ message: 'Produto não encontrado.' });
        }

        // Atualiza o produto com os novos valores
        listaProdutos[indiceProdutoBuscado].nomeProduto = novoNomeProduto;
        listaProdutos[indiceProdutoBuscado].precoProduto = novoPrecoProduto;

        res.status(200).send({ message: `Produto "${nomeProdutoAtualizado}" atualizado com sucesso.` });
    } catch (error) {
        res.status(500).send({ message: 'Erro interno' });
    }
});


/*
app.put('/produtos/:nomeProduto', (req, res) => {
    const nomeAtual = req.params.nomeProduto;
    const { novoNome, novoPreco } = req.body;
    let produtoEncontrado = listaProdutos.find(produto => produto.nomeProduto === nomeAtual);
    if (produtoEncontrado) {
        produtoEncontrado.nomeProduto = novoNome || produtoEncontrado.nomeProduto;
        produtoEncontrado.precoProduto = novoPreco || produtoEncontrado.precoProduto;
        res.status(200).json({ message: `Produto "${nomeAtual}" atualizado para "${novoNome}" por R$ ${novoPreco}` });
    } else {
        res.status(404).json({ message: `Produto "${nomeAtual}" não encontrado para atualização` });
    }
});
*/


//--------------------DELETAR ROTA---(DELETE)--------------------------//
app.delete('/produtos/:nomeProduto', (req, res) => {
    const nomeProdutoDeletado = req.params.nomeProduto;

    try {
        const indiceProdutoBuscado = listaProdutos.findIndex((produto) => 
            produto.nomeProduto === nomeProdutoDeletado
        );

        if (indiceProdutoBuscado === -1) {
            return res.status(404).send({ message: 'Produto não encontrado' });
        }

        listaProdutos.splice(indiceProdutoBuscado, 1);

        return res.status(200).send({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        return res.status(500).send({ message: 'Erro interno' });
    }
});





/*
app.delete('/produtos/:nomeProduto', (req, res) => {
    const nomeProduto = req.params.nomeProduto;
    let index = listaProdutos.findIndex(produto => produto.nomeProduto === nomeProduto);
    if (index !== -1) {
        listaProdutos.splice(index, 1);
        res.status(200).json({ message: `Produto "${nomeProduto}" deletado com sucesso` });
    } else {
        res.status(404).json({ message: `Produto "${nomeProduto}" não encontrado para exclusão` });
    }
});
*/

app.listen(PORT, () =>
    console.log(`Servidor iniciado na porta ${PORT}`));
