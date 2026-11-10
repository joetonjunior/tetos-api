const { buscar, criar, editar, deletar } = require("../controllers/historicoImovelController");
const { validarDados } = require("../middelwares/historicoImovelMiddlewares");

const routes = require("express").Router();

routes.get("/",
    /*
      #swagger.tags = ['Histórico de Imóveis']
      #swagger.summary = 'Buscar'
      #swagger.description = 'Retorna os históricos de imóveis cadastrados, incluindo os dados do imóvel e do locatário relacionados'
      #swagger.responses[200] = {
          description: 'Lista de históricos retornada com sucesso',
          schema: [{
              id: '550e8400-e29b-41d4-a716-446655440000',
              descricao: 'Locação residencial',
              data_entrada: '2026-01-01T00:00:00.000Z',
              data_saida: '2026-12-31T00:00:00.000Z',
              valor_aluguel: 1800,
              valor_iptu: 100,
              valor_condominio: 350,
              imovel_id: '550e8400-e29b-41d4-a716-446655440001',
              locatario_id: '550e8400-e29b-41d4-a716-446655440002',
              createdAt: '2026-11-09T00:00:00.000Z',
              updatedAt: '2026-11-09T00:00:00.000Z',
              imoveis: {},
              locatarios: {}
          }]
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    buscar);

routes.post("/",
    /*
      #swagger.tags = ['Histórico de Imóveis']
      #swagger.summary = 'Criar'
      #swagger.description = 'Cria um novo histórico de imóvel'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Dados para criação do histórico de imóvel',
          schema: {
              $descricao: 'Locação residencial',
              $data_entrada: '2026-01-01',
              $data_saida: '2026-12-31',
              valor_aluguel: 1800,
              valor_iptu: 100,
              valor_condominio: 350,
              $imovel_id: '550e8400-e29b-41d4-a716-446655440001',
              $locatario_id: '550e8400-e29b-41d4-a716-446655440002'
          }
      }
      #swagger.responses[201] = {
          description: 'Registro criado com sucesso',
          schema: { type: 'success', description: 'Registro criado com sucesso.' }
      }
      #swagger.responses[400] = {
          description: 'Dados inválidos ou faltando'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    validarDados, criar);

routes.put("/:id",
    /*
      #swagger.tags = ['Histórico de Imóveis']
      #swagger.summary = 'Editar'
      #swagger.description = 'Edita um histórico de imóvel existente pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'ID UUID do histórico de imóvel'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Novos dados do histórico de imóvel',
          schema: {
              $descricao: 'Locação residencial',
              $data_entrada: '2026-01-01',
              $data_saida: '2026-12-31',
              valor_aluguel: 1800,
              valor_iptu: 100,
              valor_condominio: 350,
              $imovel_id: '550e8400-e29b-41d4-a716-446655440001',
              $locatario_id: '550e8400-e29b-41d4-a716-446655440002'
          }
      }
      #swagger.responses[200] = {
          description: 'Registro atualizado com sucesso',
          schema: { type: 'success', description: 'Registro atualizado com sucesso.' }
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

routes.delete("/:id",
    /*
      #swagger.tags = ['Histórico de Imóveis']
      #swagger.summary = 'Deletar'
      #swagger.description = 'Remove um histórico de imóvel pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'ID UUID do histórico de imóvel que será deletado'
      }
      #swagger.responses[200] = {
          description: 'Registro deletado com sucesso',
          schema: { type: 'success', description: 'Registro deletado com sucesso.' }
      }
      #swagger.responses[404] = {
          description: 'Registro não encontrado'
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    deletar);

module.exports = routes;