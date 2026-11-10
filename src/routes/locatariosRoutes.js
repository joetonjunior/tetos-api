const { buscar, criar, editar, deletar} = require("../controllers/locatariosController");
const { validarDados } = require("../middelwares/locatariosMiddlewares");

const rotas = require("express").Router();

rotas.get("/",
    /*
      #swagger.tags = ['Locatários']
      #swagger.summary = 'Buscar'
      #swagger.description = 'Retorna a lista de locatários cadastrados'
      #swagger.responses[200] = {
          description: 'Lista de locatários retornada com sucesso',
          schema: [{
              id: '550e8400-e29b-41d4-a716-446655440000',
              nome: 'Maria da Silva',
              telefone: '11999999999',
              cpf_cnpj: '12345678900',
              createdAt: '2026-11-09T00:00:00.000Z',
              updatedAt: '2026-11-09T00:00:00.000Z'
          }]
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    buscar);

rotas.post("/",
    /*
      #swagger.tags = ['Locatários']
      #swagger.summary = 'Criar'
      #swagger.description = 'Cadastra um novo locatário'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Dados para criação do locatário',
          schema: {
              $nome: 'Maria da Silva',
              $telefone: '11999999999',
              $cpf_cnpj: '12345678900'
          }
      }
      #swagger.responses[200] = {
          description: 'Registro criado com sucesso',
          schema: {
              type: 'succes',
              description: 'Registro criado com sucesso.'
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos ou faltando'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    validarDados, criar);

rotas.put("/:id",
    /*
      #swagger.tags = ['Locatários']
      #swagger.summary = 'Editar'
      #swagger.description = 'Atualiza os dados de um locatário pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'UUID do locatário'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Campos do locatário que serão atualizados',
          schema: {
              nome: 'Maria da Silva',
              telefone: '11999999999',
              cpf_cnpj: '12345678900'
          }
      }
      #swagger.responses[200] = {
          description: 'Registro atualizado com sucesso',
          schema: {
              type: 'succes',
              description: 'Registro atualizado com sucesso.'
          }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos'
      }
      #swagger.responses[404] = {
          description: 'Registro não encontrado'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    validarDados, editar);

rotas.delete("/:id",
    /*
      #swagger.tags = ['Locatários']
      #swagger.summary = 'Deletar'
      #swagger.description = 'Remove um locatário pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'UUID do locatário que será removido'
      }
      #swagger.responses[200] = {
          description: 'Registro deletado com sucesso',
          schema: {
              type: 'succes',
              description: 'Registro deletado com sucesso.'
          }
      }
      #swagger.responses[404] = {
          description: 'Registro não encontrado'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    deletar);

module.exports = rotas;  