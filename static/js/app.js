document.addEventListener('DOMContentLoaded', async () => {
  fetchAndRenderSplash()
  await delay(5000)
  fetchAndRenderSubsNav(30000);
  fetchAndRenderSubsTable(10000)
})

async function fetchAndRenderSplash() {
  const data = await fetchData(`/get-splash`);
  const container = document.getElementById('ajax-container-1');

  render(data, container)
}

async function fetchAndRenderSubsNav(refreshTime) {
  const data = await fetchData(`/get-subs-navbar`);
  const container = document.getElementById('ajax-container-1');
  render(data, container)

  setTimeout(() => {
    fetchAndRenderSubsNav(refreshTime);
  }, refreshTime);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAndRenderSubsTable(refreshTime) {
  const windowHeight = window.innerHeight;
  const fixedNavHeight = 157.57;
  const fixedTableHeaderHeight = 72.6;
  const fixedTableRowHeight = 62.4;
  const padding = 50;

  const pageSize = Math.floor(
    (windowHeight - fixedNavHeight - fixedTableHeaderHeight - padding)
    / fixedTableRowHeight
  );

  let svrPageCount = 0
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
  const data = await fetchData(`/get-data?pageSize=${pageSize}&currentPage=${svrPageCount}&fileId=${fileId}`);

  render(data, container)

  setTimeout(() => {
    fetchAndRenderSubsTable(pageSize, refreshTime);
  }, refreshTime);
}

function render(data, container) {
  container.innerHTML = ''
  container.innerHTML = data;
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