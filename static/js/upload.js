
const element = document.getElementById('formFile');
element.addEventListener('input', () => {
  console.log('The value is now ' + element.value);
})

element.addEventListener("change", updateFileText);

function updateFileText() {
  console.log('test')
  document.getElementById('fileLabel').innerHTML = element.files[0].name
}

// document.getElementById('chooseFile').addEventListener('click', triggerInput, false)

// console.log(element)

// function triggerInput() {
//   const e = new Event('input', {
//     'bubbles': true,
//     'cancelable': true
//   });

//   element.dispatchEvent(e);
// }
