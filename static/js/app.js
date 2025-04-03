document.addEventListener('DOMContentLoaded', async () => {
  const state = getState();

  const ajaxContainer = document.getElementById('ajax-container');
  const res = await fetchData('/home');

  ajaxContainer.innerHTML = res;

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
