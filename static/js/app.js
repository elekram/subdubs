document.addEventListener('DOMContentLoaded', async () => {
  const tableRefresh = 10000
  const navbarRefresh = 30000

  fetchAndRenderSplash()
  await delay(5000)
  
  fetchNavBar(navbarRefresh)
  fetchTableData(tableRefresh)
})

async function fetchAndRenderSplash() {
  const container = document.getElementById('ajax-container-1');
  const data = await fetchData(`/get-splash`);
  container.innerHTML = data;

  render(data, container)
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchNavBar(renderSpeed) {

  const container = document.getElementById('ajax-container-1');
  container.innerHTML = ''

  const data = await fetchData(`/get-subs-navbar`);
  container.innerHTML = data;

  setTimeout(() => {
    fetchNavBar(renderSpeed);
  }, renderSpeed);
}



function fetchTableData(renderSpeed) {
  renderTable()

  setTimeout(() => {
    fetchTableData(renderSpeed);
  }, renderSpeed);
}

async function renderTable() {
  const windowHeight = window.innerHeight;
  const fixedNavHeight = 157.57;
  const fixedTableHeaderHeight = 72.6;
  const fixedTableRowHeight = 62.4;
  const padding = 50;

  const pageSize = Math.floor(
    (windowHeight - fixedNavHeight - fixedTableHeaderHeight - padding)
    / fixedTableRowHeight
  );

  let svrPageCount = 1
  if (document.getElementById('svr-page-count')) {
    svrPageCount = document.getElementById('svr-page-count').value
    console.log('server page count: ', svrPageCount)
  }

  let fileId = 0
  if (document.getElementById('file-id')) {
    fileId = document.getElementById('file-id').value
    console.log(fileId)
  }

  const container = document.getElementById('ajax-container-2');
  const d = await fetchData(`/get-data?pageSize=${pageSize}&currentPage=${svrPageCount}&fileId=${fileId}`);
  container.innerHTML = d;
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const r = await response.text();
    return new Promise((resolve, reject) => {
      if (r) {
        resolve(r)
      } else {
        reject(new Error('No data received'));
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}