import { Router } from "express";
import userRoutes from "./usersRoutes.js";
import chatRoutes from "./chatsRoutes.js";
const appRouter = Router();
appRouter.use("/user", userRoutes);
appRouter.use("/chat", chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map