import { httpRouter } from "convex/server";
import { auth } from "./auth";

const http = httpRouter();

// Mounts /api/auth/* routes used by Convex Auth.
auth.addHttpRoutes(http);

export default http;
