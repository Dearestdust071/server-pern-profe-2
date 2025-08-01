// src/handlers/users.ts

import { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";
import User from "../models/Usuario.mo";

// CREATE user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).json({ data: user });
  } catch (err: any) {
    console.error(err);

    // Si choca por unique constraint en email o username
    if (err instanceof UniqueConstraintError) {
      return res.status(500).json({ error: "Email o usuario ya existe" });
    }

    return res.status(500).json({ error: "Error al crear usuario" });
  }
};

// GET all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      order: [["username", "ASC"]],
    });
    // Siempre devolvemos 200 con un array (incluso si está vacío)
    return res.status(200).json({ data: users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// GET user by ID
export const getUsersByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "No existe el usero" });
  }

  return res.status(200).json({ data: user });
};

// UPDATE user
export const updateUsersByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "No existe el usero" });
  }

  console.log(req.body);
  await user.update(req.body);
  return res.status(200).json({ data: user });
};

// DELETE user
export const deleteUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "No existe el usero" });
  }

  await user.destroy();
  return res.status(200).json({ data: user });
};

// PATCH availability
export const updateActive = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ error: "No existe el usero" });
  }

  user.isActive = !user.isActive;
  await user.save();
  return res.status(200).json({ data: user });
};
