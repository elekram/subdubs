import sql from './db.js'

export async function PostCsv(ctx: any) {
  if (!ctx.request.hasBody) {
    console.log('no body cuz')
  }
  const reqBody = await ctx.request.body.formData()
  for (const pair of reqBody.entries()) {
    const field = pair[0], val = pair[1]
    if (val instanceof File) {
      console.log('FILE =>', field, val)
      const f = val.name
      const destPath = `${Deno.cwd()}/uploads/${f}`
      const data = await val.arrayBuffer()

      await Deno.writeFile(`${destPath}`, await new Uint8Array(data))
      const csv = new TextDecoder().decode(data)
      console.log(csv)

      const res = await StoreCsv(f, new Uint8Array(data))
      console.log(res)
    } else {
      console.log('FIELD:', field, val)
    }
  }

  ctx.response.body = `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">File Uploaded Successfully!</h4>
  <p>The teacher subs file headers are valid and will be added to the board.</p>
  <hr>
  <p class="mb-0">You will be redirected in just a moment.</p>
</div>`
}

async function StoreCsv(fileName: string, data: Uint8Array) {
  const result = await sql`
    insert into csv_files
      (id, file_name, file)
    values
      (${1}, ${fileName}, ${data})
    ON CONFLICT (id) DO UPDATE
    SET file_name = ${fileName}, file = ${data}
    returning file_name, file
  `
  return result
}
