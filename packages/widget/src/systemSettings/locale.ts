import { requestWithCallbackId } from "../core/request";

export async function locale(): Promise<string> {
  return requestWithCallbackId("locale");
}
