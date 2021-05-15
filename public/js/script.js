const copyBtn = document.querySelector('#copy-btn')

copyBtn.addEventListener('click', (event) => {
  const copyText = document.querySelector('#copy-text')

  copyText.select()
  copyText.setSelectionRange(0, 99999)

  document.execCommand('copy')
})
