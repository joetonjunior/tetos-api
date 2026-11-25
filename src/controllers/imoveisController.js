const PRISMA = require("../services");
const fs = require("fs");
const path = require("path");

const diretorioImagens = path.resolve(__dirname, "../../uploads/imoveis");

function obterCaminhoImagem(imagem) {
    const correspondencia = /^\/uploads\/imoveis\/([^/\\]+)$/.exec(imagem || "");
    if (!correspondencia) {
        return null;
    }

    const caminho = path.resolve(diretorioImagens, correspondencia[1]);
    return path.dirname(caminho) === diretorioImagens ? caminho : null;
}

async function buscar(req, res) {
    try {
         const query = {};
        const includeObj = {};

        if (req.query.manutencoes === "true") {
            includeObj.historico_manutecao = true;
        }

        if (req.query.historicos === "true") {
            includeObj.historico_imovel = true;
        }
        
        if (req.query.locatario === "true") {
            includeObj.locatarios = true;
        }

        if (req.query.tipo === "true") {
            includeObj.imoveis_tipo = true;
        }

        // Se houver pelo menos um relacionamento solicitado, adiciona o include na query
        if (Object.keys(includeObj).length > 0) {
            query.include = includeObj;
        }

        const linhas = await PRISMA.imoveis.findMany(query);
        res.json(linhas);
    } catch (error) {
        res.json({
            type: "error",
            description: error.message
        });
    }    
}


async function criar(req, res) {
    try {
        const dados = req.body;
        const arquivo = req.file;
        await PRISMA.imoveis.create({
            data: {
                ...dados,
                quartos: Number(dados.quartos),
                banheiros: Number(dados.banheiros),
                suites: Number(dados.suites),
                garagens: Number(dados.garagens),
                metragem: Number(dados.metragem),
                valor_aluguel: Number(dados.valor_aluguel),
                imagem: `/uploads/imoveis/${arquivo.filename}`
            }
        });

        res.json({
            type: "success",
            description: "Registro criado com sucesso."
        })
    } catch (error) {
        res.json({
            type: "error",
            description: error.message
        });
    }    
}

async function editar(req, res) {
    let atualizacaoConcluida = false;
    try {
        const dados = { ...req.body };
        const { id } = req.params;
        let imagemAntiga;

        const camposNumericosOpcionais = ["matricula", "garagens", "iptu", "valor_condominio"];
        for (const campo of [
            "matricula",
            "quartos",
            "banheiros",
            "suites",
            "garagens",
            "metragem",
            "valor_aluguel",
            "iptu",
            "valor_condominio"
        ]) {
            if (dados[campo] === "" && camposNumericosOpcionais.includes(campo)) {
                dados[campo] = null;
            } else if (dados[campo] !== undefined && dados[campo] !== null && dados[campo] !== "") {
                dados[campo] = Number(dados[campo]);
            }
        }

        for (const campo of ["complemento", "locatario_id"]) {
            if (dados[campo] === "") {
                dados[campo] = null;
            }
        }

        if (req.file) {
            const imovel = await PRISMA.imoveis.findUnique({
                where: { id },
                select: { imagem: true }
            });

            if (!imovel) {
                throw new Error("Imóvel não encontrado.");
            }

            imagemAntiga = imovel.imagem;
            dados.imagem = `/uploads/imoveis/${req.file.filename}`;
        }

        await PRISMA.imoveis.update({
            where: {
                id
            },
            data: dados
        });
        atualizacaoConcluida = true;

        if (req.file && imagemAntiga) {
            const caminhoImagemAntiga = obterCaminhoImagem(imagemAntiga);
            if (caminhoImagemAntiga && caminhoImagemAntiga !== req.file.path) {
                try {
                    await fs.promises.unlink(caminhoImagemAntiga);
                } catch (error) {
                    if (error.code !== "ENOENT") {
                        throw error;
                    }
                }
            }
        }

        res.json({
            type: "success",
            description: "Registro atualizado com sucesso."
        })
    } catch (error) {
        if (req.file && !atualizacaoConcluida) {
            try {
                await fs.promises.unlink(req.file.path);
            } catch (erroLimpeza) {
                if (erroLimpeza.code !== "ENOENT") {
                    error.message = `${error.message}; não foi possível remover a nova imagem: ${erroLimpeza.message}`;
                }
            }
        }

        res.json({
            type: "error",
            description: error.message
        });
    }    
}

async function deletar(req, res) {
    try {
      
        const { id } = req.params;
        await PRISMA.imoveis.delete({
            where: {
                id
            },
        });

        res.json({
            type: "success",
            description: "Registro deletado com sucesso."
        })
    } catch (error) {
        res.json({
            type: "error",
            description: error.message
        });
    }    
}


module.exports = {buscar, criar, editar, deletar};