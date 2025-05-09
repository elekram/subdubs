import { Context } from '@oak/oak/context'
import * as uuid from 'jsr:@std/uuid'
import sql from '../../db/db.ts'
import cfg from '../../config/config.ts'

export async function PostSlideshow(ctx: Context) {
  if (!ctx.request.hasBody) {
    console.error('no form body')
  }

  const newUUID = uuid.v1.generate()

  const reqBody = await ctx.request.body.formData()

  // for (const pair of reqBody.entries()) {
  //   const field = pair[0]
  //   const value = pair[1]

  //   if (field !== 'passwordInput') continue

  //   if (value !== cfg.uploadKey) {
  //     return ctx.response.body = getErrorBody('Invalid Upload Key')
  //   }
  // }

  for (const pair of reqBody.entries()) {
    const slideShowName = 'Slideshow 1'
    const field = pair[0]
    const value = pair[1]

    console.log(field)
    console.log(value)

    if (value instanceof File) {
      const fileName = value.name
      const data = await value.arrayBuffer()
      console.log(fileName)
      console.log(data)
      console.log(new Uint8Array(data))
      const res = await storePhotos(
        fileName,
        new Uint8Array(data),
        slideShowName,
        newUUID,
      )

      if (res instanceof Error) {
        return ctx.response.body = getErrorBody(res.message)
      }
    }

    // if (field !== 'passwordInput') continue

    // if (value !== cfg.uploadKey) {
    //   return ctx.response.body = 'error mate'
    // }
  }
  return ctx.response.body = 'File uploaded successfully'
}

async function storePhotos(
  fileName: string,
  data: Uint8Array,
  slideShowName: string,
  uuid: string,
) {
  try {
    return await sql`
    insert into slideshow_files
      (slideshow_id, slideshow_name, file_name, file)
    values
      (${uuid}, ${slideShowName}, ${fileName}, ${data})
    RETURNING slideshow_id, slideshow_name, file_name, file
  `
  } catch (e) {
    console.error('Error storing CSV - ', e)
    return new Error('Error storing CSV - ' + e)
  }
}

function getErrorBody(error: string) {
  return `<div class="alert alert-danger" role="alert">
  <h4 class="alert-heading">File Upload Failed</h4>
  <p>${error}.</p>
  <p>Contact your systems administrator.</p>
  <hr>
  <p class="mb-0">You will be redirected in just a moment.</p>
</div>`
}
