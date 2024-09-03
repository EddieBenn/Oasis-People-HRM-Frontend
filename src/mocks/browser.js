import { handlers } from "./handlers.js";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...handlers);
