import { Router } from 'jsr:@oak/oak/router'
import { GetHome } from './home.ts'
import { GetSplash } from './splash.ts'
import { Upload } from './upload.ts'
const router = new Router()

router.get('/ping', ({ response }) => {
  response.body = 'pong'
})

router
  .get('/', (ctx) => {
    ctx.response.body = GetSplash()
  })
  .get('/home', (ctx) => {
    ctx.response.body = GetHome()
  })
  .get('/upload', (ctx) => {
    ctx.response.body = Upload()
  })

export default router
