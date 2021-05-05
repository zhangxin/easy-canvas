const cavans = document.querySelector('#pannel')
// 获取渲染上下文
const context = cavans.getContext('2d')

// 获取橡皮和画笔
const eraser = document.querySelector('#eraser')
const pen = document.querySelector('#pen')

autoSetCavansSize(cavans)

listenToMouse(cavans)






function listenToMouse(cavans) {

  // 设置画笔和橡皮是否工作
  let isWorking = false
  let isEraserWorking = false

  eraser.addEventListener('click', () => {
    isEraserWorking = !isEraserWorking

    document.querySelector('.switch-stationery.toggle').classList.remove('toggle')
  })

  pen.addEventListener('click', () => {
    isEraserWorking = !isEraserWorking

    document.querySelector('.switch-stationery').classList.add('toggle')
  })


  // 设置画线或者橡皮擦的起点
  let oldPoint = { x: undefined, y: undefined }
  cavans.addEventListener('mousedown', (event) => {
    isWorking = true
    let x = event.clientX
    let y = event.clientY

    oldPoint.x = x
    oldPoint.y = y

    // 橡皮擦逻辑
    if (isEraserWorking) {
      context.clearRect(x - 8, y - 8, 10, 10)
    }

  })

  cavans.addEventListener('mousemove', (event) => {

    let x = event.clientX
    let y = event.clientY
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