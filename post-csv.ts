import sql from './db.js'
import cfg from './config/config.ts'

export async function PostCsv(ctx: any) {
  if (!ctx.request.hasBody) {
    console.log('no body cuz')
  }
  const reqBody = await ctx.request.body.formData()

  for (const pair of reqBody.entries()) {
    const field = pair[0]
    const value = pair[1]

    if (field !== 'passwordInput') continue

    if (value !== cfg.uploadKey) {
      console.log('wrong password')
      return ctx.response.body = getErrorBody('Invalid Upload Key')
    }
  }

  for (const pair of reqBody.entries()) {
    const field = pair[0]
    const value = pair[1]

    if (field !== 'attachments') continue

    if (value instanceof File) {
      const fileName = value.name
      const data = await value.arrayBuffer()

      const res = await StoreCsv(fileName, new Uint8Array(data))
      console.log(res)

      if (res instanceof Error) {
        return ctx.response.body = getErrorBody(res.message)
      }

      return ctx.response.body = getSuccessBody('File uploaded successfully')
    }
  }

  return ctx.response.body = getErrorBody('Error uploading file')
}

async function StoreCsv(fileName: string, data: Uint8Array) {
  try {
    return await sql`
    insert into csv_files
      (id, file_name, file)
    values
      (${1}, ${fileName}, ${data})
    ON CONFLICT (id) DO UPDATE
    SET file_name = ${fileName}, file = ${data}
    returning file_name, file
  `
  } catch (e) {
    console.error('Error storing CSV - ', e)
    return new Error('Error storing CSV - ' + e)
  }
}

function getSuccessBody(s: string) {
  return `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">File Uploaded Successfully</h4>
  <p>${s}</p>
  <hr>
  <p class="mb-0">You will be redirected in just a moment.</p>
</div>`
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
