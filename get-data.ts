import { Context } from '@oak/oak/context'
import sql from './db.js'
import { parse } from 'jsr:@std/csv'

export async function GetData(ctx: Context) {
  const result = await GetCsvData()

  if (result instanceof Error) {
    console.error(result)
    return ctx.response.body = {
      error: result.message,
    }
  }

  if (result.length === 0) {
    console.log('No CSV data found')
    return ctx.response.body = {
      error: 'No CSV data found',
    }
  }

  const decodedCsvData = new TextDecoder().decode(result[0].file)
  const parsedCsvData = parse(decodedCsvData, {
    skipFirstRow: true,
  })

  const r = processCsvData(parsedCsvData)

  console.log(parsedCsvData)
  return ctx.response.body = r
}

function processCsvData(csvData: Record<string, string>[]) {
  let table =
    `<div class="container-fluid"><table class="table table-striped"><thead><tr><th>Class</th><th>Absent Teacher</th><th>Replacement Teacher</th></tr></thead>`
  for (const row of csvData) {
    const todaysDate = new Date().setHours(0, 0, 0, 0)
    const parsedDate = Date.parse(row.Date)
    const dailyOrgDate = new Date(parsedDate)
    table += `<tr>`
    table += `<td>this</td><td>dsadsa</td><td>shsin</td>`
    table += `</tr>`
  }
  table += `</table></div>`
  return table
}

async function GetCsvData() {
  try {
    return await sql`
    SELECT * FROM csv_files WHERE id=1
  `
  } catch (e) {
    console.error('retrieving CSV data failed - ', e)
    return new Error('retrieving CSV data failed - ' + e)
  }
}
