import { requestWithCallbackId } from "../core/request.js";

export async function locale(): Promise<string> {
  return requestWithCallbackId("locale");
}
