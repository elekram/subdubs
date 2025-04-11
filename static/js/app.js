document.addEventListener('DOMContentLoaded', async () => {
  const renderSpeed = 5000;

  const windowHeight = window.innerHeight;
  const fixedNavHeight = 157.57;
  const fixedTableHeaderHeight = 72.6;
  const fixedTableRowHeight = 62.4;
  const padding = 50;

  const pageSize = Math.floor(
    (windowHeight - fixedNavHeight - fixedTableHeaderHeight - padding)
    / fixedTableRowHeight
  );

  const ajaxContainer = document.getElementById('ajax-container');
  const res = await fetchData('/home');
  ajaxContainer.innerHTML = res;

  fetchTableData(pageSize, renderSpeed)
})

function fetchTableData(pageSize, renderSpeed) {
  renderTable(pageSize)

  setTimeout(() => {
    fetchTableData(pageSize, renderSpeed);
  }, renderSpeed);
}

async function renderTable(pageSize) {
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