document.addEventListener('DOMContentLoaded', async () => {
  const state = getState();

  const ajaxContainer = document.getElementById('ajax-container');
  const ajaxContainer2 = document.getElementById('ajax-container-2');
  const res = await fetchData('/home');
  const res2 = await fetchData('/get-data?pageSize=7&currentPage=1&fileId=0');

  ajaxContainer.innerHTML = res;
  ajaxContainer2.innerHTML = res2;

  state.initialPageLoad = false;
})

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

function getState() {
  return {
    "initialPageLoad": true
  }
}
