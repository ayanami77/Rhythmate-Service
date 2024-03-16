import { Request, Response } from "express";
import { AuthRequest, LoginRequest, SignupRequest, UpdateLoginUserRequest } from "./request";
import { AuthResponse, GetLoginUserResponse, LoginResponse, SignupResponse } from "./response";
import { signupService } from "../../service/user/signup_service";
import { loginService } from "../../service/user/login_service";
import { generateToken, getUserIdFromToken } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { getLoginUserService } from "../../service/user/get_login_user_service";
import { updateLoginUserService } from "../../service/user/update_login_user_service";
import { authService } from "../../service/user/auth_service";

// 認証
export const authController = async (req: Request<{}, {}, AuthRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await authService(inputDTO);
    // jwtを生成し、クッキーにセットする。
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

// サインアップ
export const signupController = async (req: Request<{}, {}, SignupRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await signupService(inputDTO);
    const response: SignupResponse = { status: "ok" };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ログイン
export const loginController = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await loginService(inputDTO);

    // jwtを生成し、クッキーにセットする。
    const jwt = generateToken(outputDTO.id, outputDTO.email);
    res.cookie("access_token", jwt, {
      expires: new Date(Date.now() + 12 * 3600000),
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const response: LoginResponse = { status: "ok" };

    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
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
    ...req.body,
  };

  try {
    const outputDTO = await updateLoginUserService(inputDTO);
    const response: GetLoginUserResponse = {
      status: "ok",
      name: outputDTO.name,
      email: outputDTO.email,
      exp: outputDTO.exp,
      level: outputDTO.level,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};
