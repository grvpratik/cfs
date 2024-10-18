import { fromHono } from "chanfana";
import { Env, Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import bot from "endpoints/bot";
import radium from "endpoints/radium";
interface MyEnv extends Env {
  BOT_TOKEN: string;
}

// Start a Hono app
const app = new Hono<{ Bindings: MyEnv }>()

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

// Register OpenAPI endpoints
openapi.get("/api/tasks", TaskList);
openapi.post("/api/tasks", TaskCreate);
openapi.get("/api/tasks/:taskSlug", TaskFetch);
openapi.delete("/api/tasks/:taskSlug", TaskDelete);



// Register the bot route
app.post("/bot", bot);
app.post("/raydium", radium);
// Export the Hono app
export default app;
