import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "./types";

const prisma = new PrismaClient();

const getLevelByExp = (exp: number) => {
  let level = 1;
  while (exp >= level * 100) {
    exp -= level * 100;
    level++;
  }
  return level;
};

const getUpdatedLevelAndExp = (currentExp: number, expIncrement: number) => {
  const updatedExp = currentExp + expIncrement;
  const updatedLevel = getLevelByExp(updatedExp);
  return { updatedLevel, updatedExp };
};

const getById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return result;
};

const getByEmail = async (email: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return result;
};

const create = async (name: string, email: string, passwordHash: string): Promise<User> => {
  const user: Prisma.UserCreateInput = {
    name: name,
    email: email,
    passwordHash: passwordHash,
  };
  const result = await prisma.user.create({ data: user });
  return result;
};

const update = async (id: string, name: string): Promise<User> => {
  const user: Prisma.UserUpdateInput = {
    name: name,
  };
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: user,
  });
  return result;
};

const updateExp = async (id: string, expIncrement: number): Promise<User> => {
  const user = await getById(id);
  if (!user) {
    throw new Error("User not found");
  }
  const currentExp = user.exp;
  const { updatedLevel, updatedExp } = getUpdatedLevelAndExp(currentExp, expIncrement);
  const updatedUser: Prisma.UserUpdateInput = {
    exp: updatedExp,
    level: updatedLevel,
  };
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: updatedUser,
  });
  return result;
};

// const handlePrismaError = (err) => {
//   switch (err.code) {
//       case 'P2002':
//           // handling duplicate key errors
//           return new CustomError(`Duplicate field value: ${err.meta.target}`, 400);
//       case 'P2014':
//           // handling invalid id errors
//           return new CustomError(`Invalid ID: ${err.meta.target}`, 400);
//       case 'P2003':
//           // handling invalid data errors
//           return new CustomError(`Invalid input data: ${err.meta.target}`, 400);
//       default:
//           // handling all other errors
//           return new CustomError(`Something went wrong: ${err.message}`, 500);
//   }
// };

export const userModel = {
  getById,
  getByEmail,
  create,
  update,
  updateExp,
};
