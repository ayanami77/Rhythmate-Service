import { tagModel } from '../../model/tag/tag_model';
import { CustomError } from '../../pkg/customError';

export const updateTagService = async (inputDTO:{
  id: string;
  name: string;
}) => {
  const model = tagModel;
  const tag = await model.getById(inputDTO.id);
  if(tag === null){
    throw new CustomError('タグが見つかりません', 404);
  }
  const result = await model.update(inputDTO.id, inputDTO.name, new Date());
  return {
    id : result.id,
    name: result.name,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    userId: result.userId,
  };
}