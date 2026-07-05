import { Router } from "express";
import { recordVisit } from "../services/visitService.js";
import { getClientIp, getUserAgent } from "../utils/request.js";

type VisitBody = {
  path?: unknown;
  referrer?: unknown;
};

export const visitsRouter = Router();

visitsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body as VisitBody;
    const stats = await recordVisit({
      ip: getClientIp(request),
      userAgent: getUserAgent(request),
      path: typeof body.path === "string" ? body.path.slice(0, 300) : "/",
      referrer:
        typeof body.referrer === "string" && body.referrer.length > 0
          ? body.referrer.slice(0, 500)
          : null,
    });

    response.status(201).json(stats);
  } catch (error) {
    next(error);
  }
});
