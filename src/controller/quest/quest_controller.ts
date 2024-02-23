import { Request, Response } from "express";
import { CreateQuestRequest, UpdateQuestRequest } from "../quest/request";
import { CreateQuestResponse, DeleteQuestResponse, UpdateQuestResponse, GetQuestResponse } from "../quest/response";
import { verifyToken } from "../../utils/jwt";
import { createQuestService } from "../../service/quest/create_quest_service";
import { deleteQuestService } from "../../service/quest/delete_quest_service";
import { updateQuestService } from "../../service/quest/update_quest_service";
import { getQuestService } from "../../service/quest/get_quest_service";
import { CustomError } from "../../pkg/customError";
import { JwtPayload } from "jsonwebtoken";
import { Quest } from "../../model/quest/types";

// クエストの作成
export const createQuestController = async (req: Request<{}, {}, CreateQuestRequest>, res: Response) => {
    const decoded = verifyToken(req.cookies.access_token) as JwtPayload
    const inputDTO = {
        userId: decoded.userId,
        title: req.body.title,
        description: req.body.description,
        startsAt: req.body.starts_at,
        minutes: req.body.minutes,
        tagId: req.body.tag_id,
        difficulty: req.body.difficulty,
        dates: req.body.dates,
    };

    try {
        const outputDTO = await createQuestService(inputDTO);
        const response: CreateQuestResponse = {
            status: "ok",
            title: outputDTO.title,
            description: outputDTO.description,
            starts_at: outputDTO.startsAt,
            minutes: outputDTO.minutes,
            tag_id: outputDTO.tagId,
            difficulty: outputDTO.difficulty,
            is_done: outputDTO.isDone,
            start_date: outputDTO.startDate,
            end_date: outputDTO.endDate,
            dates: outputDTO.dates,
            weekly_frequency: outputDTO.weeklyFrequency,
            user_id: outputDTO.userId
        }
        return res.status(200).json(response)
    } catch (err) {

        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ status: "error", message: err.message })
        }
        return res.status(500).json({ status: "error", message: "Internal server error." })
    }
}

// クエストの削除
export const deleteQuestController = async (req: Request<{id : string}>, res: Response) => {
    const inputDTO = { id: req.params.id };
    try {
        const outputDTO = await deleteQuestService(inputDTO);
        const response: DeleteQuestResponse = { status: "ok" }
        return res.status(200).json(response)
    } catch (err) {

        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ status: "error", message: err.message })
        }
        return res.status(500).json({ status: "error", message: "Internal server error." })
    }
}

// クエストの更新
export const updateQuestController = async (req: Request<{id: string}, {}, UpdateQuestRequest>, res: Response) => {
    const decoded = verifyToken(req.cookies.access_token) as JwtPayload // decodeしたtokenを取得
    const inputDTO = { 
        id: req.params.id, 
        title: req.body.title,
        description: req.body.description,
        startsAt: req.body.starts_at,
        startedAt: req.body.started_at,
        minutes: req.body.minutes,
        tagId: req.body.tag_id,
        difficulty: req.body.difficulty,
        isDone: req.body.is_Done,
        startDate: req.body.start_date,
        endDate: req.body.end_date,
        dates: req.body.dates,
        weeklyCompletionCount: req.body.weekly_completion_count,
        userId : decoded.userId, 
    };

    try {
        const outputDTO = await updateQuestService(inputDTO);
        const response: UpdateQuestResponse = {
            status: "ok",
            title: outputDTO.title,
            description: outputDTO.description,
            starts_at: outputDTO.startsAt,
            minutes: outputDTO.minutes,
            tag_id: outputDTO.tagId,
            difficulty: outputDTO.difficulty,
            is_done: outputDTO.isDone,
            start_date: outputDTO.startDate,
            end_date: outputDTO.endDate,
            dates: outputDTO.dates,
            weekly_frequency: outputDTO.weeklyFrequency,
            weekly_completion_count: outputDTO.weeklyCompletionCount, 
            user_id: outputDTO.userId
        }
        return res.status(200).json(response)
    } catch (err) {

        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ status: "error", message: err.message })
        }
        return res.status(500).json({ status: "error", message: "Internal server error." })
    }
}

// ユーザーの所持するすべてのクエストを取得
export const getQuestController = async (req: Request, res: Response) => {
    const decoded = verifyToken(req.cookies.access_token) as JwtPayload
    const inputDTO = { userId: decoded.userId };
    try {
        const outputDTO = await getQuestService(inputDTO);
        const response: GetQuestResponse = {
            status: "ok",
            quests: outputDTO.quests?.map((quest: Quest) => { 
                return {
                    id: quest.id,
                    title: quest.title,
                    description: quest.description,
                    starts_at: quest.startsAt,
                    started_at: quest.startedAt,
                    minutes: quest.minutes,
                    tag_id: quest.tagId,
                    difficulty: quest.difficulty,
                    is_done: quest.isDone,
                    start_date: quest.startDate,
                    end_date: quest.endDate,
                    dates: quest.dates,
                    weekly_frequency: quest.weeklyFrequency,
                    weekly_completion_count: quest.weeklyCompletionCount,
                    user_id: quest.userId
                }
            })
        };
        return res.status(200).json(response);
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ status: "error", message: err.message })
        }
        return res.status(500).json({ status: "error", message: "Internal server error." })
    }
}