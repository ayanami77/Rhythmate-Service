import { Request, Response } from "express";
import { generateToken, getUserIdFromToken, getUserIsAuthenticated } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { AuthRequest, UpdateLoginUserRequest } from "./request";
import { AuthResponse, GetLoginUserResponse, UpdateLoginUserResponse } from "./response";
import { authService, getLoginUserService, updateLoginUserService } from "../../service/user";

// 認証
export const authController = async (req: Request<{}, {}, AuthRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await authService(inputDTO);
    // jwtを生成し、クッキーにセットする
    const jwt = generateToken(outputDTO.id, outputDTO.email);
    res.cookie("access_token", jwt, {
      expires: new Date(Date.now() + 12 * 3600000),
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    const response: AuthResponse = { status: "ok" };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// 認可状態確認
export const authCheckController = async (req: Request, res: Response) => {
  try {
    const isAuthenticated = getUserIsAuthenticated(req.cookies.access_token || "");
    return res.status(200).json({ status: "ok", isAuthenticated: isAuthenticated });
  } catch {
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ログアウト
export const logoutController = async (req: Request, res: Response) => {
  res.cookie("access_token", "");
  res.sendStatus(204);
};

// ユーザー取得（条件付き）
export const getLoginUserController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { userId: userId };

  try {
    const outputDTO = await getLoginUserService(inputDTO);
    const response: GetLoginUserResponse = {
      status: "ok",
      name: outputDTO.name,
      email: outputDTO.email,
      exp: outputDTO.exp,
      level: outputDTO.level,
      imageUrl: outputDTO.imageUrl,
    };
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ユーザー情報更新（条件付き）
export const updateUserController = async (req: Request<{}, {}, UpdateLoginUserRequest>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = {
    userId: userId,
    name: req.body.name,
    imageBinary: req.body.image_binary,
  };

  try {
    const outputDTO = await updateLoginUserService(inputDTO);
    const response: UpdateLoginUserResponse = {
      status: "ok",
      name: outputDTO.name,
      email: outputDTO.email,
      exp: outputDTO.exp,
      level: outputDTO.level,
      imageUrl: outputDTO.imageUrl,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
