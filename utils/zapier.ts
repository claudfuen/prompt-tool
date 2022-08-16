import axios from "axios";
import { ZapierWebhookKeys } from "../pages/api/zapier";

export async function callZapier(
  zapWebhookKey: ZapierWebhookKeys,
  data: unknown
) {
  try {
    await axios.post("/api/zapier", {
      zapWebhookKey,
      data,
    });
  } catch (error) {
    console.error(error);
  }
}
