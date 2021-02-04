/* istanbul ignore file */
import fetch from "isomorphic-unfetch";
import isomorphicEnvSettings, { setEnvSettings } from "utils/envSettings";

// !NOTE: If you are having build errors with this file missing, the backend is required to be built first
import { AuthClient } from "./nswagts";

type BaseConstructor<T> = {
  new (
    configuration: AuthClient,
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ): T;
};

export const api = async <T, U extends BaseConstructor<T>>(Client: U): Promise<T> => {
  let envSettings = isomorphicEnvSettings();

  if (envSettings === null && process.browser) {
    envSettings = await fetch("/api/getEnv").then(res => res.json());
    setEnvSettings(envSettings);
  }
  if (envSettings === null && !process.browser) {
    throw new Error("Environment settings null on server");
  }

  const initilizedClient = new Client(
    new AuthClient(envSettings.backendToken),
    envSettings.backendUrl,
    {
      fetch
    }
  );

  return initilizedClient;
};
