import * as Sentry from "@sentry/node";
import { env } from "./environment";

Sentry.init({
    dsn: env.SENTRY_DSN
})