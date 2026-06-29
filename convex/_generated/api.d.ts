/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as archive from "../archive.js";
import type * as assignments from "../assignments.js";
import type * as auth from "../auth.js";
import type * as email from "../email.js";
import type * as event from "../event.js";
import type * as giftExchange from "../giftExchange.js";
import type * as http from "../http.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_pin from "../lib/pin.js";
import type * as participants from "../participants.js";
import type * as seed from "../seed.js";
import type * as seedData from "../seedData.js";
import type * as tasks from "../tasks.js";
import type * as viewPlan from "../viewPlan.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  archive: typeof archive;
  assignments: typeof assignments;
  auth: typeof auth;
  email: typeof email;
  event: typeof event;
  giftExchange: typeof giftExchange;
  http: typeof http;
  "lib/auth": typeof lib_auth;
  "lib/pin": typeof lib_pin;
  participants: typeof participants;
  seed: typeof seed;
  seedData: typeof seedData;
  tasks: typeof tasks;
  viewPlan: typeof viewPlan;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
