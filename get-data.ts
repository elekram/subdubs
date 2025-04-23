import { Context } from '@oak/oak/context'
import sql from './db.js'
import { parse } from 'jsr:@std/csv'
import postgres from 'postgresjs'

interface ProcessessCsvData {
  AbsentTeacherCode: string
  AbsentTeacherSurname: string
  ReplacementTeacherCode: string
  ReplacmentTeacherSurname: string
  Period: string
  Class: string
  Date: string
}

export async function GetData(ctx: Context) {
  const result = await GetCsvData()

  if (result instanceof Error) {
    console.error(result)
    return ctx.response.body =
      `<div class="alert alert-danger" role="alert">No data found</div>`
  }

  if (result.length === 0) {
    console.log('No CSV data found')
    return ctx.response.body =
      `<div class="container-fluid no-data"><i class="bi bi-cloud-arrow-up"></i></div>`
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
  // console.log(d)

  const r = renderCsvData(d, rowsPerPage, currentPage, fileId, result[0].file_id)

  return ctx.response.body = r
}

function processCsvData(csvFile: postgres.Row[string]) {
  const decodedCsvFile = new TextDecoder().decode(csvFile)
  const parsedCsvFile = parse(decodedCsvFile, {
    skipFirstRow: true,
  })
  const processedCsvData: ProcessessCsvData[] = []
  // const duplicates: string[] = []
  const uniqueClasses: Set<string> = new Set()

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

    // const absentTeacherSurname = row['Absent'].split(',')[0]
    // const ReplacmentTeacherSurname = row['Substitute'].split(',')[0]
    if (uniqueClasses.has(`${row['Period'].slice(4)}.${row['Class']}`)) {
      continue
    }

    const period = `P${row['Period'].slice(4)}`

    if (row['Period'].slice(4).substring(0, 1) === 'L') {
      continue
    }

    if (row['Period'].slice(4).substring(0, 1) === 'R') {
      continue
    }

    processedCsvData.push({
      AbsentTeacherCode: row['Absent Code'],
      AbsentTeacherSurname: row['Absent'],
      ReplacementTeacherCode: row['Substitute Code'],
      ReplacmentTeacherSurname: row['Substitute'],
      Period: period,
      Class: row['Class'],
      Date: row['Date'],
    })

    uniqueClasses.add(`${row['Period'].slice(4)}.${row['Class']}`)
  }
  const sortedCsvData = processedCsvData.sort((a, b) => a.Period.localeCompare(b.Period))

  return sortedCsvData
}

function renderCsvData(
  csvData: ProcessessCsvData[],
  rowsPerPage: string,
  currentPage: string,
  clientFileId: string | null,
  serverFileId: postgres.Row[string],
) {
  let crntPage: number = +currentPage
  const rowsPPage: number = +rowsPerPage

  const totalPages = Math.ceil(csvData.length / rowsPPage)

  let startIndex = 0
  let endIndex = 0

  if (clientFileId === null || clientFileId === '0') {
    startIndex = 0
    endIndex = startIndex + rowsPPage
    crntPage = 1
  }

  if (clientFileId !== serverFileId) {
    startIndex = 0
    endIndex = startIndex + rowsPPage
    crntPage = 1
  }

  if (clientFileId === serverFileId) {
    startIndex = crntPage * rowsPPage
    endIndex = startIndex + rowsPPage

    if (endIndex < csvData.length) {
      crntPage++
    }

    if (endIndex >= csvData.length) {
      endIndex = csvData.length
      crntPage++
      serverFileId = '00000000-0000-0000-0000-000000000000'
    }
  }

  const paginatedData = csvData.slice(startIndex, endIndex)

  if (paginatedData.length === 0) {
    return `<div class="alert alert-danger" role="alert">No data found</div>`
  }

  let table = `<div class="container-fluid">`
  table += `<table class="table table-striped">`
  table += `<thead><tr class="fs-1">`
  table += `<th><i class="bi bi-clock" style="font-size: 2rem;"></i></th>`
  table += `<th>Class</th>`
  table += `<th colspan="2">Absent</th>`
  table += `<th colspan="2">Replacement`
  table +=
    `<span style="float:right;" class="badge text-bg-warning">${crntPage}/${totalPages}</span></th>`
  table += `</tr></thead>`

  for (const row of paginatedData) {
    table += `<tr class="fs-2"">`
    table += `<td>${row.Period}</td>`
    table += `<td>${row.Class}</td>`
    table += `<td class="table-danger">${row.AbsentTeacherCode}</td>`
    table += `<td class="table-danger">${row.AbsentTeacherSurname}</td>`
    table += `<td class="table-primary">${row.ReplacementTeacherCode}</td>`
    table += `<td class="table-primary">${row.ReplacmentTeacherSurname}</td>`
    table += `</tr>`
  }

  table += `</table>`
  table += `<input type="hidden" id="svr-page-count" value="${crntPage}">`
  table += `<input type="hidden" id="file-id" value="${serverFileId}">`
  table += `</div>`

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
