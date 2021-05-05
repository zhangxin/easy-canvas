/***此处的 x y 均代表触摸或者点击处的坐标***/


const cavans = document.querySelector('#pannel')
// 获取渲染上下文
const context = cavans.getContext('2d')

// 获取橡皮和画笔
const eraser = document.querySelector('#eraser')
const pen = document.querySelector('#pen')

// 重置画布尺寸
autoSetCavansSize(cavans)

// 响应用户动作
listenToUser(cavans)


// 设置一些全局状态
let isWorking = false
let isEraserWorking = false
let oldPoint = { x: undefined, y: undefined }

function listenToUser(cavans) {

  // 设置画笔和橡皮是否工作

  eraser.addEventListener('click', () => {
    isEraserWorking = !isEraserWorking

    document.querySelector('.switch-stationery.toggle').classList.remove('toggle')
  })

  pen.addEventListener('click', () => {
    isEraserWorking = !isEraserWorking

    document.querySelector('.switch-stationery').classList.add('toggle')
  })

  // 设置起点

  if (document.ontouchstart !== undefined) {

    // 触屏设备逻辑
    cavans.addEventListener('touchstart', (event) => {

      let x = event.touches[0].clientX
      let y = event.touches[0].clientY

      clickOrTouch(x, y)
    })

    cavans.addEventListener('touchmove', (event) => {
      let x = event.touches[0].clientX
      let y = event.touches[0].clientY

      startDraw(x, y)
    })

    cavans.addEventListener('touchend', () => {
      isWorking = false
    })

  } else {
    // 非触屏设备逻辑
    // 设置画线或者橡皮擦的起点

    cavans.addEventListener('mousedown', (event) => {
      let x = event.clientX
      let y = event.clientY

      clickOrTouch(x, y)
    })
  }


  cavans.addEventListener('mousemove', (event) => {

    let x = event.clientX
    let y = event.clientY
    startDraw(x, y)

  })

  cavans.addEventListener('mouseup', () => {
    isWorking = false
  })

}


/******画板尺寸重置******/

function autoSetCavansSize(cavans) {
  function resizeCavans() {
    let deviceWidth = document.documentElement.clientWidth
    let deviceHeight = document.documentElement.clientHeight

    cavans.width = deviceWidth
    cavans.height = deviceHeight
  }

  // 设置画板全屏
  resizeCavans()
  window.onresize = function () {
    resizeCavans()
  }
}


/******画线函数******/
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)   // 起点
  context.lineTo(x2, y2);     // 终点
  context.stroke()
}


/***按下鼠标或触屏时逻辑***/

function clickOrTouch(x, y) {
  isWorking = true
  oldPoint.x = x
  oldPoint.y = y

  // 橡皮擦逻辑
  if (isEraserWorking) {
    context.clearRect(x - 8, y - 8, 10, 10)
  }
}

/***鼠标或手指移动的逻辑***/
function startDraw(x, y) {
  let newPoint = {
    x,
    y
  }

  if (isWorking) {
    if (isEraserWorking) {
      context.clearRect(x - 8, y - 8, 16, 16)
    } else {
      context.lineWidth = 5
      drawLine(oldPoint.x, oldPoint.y, newPoint.x, newPoint.y)
      oldPoint = newPoint
    }
  }
}

