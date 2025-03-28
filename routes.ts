import { Router } from 'jsr:@oak/oak/router'
import { GetHome } from './home.ts'
import { GetSplash } from './splash.ts'
import { Admin } from './admin.ts'
// import { UploadCsv } from './upload-csv.ts'
const router = new Router()

router
  .get('/', (ctx) => {
    ctx.response.body = GetSplash()
  })
  .get('/ping', (ctx) => {
    ctx.response.body = 'pong'
  })
  .get('/home', (ctx) => {
    ctx.response.body = GetHome()
  })
  .get('/admin', (ctx) => {
    ctx.response.body = Admin()
  })
  .post('/upload-csv', async (ctx) => {
    // const theBody: Body = await ctx.request.body.formData()
    if (ctx.request.hasBody) {
      const body = await ctx.request.body.arrayBuffer()
      console.log(new TextDecoder().decode(body))
    }

    // const form: FormData = await theBody.formData()
    // const theFile: File = form.get('file') as File
    // const theBody = await ctx.request.body.formData()
    // // const file = theBody.
    // console.log(theBody)
    // // const form: FormData = await theBody.formData()
    // const theFile: File = theBody.get('attachments') as File
    // console.log(theFile)
    // const destPath = `${config.UPLOAD_PATH}${theFile.name}`
    // const fileData = await theFile.stream()
    // console.log(fileData)

    // response.body = `Uploaded file size: ${theFile.size}`
    ctx.response.body = 'submitted'
    // UploadCsv(ctx)
  })

export default router
