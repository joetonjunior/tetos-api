const { buscar, criar, editar, deletar} = require("../controllers/usuariosController");

const rotas = require("express").Router();

rotas.get("/",
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Buscar'
      #swagger.description = 'Retorna a lista de usuários cadastrados sem expor as senhas'
      #swagger.responses[200] = {
          description: 'Lista de usuários retornada com sucesso',
          schema: [{
              id: '550e8400-e29b-41d4-a716-446655440000',
              nome: 'Maria da Silva',
              email: 'maria@example.com',
              nivel_id: '550e8400-e29b-41d4-a716-446655440001',
              createdAt: '2026-11-09T00:00:00.000Z',
              updatedAt: '2026-11-09T00:00:00.000Z',
              nivel: {
                  nome: 'Admin'
              }
          }]
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    buscar);

rotas.post("/",
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Criar'
      #swagger.description = 'Cadastra um novo usuário; a senha é armazenada com hash'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Dados para criação do usuário',
          schema: {
              $nome: 'Maria da Silva',
              $email: 'maria@example.com',
              $senha: 'senha-segura',
              $nivel_id: '550e8400-e29b-41d4-a716-446655440001'
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
    criar);

rotas.put("/:id",
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Editar'
      #swagger.description = 'Atualiza os dados de um usuário pelo ID; se informada, a senha é armazenada com hash'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'UUID do usuário'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Campos do usuário que serão atualizados',
          schema: {
              nome: 'Maria da Silva',
              email: 'maria@example.com',
              senha: 'nova-senha-segura',
              nivel_id: '550e8400-e29b-41d4-a716-446655440001'
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
    editar);

rotas.delete("/:id",
    /*
      #swagger.tags = ['Usuários']
      #swagger.summary = 'Deletar'
      #swagger.description = 'Remove um usuário pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'UUID do usuário que será removido'
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