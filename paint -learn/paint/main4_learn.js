// 更新配置数据
const updateCanvasOption = () => {
  ctx.strokeStyle = penColor;
  ctx.lineWidth = penThickness;
};

const init = () => {
  // mdn canvas
  window.canvas = e("#canvas");
  window.ctx = canvas.getContext("2d");
  // 设置画布宽高
  canvas.width = 700;
  canvas.height = 500;
  // 画笔颜色
  window.penColor = "#1abc9c";
  // 画笔大小
  window.penThickness = 4;
  // 是否画
  window.painting = false;
  updateCanvasOption();
};

const bindEventMove = () => {
  bindEvent(canvas, "mousemove", (event) => {
    // log('event', event)
    const x = event.offsetX;//鼠标相对于事件源x轴的位置
    const y = event.offsetY;
    if (painting) {
      // 移动并且画
      ctx.lineTo(x, y);//移
      ctx.stroke();//画
    } else {
      // 移动不画
      ctx.beginPath();//开始一条路径，或重置当前的路径
      ctx.moveTo(x, y);
    }
  });
};

const bindEventDown = () => {
  bindEvent(canvas, "mousedown", (event) => {
    painting = true;
  });
};

const bindEventUp = () => {
  bindEvent(canvas, "mouseup", (event) => {
    painting = false;
  });
};

const bindEventLeave = () => {
  bindEvent(canvas, "mouseleave", (event) => {
    painting = false;
  });
};

const bindEventPenThickness = () => {
  const bar = e(".thickness-bar");
  bindEvent(bar, "click", (event) => {
    let target = event.target;
    let className = "thickness";
    let active = "active";
    if (target.classList.contains(className)) {
      // 删除旧的
      let sel = `.${active}`;
      let activeEle = bar.querySelector(sel);
      activeEle.classList.toggle(active);
      // 添加新的
      target.classList.toggle(active);
      let thickness = target.dataset.thickness;
      log('thickness', typeof thickness, thickness)
      penThickness = int(thickness);
      updateCanvasOption();
    }
  });
};

const bindEventPenColor = () => {
  const bar = e(".color-bar");
  bindEvent(bar, "click", (event) => {
    let target = event.target;
    let className = "color";
    let active = "active";
    if (target.classList.contains(className)) {
      // 删除旧的
      let sel = `.${active}`;
      let activeEle = bar.querySelector(sel);
      activeEle.classList.toggle(active);
      // 添加新的
      target.classList.toggle(active);
      let color = target.dataset.color;
      penColor = color;
      updateCanvasOption();
    }
  });
};

const bindEventClear = () => {
  const btn = e(".tools-bar");
  bindEvent(btn, "click", (event) => {
    let target = event.target;
    let className = "button-clear";
    if (target.classList.contains(className)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });
};

const bindEventPhotograph = () => {
  const btn = e(".tools-bar");
  bindEvent(btn, "click", (event) => {
    let target = event.target;
    let className = "button-Photograph";
    if(target.classList.contains(className)) {
      ctx.drawImage(canvas, 0, 0, 700, 500, 0, 0, 700, 500);
      let el = document.createElement('a');
      el.href = canvas.toDataURL();
      el.download = 'img';
      const eve = new MouseEvent('click');
      el.dispatchEvent(eve);
    }
  });
};

const bindEventWipe = () => {
  const btn = e(".tools-bar");
  let using =false;
  bindEvent(btn, "click", (event) =>{
    let target = event.target;
    let className = "button-wipe";
    using = !using;
    console.log(using);
    if(target.classList.contains(className)&&using) {
      //橡皮使用中
      let color = "#FFFFFF";
      penColor = color;     
    }
    else { 
      //橡皮擦不在使用
      const bar = e(".color-bar");
      for(let i = 0; i<bar.children.length; i++) {
        let c = bar.children[i];
        if(c.classList.contains("active")) {
          //log(c);
          penColor = c.dataset.color;
        }
      }
    }
    //更新
    updateCanvasOption();
  });
};

const bindEvents = () => {
  bindEventMove();
  bindEventDown();
  bindEventUp();
  bindEventLeave();
  bindEventPenColor();
  bindEventPenThickness();
  bindEventClear();
  bindEventWipe();
  bindEventPhotograph();
};

const __main = () => {
  // 初始化数据
  init();
  // 绑定事件
  bindEvents();
};

__main();
