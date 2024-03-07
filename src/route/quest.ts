import { Router } from "express";
import {
  createQuestController,
  updateQuestController,
  deleteQuestController,
  listQuestsController,
  startQuestController,
  finishQuestController,
  forceFinishQuestController,
} from "../controller/quest/quest_controller";
import { body } from "express-validator";
import { validate } from "../pkg/validate";
import { auth } from "./middlewares/auth";

const questRouter = Router();

questRouter.post(
  "/",
  auth,
  validate([
    body("title").isString().isLength({ min: 1 }).withMessage("必須項目です。"),
    body("starts_at").isString().withMessage("必須項目です。"),
    body("minutes").isNumeric().withMessage("必須項目です。"),
    body("difficulty").isString().isLength({ min: 1 }).withMessage("必須項目です。"),
    body("dates").isArray().isLength({ min: 1 }).withMessage("１日以上選択してください。"),
  ]),
  createQuestController,
);
questRouter.get("/", auth, listQuestsController);
questRouter.delete("/:id", auth, deleteQuestController);
questRouter.patch("/:id", auth, updateQuestController);
questRouter.patch("/start/:id", auth, startQuestController);
questRouter.patch("/finish/:id", auth, finishQuestController);
questRouter.patch("/force-finish/:id", auth, forceFinishQuestController);
export { questRouter };
