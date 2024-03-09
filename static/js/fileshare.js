let progress = document.querySelector('.progress');
let percent = document.querySelector('.percent');
let siteUrl = "https://" + window.location.host
let download_url = "https://" + window.location.host
const downloadBtn = document.querySelector('#codeBtn');



// setting filename code and percentage

document.querySelector('#file').addEventListener('change', (event) => {
  progress.style.width = "0" + "%";
  percent.innerText = "0" + "%";

  let filename = (event.target.files[0].name);
  document.querySelector('.fileName').innerText = filename;
  document.querySelector('.fileNameBox').style.display = 'block';
});

// sending file function and getting response 

function handleFormSubmit(event) {
  event.preventDefault();
  let file = document.querySelector('#form-data');
  let xhr = new XMLHttpRequest();
  xhr.open("POST", '/upload', true);
  xhr.upload.addEventListener('progress', (e) => {
    let percentage = ((e.loaded / e.total) * 100).toFixed(1);
    progress.style.width = percentage + "%"
    percent.innerText = percentage + "%";
  });
  xhr.onerror = function () {
    progress.style.width = "0" + "%";
    percent.innerText = "0" + "%";
    alert('failed to connect to the server');
  }
  xhr.onload = function () {
    if (xhr.status == 200) {
      let response = (JSON.parse(xhr.response));
      if (response.status === 'success') {
        let response_code = (response.message['link_code']);
        setDownloadCode(response_code)
        downloadBtn.removeAttribute('disabled');
        downloadBtn.classList.add('btn_active')
        document.querySelector('.responseArea').style.display = "block";
        document.querySelector('#url').innerText = siteUrl + "/dl/" + response_code;
        download_url = siteUrl + "/dl/" + response_code;
      } else {
        progress.style.width = "0" + "%";
        percent.innerText = "0" + "%";
        downloadBtn.setAttribute('disabled', true);
        downloadBtn.classList.remove('btn_active');
      }
    } else {
      progress.style.width = "0" + "%";
      percent.innerText = "0" + "%";
      downloadBtn.setAttribute('disabled', true);
      downloadBtn.classList.remove('btn_active');
    }
  }
  let formdata = new FormData(file);
  xhr.send(formdata);
}

//  get input text and download file
let inputBoxes = document.querySelectorAll('.inputBoxes input');

inputBoxes[0].focus();

inputBoxes.forEach((input, index) => {

  input.addEventListener('keyup', (e) => {
    let currentInput = input,
      nextInput = input.nextElementSibling,
      previousInput = input.previousElementSibling;
    if (!/^\d+$/.test(currentInput.value)) {
      currentInput.value = ""
    }
    if (nextInput && nextInput.hasAttribute('disabled') && currentInput.value !== "") {
      nextInput.removeAttribute('disabled', true);
      nextInput.focus();
    }

    if (e.key === 'Backspace') {
      inputBoxes.forEach((input, index1) => {
        if (previousInput && index <= index1) {
          currentInput.setAttribute('disabled', true);
          previousInput.focus();
          previousInput.value = ""
        }
      });
    }
    if (!inputBoxes[4].hasAttribute('disabled') && inputBoxes[4].value !== "") {
      inputBoxes[4].blur()
      downloadBtn.removeAttribute('disabled');
      downloadBtn.classList.add('btn_active');
      return;
    }
    downloadBtn.setAttribute('disabled', true);
    downloadBtn.classList.remove('btn_active');

  });
});

codeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let code = "";
  inputBoxes.forEach((input, index) => {
    code += input.value;
  });
  download_url = 'https://' + window.location.host + '/dl/' + code;
  window.location.href = download_url;
});

function setDownloadCode(code) {
  inputBoxes.forEach((input, index) => {
    input.value = code.charAt(index)
  });
}

function copyUrl(){
  if(navigator.clipboard){
    navigator.clipboard.writeText(download_url)
  }else{
    alert('allow clipboard to copy')
  }
}