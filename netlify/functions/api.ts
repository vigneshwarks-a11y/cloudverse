import serverless from "serverless-http";
import { createApp } from "../../server/app";

let cachedHandler:
  | ((event: any, context: any) => Promise<{ statusCode: number; body: string }>)
  | null = null;

async function getHandler() {
  if (cachedHandler) {
    return cachedHandler;
  }

  const { app } = await createApp();
  cachedHandler = serverless(app, {
    // Netlify expects binary responses to be base64 encoded.
    binary: [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ],
  });

  return cachedHandler;
}

export async function handler(event: any, context: any) {
  const resolvedHandler = await getHandler();
  return resolvedHandler(event, context);
}
