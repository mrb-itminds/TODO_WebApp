import { api } from "./api";
import { ExampleChildClient } from "./nswagts";

export const genExampleClient = (): Promise<ExampleChildClient> => api(ExampleChildClient);
