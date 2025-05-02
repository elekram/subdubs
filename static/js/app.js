document.addEventListener('DOMContentLoaded', async () => {
  // fetchAndRenderSplash()
  // await delay(5000)

  const validModes = ['subs']

  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  console.log(searchParams.get('mode'));

  const mode = searchParams.get('mode')

  if (!mode || mode === 'subs' || !validModes.includes(mode)) {
    const tableRefresh = 10000
    const navbarRefresh = 30000
    fetchNavBar(navbarRefresh)
    fetchTableData(tableRefresh)

  }
  const resetPageDelay = 3600000
  resetPage(resetPageDelay)
})

async function fetchAndRenderSplash() {
  const container = document.getElementById('ajax-container-1');
  const data = await fetchData(`/get-splash`);

  if (!data) {
    networkError()
    return
  }

  container.innerHTML = data;
}

async function fetchNavBar(renderSpeed) {
  const container = document.getElementById('ajax-container-1');
  const data = await fetchData(`/get-subs-navbar`);

  if (!data) {
    networkError()
    return
  }

  if (document.getElementById('app-error').innerHTML !== '') {
    location.reload();
  }

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
  }

  let fileId = 0
  if (document.getElementById('file-id')) {
    fileId = document.getElementById('file-id').value
  }

  const container = document.getElementById('ajax-container-2');
  const data = await fetchData(`/get-data?pageSize=${pageSize}&currentPage=${svrPageCount}&fileId=${fileId}`);

  if (!data) {
    networkError()
    return
  }

  if (document.getElementById('app-error').innerHTML !== '') {
    location.reload();
  }

  container.innerHTML = data;
}

function networkError() {
  if (document.getElementById('app-error').innerHTML !== '') {
    return
  }
  document.getElementById('ajax-container-1').innerHTML = ''
  document.getElementById('ajax-container-2').innerHTML = ''

  const errHtml = `<div class="container-fluid center-cloud">🌐 😵</i></div>`
  document.getElementById('app-error').innerHTML = errHtml
}

async function resetPage(ms) {
  await delay(ms)
  location.reload();

  setTimeout(() => {
    resetPage(ms);
  }, ms);
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}