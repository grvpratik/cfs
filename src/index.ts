import { fromHono } from "chanfana";
import { Env, Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import bot from "endpoints/bot";
import radium from "endpoints/radium";
import ai from "endpoints/ai";
import gemini from "endpoints/gemini";
import { cors } from 'hono/cors'

interface MyEnv extends Env {
  BOT_TOKEN: string;
  AI: any;
  GEMINI_API: string;
}
// Start a Hono app
const app = new Hono<{ Bindings: MyEnv }>()
app.use('/*', cors())

app.use(
  '/*',
  cors({
    origin: '*',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

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
app.get("/ai", ai)
app.post("/gemini", gemini)

app.get("/health", (c) => 
  c.text("OK")
);
// Export the Hono app
export default app;
