const path = require('path')
const { ipcRenderer } = require('electron')

const form = document.getElementById('image-form')
const slider = document.getElementById('slider')
const img = document.getElementById('img')

document.getElementById('output-path').innerText = path.join(__dirname, 'GIZ_output')

// 选择图片
form.addEventListener('submit', (e) => {
  e.preventDefault()
  // 获取图片路径
  const imgPath = img.files[0].path
  // 获取图片质量
  const quality = slider.value
  ipcRenderer.send('image:minimize', {
    imgPath,
    quality
  })
})

ipcRenderer.on('image:done', () => {
  M.toast({
    html: `图片质量已压缩至 ${slider.value}%`
  })
})
