import { prisma } from "../../db/db";
import { TagModel } from "../../model/tag/tag_model";
import { HttpError } from "../../pkg/httpError";

export const deleteTagService = async (inputDTO: { id: string }) => {
  return prisma.$transaction(async (tx) => {
    const model = new TagModel();

    const tag = await model.getById(inputDTO.id);
    if (tag === null) {
      throw new HttpError("タグが見つかりません", 404);
    }

    const result = await model.deleteByIdWithTx(inputDTO.id, tx);
    if (result === null) {
      throw new HttpError("タグの削除に失敗しました", 500);
    }

    return {
      name: result.name,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      userId: result.userId,
    };
  });
};
