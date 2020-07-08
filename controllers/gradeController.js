import { db, gradesModel } from '../models/index.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  try {
    const grade = new gradesModel(req.body);
    await grade.save();
    res.send();
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  const allGrades = await gradesModel.find({condition});
  
  //condicao para o filtro no findAll
  var condition = name
  ? { name: { $regex: new RegExp(name), $options: 'i' } }
  : {};
  
  try {
    if(!name) res.send(allGrades)
    else res.send(await gradesModel.find(condition))

    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
 
  try {
    const grade = await gradesModel.findById({_id: _id});
    res.send(grade);

    logger.info(`GET /grade - ${_id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + _id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};


const update = async (req, res) => {
  const id = req.params.id;

    if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
 
  try {
    await gradesModel.findByIdAndUpdate(
      {_id: id},
      req.body,
      {new: true}
    )
    res.send({ message: 'Grade atualizado com sucesso' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }



};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await gradesModel.findByIdAndDelete({_id: id})
    res.send({ message: 'Grade excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    await gradesModel.remove({})
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
