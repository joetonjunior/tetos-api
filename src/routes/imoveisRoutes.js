const { buscar, criar, editar, deletar} = require("../controllers/imoveisController");
const { validarDados } = require("../middelwares/imoveisMiddlewares");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/imoveis')
    },
    filename: function (req, file, cb) {
        const extensao = path.extname(file.originalname);
        const nome = path.basename(file.originalname);
        cb(null, `${Date.now()}-${nome}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (_, file, callback) => {
        const tiposAceitos = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (!tiposAceitos.includes(file.mimetype)) {
            callback(new Error("Tipo de arquivo não permitido. Envie apenas imagens."));
            return;
        }
        callback(null, true);
    }
});

const rotas = require("express").Router();

rotas.get("/",
    /*
      #swagger.tags = ['Imóveis']
      #swagger.summary = 'Buscar'
      #swagger.description = 'Retorna a lista de imóveis cadastrados'
      #swagger.responses[200] = {
          description: 'Lista de imóveis retornada com sucesso',
          schema: [{
              id: '550e8400-e29b-41d4-a716-446655440000',
              matricula: 123,
              logradouro: 'Rua das Flores',
              bairro: 'Centro',
              cidade: 'São Paulo',
              estado: 'SP',
              numero: '100',
              complemento: 'Apto 12',
              cep: '01000-000',
              valor_aluguel: 2500,
              iptu: 100,
              valor_condominio: 500,
              metragem: 75,
              quartos: 2,
              suites: 1,
              banheiros: 2,
              garagens: 1,
              tipo_id: '550e8400-e29b-41d4-a716-446655440001',
              locatario_id: '550e8400-e29b-41d4-a716-446655440002',
              createdAt: '2026-11-09T00:00:00.000Z',
              updatedAt: '2026-11-09T00:00:00.000Z',
              imagem: '/uploads/imoveis/apartamento.jpeg'
          }]
      }
      #swagger.responses[500] = {
          description: 'Erro interno no servidor'
      }
    */
    buscar);

rotas.post("/",
    /*
      #swagger.tags = ['Imóveis']
      #swagger.summary = 'Criar'
      #swagger.description = 'Cadastra um imóvel e envia sua imagem (JPEG, PNG ou WebP, até 5 MB)'
      #swagger.consumes = ['multipart/form-data']
      #swagger.auto = false
      #swagger.parameters['authorization'] = { in: 'header', required: true, type: 'string', description: 'Token de autenticação Bearer' }
      #swagger.parameters['logradouro'] = { in: 'formData', required: true, type: 'string', description: 'Logradouro do imóvel (até 50 caracteres)' }
      #swagger.parameters['bairro'] = { in: 'formData', required: true, type: 'string', description: 'Bairro (até 50 caracteres)' }
      #swagger.parameters['cidade'] = { in: 'formData', required: true, type: 'string', description: 'Cidade (até 50 caracteres)' }
      #swagger.parameters['estado'] = { in: 'formData', required: true, type: 'string', description: 'UF com 2 caracteres' }
      #swagger.parameters['numero'] = { in: 'formData', required: true, type: 'string', description: 'Número do imóvel (até 15 caracteres)' }
      #swagger.parameters['cep'] = { in: 'formData', required: true, type: 'string', description: 'CEP (até 10 caracteres)' }
      #swagger.parameters['valor_aluguel'] = { in: 'formData', required: true, type: 'number', description: 'Valor do aluguel' }
      #swagger.parameters['metragem'] = { in: 'formData', required: true, type: 'number', description: 'Área do imóvel em metros quadrados' }
      #swagger.parameters['quartos'] = { in: 'formData', required: true, type: 'integer', description: 'Quantidade de quartos' }
      #swagger.parameters['suites'] = { in: 'formData', required: true, type: 'integer', description: 'Quantidade de suítes' }
      #swagger.parameters['banheiros'] = { in: 'formData', required: true, type: 'integer', description: 'Quantidade de banheiros' }
      #swagger.parameters['tipo_id'] = { in: 'formData', required: true, type: 'string', description: 'UUID do tipo de imóvel' }
      #swagger.parameters['matricula'] = { in: 'formData', type: 'integer', description: 'Matrícula do imóvel' }
      #swagger.parameters['complemento'] = { in: 'formData', type: 'string', description: 'Complemento (até 15 caracteres)' }
      #swagger.parameters['iptu'] = { in: 'formData', type: 'number', description: 'Valor do IPTU' }
      #swagger.parameters['valor_condominio'] = { in: 'formData', type: 'number', description: 'Valor do condomínio' }
      #swagger.parameters['garagens'] = { in: 'formData', type: 'integer', description: 'Quantidade de garagens' }
      #swagger.parameters['locatario_id'] = { in: 'formData', type: 'string', description: 'UUID do locatário' }
      #swagger.parameters['imagem'] = { in: 'formData', required: true, type: 'file', description: 'Arquivo da imagem do imóvel' }
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
      #swagger.responses[401] = {
          description: 'Token de autenticação ausente ou inválido'
      }
    */
    upload.single('imagem'), validarDados, criar);

rotas.put("/:id",
    /*
      #swagger.tags = ['Imóveis']
      #swagger.summary = 'Editar'
      #swagger.description = 'Atualiza os dados de um imóvel pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'UUID do imóvel'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'Campos do imóvel que serão atualizados',
          schema: {
              logradouro: 'Rua das Flores',
              bairro: 'Centro',
              cidade: 'São Paulo',
              estado: 'SP',
              numero: '100',
              cep: '01000-000',
              valor_aluguel: 2500,
              metragem: 75,
              quartos: 2,
              suites: 1,
              banheiros: 2,
              tipo_id: '550e8400-e29b-41d4-a716-446655440001'
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
      #swagger.tags = ['Imóveis']
      #swagger.summary = 'Deletar'
      #swagger.description = 'Remove um imóvel pelo ID'
      #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'string',
          description: 'UUID do imóvel que será removido'
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