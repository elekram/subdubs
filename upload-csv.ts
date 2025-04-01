import sql from './db.js'

export async function UploadCsv(ctx: any) {
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

  ctx.response.body = 'submitted'
}

// async function StoreCsv(age: any) {
//   const users = await sql`
//     select
//       name,
//       age
//     from users
//     where age > ${age}
//   `
//   console.log(users)
//   // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
//   return users
// }

async function StoreCsv(fileName: string, csv: any) {
  const users = await sql`
    insert into CsvFiles
      (fileName, file)
    values
      (${fileName}, ${csv})
    returning fileName, file
  `
  return users
}
