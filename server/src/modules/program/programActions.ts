import type { RequestHandler } from "express";
import joi, { ValidationErrorItem } from "joi";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const programs = await programRepository.readAll();
    res.json(programs);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const insertId = Number.parseInt(req.params.id);
    const program = await programRepository.read(insertId);
    if (program == null) {
      res.sendStatus(404);
    } else {
      res.send(program);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const program = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };
    const affectedRows = await programRepository.update(program);

    if (affectedRows == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };
    const insert = await programRepository.create(newProgram);
    res.status(201).json({ insert });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);
    await programRepository.delete(programId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const programSchema = joi.object({
  title: joi.string().max(30).required(),
  synopsis: joi.string().max(255).required(),
  poster: joi.string().max(255).required(),
  country: joi.string().max(10).required(),
  year: joi.string().max(4).required(),
  category_id: joi.number().integer().required(),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = programSchema.validate(req.body, { abortEarly: false });
  if (!error) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

export default { browse, read, add, edit, destroy, validate };
