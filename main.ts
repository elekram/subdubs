import { Application } from 'jsr:@oak/oak/application'
import cfg from './config/config.ts'
import router from './routes.ts'

const app = new Application()
const appState = {
  hasDataRefreshed: false,
  currentPage: 1,
}

function functionRef() {
  appState.currentPage++
}

setTimeout(functionRef, 10)

app.use(async (ctx, next) => {
  ctx.state.appState = appState
  await next()
})

app.use(async (ctx, next) => {
  if (cfg.isDevEnv) {
    console.log(`${ctx.request.ip}:${ctx.request.method} ${ctx.request.url}`)
  }
  console.log(ctx.state.appState)
  await next()
})

app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `./static`,
      index: 'index.html',
    })
  } catch {
    await next()
  }
})

app.use(router.allowedMethods())
app.use(router.routes())

const port = cfg.port
const cert = await Deno.readTextFile(cfg.cert)
const key = await Deno.readTextFile(cfg.key)

console.log(`🔥 Server Running on Port:${port} 🏄‍♀️`)
app.listen({ port, cert, key })
