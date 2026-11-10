const { buscar, criar, editar, deletar} = require("../controllers/imoveisTipoController");
const { validarDados } = require("../middelwares/imoveisTipoMiddlewares");

const rotas = require("express").Router();

rotas.get("/",
    /*
      #swagger.tags = ['Tipos de imóveis']
      #swagger.summary = 'Buscar'
      #swagger.description = 'Retorna um array de tipos de imóveis cadastrados'
      #swagger.responses[200] = {
          description: 'Lista de tipos de imóveis retornada com sucesso',
          schema: [{
              id: '550e8400-e29b-41d4-a716-446655440000',
              nome: 'Apartamento',
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
      #swagger.tags = ['Tipos de imóveis']
      #swagger.summary = 'Criar'
      #swagger.description = 'Cria um novo tipo de imóvel'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Dados para criação do tipo de imóvel',
          schema: {
              $nome: 'Apartamento'
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
      #swagger.tags = ['Tipos de imóveis']
      #swagger.summary = 'Editar'
      #swagger.description = 'Edita um tipo de imóvel existente pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'ID UUID do tipo de imóvel'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Novos dados do tipo de imóvel',
          schema: {
              $nome: 'Casa'
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
      #swagger.tags = ['Tipos de imóveis']
      #swagger.summary = 'Deletar'
      #swagger.description = 'Remove um tipo de imóvel pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'ID UUID do tipo de imóvel que será deletado'
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