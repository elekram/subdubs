import { Application } from 'jsr:@oak/oak/application'
import { Router } from 'jsr:@oak/oak/router'
import cfg from './config/config.ts'
import { GetHome } from './home.ts'

const router = new Router()
const app = new Application()

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get('X-Response-Time')
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

// Timing
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${ms}ms`)
})

app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `./static`,
    })
  } catch {
    await next()
  }
  await next()
})

router.get('/', (ctx) => {
  console.log(ctx.request.ip)
  ctx.response.body = GetHome()
})

app.use(router.allowedMethods())
app.use(router.routes())

const port = cfg.port
const cert = await Deno.readTextFile(cfg.cert)
const key = await Deno.readTextFile(cfg.key)

console.log(`Server running at http://localhost:${port}`)
app.listen({ port, cert, key })
