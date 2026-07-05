import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { visitsRouter } from "./routes/visits";

export const app = express();

app.set("trust proxy", true);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.frontendOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS"));
    },
  }),
);
app.use(express.json({ limit: "10kb" }));

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.get("/", (_request, response) => {
  response.json({
    ok: true,
    service: "portfolio-traffic-backend",
    endpoints: ["/health", "/api/visits"],
  });
});

app.use("/api/visits", visitsRouter);

app.use(
  (
    error: Error,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    if (env.nodeEnv !== "production") {
      console.error(error);
    }

    response.status(500).json({ error: "Internal server error" });
  },
);
