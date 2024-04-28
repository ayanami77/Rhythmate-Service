/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

/** WithRequired type helpers */
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export interface paths {
  "/users/auth": {
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["AuthRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["AuthResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/users/authenticated": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GetLoginUserResponse"];
          };
        };
        /** @description 認証エラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/users/logout": {
    post: {
      responses: {
        /** @description 成功 */
        200: {
          content: never;
        };
        /** @description 認証エラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/users/me": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GetLoginUserResponse"];
          };
        };
        /** @description 認証エラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    delete: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["DeleteUserResponse"];
          };
        };
        /** @description 認証エラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateLoginUserRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GetLoginUserResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        404: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ListQuestsResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["CreateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests/:id": {
    delete: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["DeleteQuestResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests/start/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests/finish/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests/force-finish/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/tags": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ListTagsResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["TagsCreateRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["TagsCreateResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/tags/:id": {
    delete: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["TagsDeleteResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["TagsCreateRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["TagsCreateResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/weeklyReports": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ListWeeklyReportResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/weeklyReports/feedback/:weeklyReportId": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GetWeeklyReportFeedBackResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    post: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GenerateWeeklyReportFeedBackResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/badges": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ListBadgeResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/badges/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["AchieveBadgeResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/badges/pin/:id": {
    patch: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["PinBadgeResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/badges/unpin/:id": {
    patch: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UnpinBadgeResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    ErrorResponse: {
      /** @example error */
      status: string;
      /** @example errorMsg */
      message: string;
    };
    AuthRequest: {
      id_token: string;
    };
    UpdateLoginUserRequest: {
      name: string;
      image_src: string;
    };
    AuthResponse: {
      status: string;
    };
    GetLoginUserResponse: {
      status: string;
      name: string;
      email: string;
      exp: number;
      level: number;
      imageUrl: string;
    };
    DeleteUserResponse: {
      status: string;
    };
    CreateQuestRequest: {
      title: string;
      description: string;
      starts_at: string;
      minutes: number;
      tag_id: string;
      difficulty: string;
      days: string[];
      /** @enum {string} */
      state: "INACTIVE" | "ACTIVE";
    };
    UpdateQuestRequest: {
      title: string;
      description: string;
      starts_at: string;
      started_at: string;
      minutes: number;
      tag_id: string;
      difficulty: string;
      state: string;
      is_succeeded: boolean;
      continuation_level: number;
      days: string[];
      weekly_completion_count: number;
      total_completion_count: number;
    };
    QuestBaseResponse: {
      id: string;
      title: string;
      description: string;
      starts_at: string;
      started_at: string;
      minutes: number;
      tag_id: string;
      difficulty: string;
      state: string;
      is_succeeded: boolean;
      days: string[];
      continuation_level: number;
      weekly_frequency: number;
      weekly_completion_count: number;
      total_completion_count: number;
    };
    CreateQuestResponse: WithRequired<
      components["schemas"]["QuestBaseResponse"] & {
        status?: string;
      },
      | "id"
      | "title"
      | "description"
      | "starts_at"
      | "started_at"
      | "minutes"
      | "tag_id"
      | "difficulty"
      | "state"
      | "is_succeeded"
      | "days"
      | "continuation_level"
      | "weekly_frequency"
      | "weekly_completion_count"
      | "total_completion_count"
    >;
    UpdateQuestResponse: WithRequired<
      components["schemas"]["QuestBaseResponse"] & {
        status?: string;
      },
      | "id"
      | "title"
      | "description"
      | "starts_at"
      | "started_at"
      | "minutes"
      | "tag_id"
      | "difficulty"
      | "state"
      | "is_succeeded"
      | "days"
      | "continuation_level"
      | "weekly_frequency"
      | "weekly_completion_count"
      | "total_completion_count"
    >;
    DeleteQuestResponse: {
      status: string;
    };
    ListQuestsResponse: {
      status: string;
      quests: components["schemas"]["QuestBaseResponse"][];
    };
    TagsCreateRequest: {
      /** @example TechStudy */
      name: string;
      /** @example Blue */
      color: string;
    };
    ListTagsResponse: {
      /**
       * @example [
       *   {
       *     "id": 1,
       *     "name": "TechStudy",
       *     "color": "Blue"
       *   },
       *   {
       *     "id": 2,
       *     "name": "EnglishStudy",
       *     "color": "Red"
       *   },
       *   {
       *     "id": 3,
       *     "name": "Health",
       *     "color": "Green"
       *   }
       * ]
       */
      tags: unknown[];
    };
    TagsCreateResponse: {
      /** @example ok */
      status: string;
    };
    TagsDeleteResponse: {
      /** @example ok */
      status: string;
    };
    ListWeeklyReportResponse: {
      status: string;
      weeklyReports: {
        id?: string;
        completed_quests?: number;
        failed_quests?: number;
        completed_percentage?: number;
        streak_days?: number;
        completed_quests_each_day?: number[];
        failed_quests_each_day?: number[];
        start_date?: string;
        end_date?: string;
        user_id?: string;
      }[];
    };
    GenerateWeeklyReportFeedBackResponse: {
      status: string;
      feedBack: string;
    };
    GetWeeklyReportFeedBackResponse: {
      status: string;
      feedBack: string;
    };
    BadgeBaseResponse: {
      badge_id: string;
      name: string;
      description: string;
      image_type: string;
      frame_color: string;
      obtained_at: string;
      is_pinned: boolean;
      unlockable: boolean;
    };
    AchieveBadgeResponse: components["schemas"]["BadgeBaseResponse"] & {
      status: string;
    };
    ListBadgeResponse: {
      status: string;
      badgesWithDetail: components["schemas"]["BadgeBaseResponse"][];
    };
    PinBadgeResponse: components["schemas"]["BadgeBaseResponse"] & {
      status: string;
    };
    UnpinBadgeResponse: components["schemas"]["BadgeBaseResponse"] & {
      status: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
