import { Context } from '@oak/oak/context'
import sql from './db.js'
import { parse } from 'jsr:@std/csv'
import postgres from 'postgresjs'

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

  const rowsPerPage = ctx.request.url.searchParams.get('pageSize')
  const currentPage = ctx.request.url.searchParams.get('currentPage')
  const fileId = ctx.request.url.searchParams.get('fileId')

  if (rowsPerPage === null || currentPage === null) {
    return ctx.response.body = {
      error: 'pageSize or currentPage is null',
    }
  }

  const d = processCsvData(result[0].file)
  console.log(d)

  const r = renderCsvData(d, rowsPerPage, currentPage, fileId)

  return ctx.response.body = r
}

interface ProcessessCsvData {
  AbsentTeacherCode: string
  AbsentTeacherSurname: string
  ReplacementTeacherCode: string
  ReplacmentTeacherSurname: string
  Class: string
  Date: string
}

function processCsvData(csvFile: postgres.Row[string]) {
  const decodedCsvFile = new TextDecoder().decode(csvFile)
  const parsedCsvFile = parse(decodedCsvFile, {
    skipFirstRow: true,
  })
  const processedCsvData: ProcessessCsvData[] = []

  for (const row of parsedCsvFile) {
    if (row['Substitute Code'].trim() === '-') {
      continue
    }

    if (row['Absent Code'].trim() === '-') {
      continue
    }

    if (row['Date'].trim() === '-') {
      continue
    }
    if (row['Class'].trim() === '-') {
      continue
    }

    const todaysDate = new Date().setHours(0, 0, 0, 0)
    const parsedDate = Date.parse(row.Date)
    const csvDate = new Date(parsedDate)

    // if (todaysDate !== csvDate.getTime()) continue

    const absentTeacherSurname = row['Absent'].split(',')[0]
    const ReplacmentTeacherSurname = row['Substitute'].split(',')[0]

    processedCsvData.push({
      AbsentTeacherCode: row['Absent Code'],
      AbsentTeacherSurname: row['Absent'],
      ReplacementTeacherCode: row['Substitute Code'],
      ReplacmentTeacherSurname: row['Substitute'],
      Class: row['Class'],
      Date: row['Date'],
    })
  }
  return processedCsvData
}

function renderCsvData(
  csvData: ProcessessCsvData[],
  rowsPerPage: string,
  currentPage: string,
  fileId: string | null,
) {
  const cp: number = +currentPage
  const rpp: number = +rowsPerPage

  const startIndex = (cp - 1) * rpp
  const endIndex = startIndex + rpp
  const totalPages = Math.ceil(csvData.length / rpp)

  const paginatedData = csvData.slice(startIndex, endIndex)

  console.log(startIndex, endIndex, totalPages)
  console.log(csvData.length)
  console.log(paginatedData.length)
  console.log(fileId)

  let table =
    `<div class="container-fluid"><table class="table table-striped"><thead><tr class="fs-1"><th>Class</th><th colspan="2">Absent</th><th colspan="2">Replacement</th></tr></thead>`
  for (const row of paginatedData) {
    table += `<tr class="fs-2"">`
    table += `<td>${row.Class}</td>`
    table += `<td class="table-danger">${row.AbsentTeacherCode}</td>`
    table += `<td class="table-danger">${row.AbsentTeacherSurname}</td>`
    table += `<td class="table-primary">${row.ReplacementTeacherCode}</td>`
    table += `<td class="table-primary">${row.ReplacmentTeacherSurname}</td>`
    table += `</tr>`
  }
  table += `</table><input type="hidden" id="svr-page-count" value="1"></div>`
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
