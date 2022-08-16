import { withSentry } from "@sentry/nextjs";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  error?: unknown;
};

const webhooks = {
  signUp: "https://hooks.zapier.com/hooks/catch/2352217/bge5o3a/",
  createProject: "https://hooks.zapier.com/hooks/catch/2352217/bgefy2s/",
  publishProject: "https://hooks.zapier.com/hooks/catch/2352217/bgekv84/",
  submitPromptToolFeedback:
    "https://hooks.zapier.com/hooks/catch/2352217/bqd5gb7/",
  soldNft: "https://hooks.zapier.com/hooks/catch/2352217/bl21fl9/",
};

export type ZapierWebhookKeys = keyof typeof webhooks;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const zapWebhookKey = req.body.zapWebhookKey as ZapierWebhookKeys;
  const data = req.body.data;

  try {
    await axios.post(webhooks[zapWebhookKey], data);
    res.status(200).json({ message: "Success" });
  } catch (error: unknown) {
    res.status(500).json({ message: "Error sending email", error: error });
  }
};

export default withSentry(handler);
