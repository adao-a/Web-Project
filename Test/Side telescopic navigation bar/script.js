function telescopic() {
    if(!document.getElementById) return false;
    if(!document.getElementById("btn1")) return false;
    var elem = document.getElementById("btn1");
    var falg = false;
    if(falg == false) { 
        elem.onclick = function () {
        moveElement("div2",100,0,10);
         }
         falg = true;
    } else {
        elem.onclick = function () {
            moveElement("div2",-100,0,10);
             }
    } 
}

addLoadEvent(telescopic);
function moveElement(element_ID,final_x,final_y,interval) {
    if(!document.getElementById) return false;
    if(!document.getElementById(element_ID)) return false;
    var elem = document.getElementById(element_ID);
    if(elem.movement) {//若已有movement，则用clearTimeout将其复位
        clearTimeout(elem.movement);
    }
    if(!elem.style.left) {
        elem.style.left = "0px";
    }
    if(!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if(xpos==final_x&&ypos==final_y) return true;
    // 不够德芙
    // if(xpos<final_x) xpos++;
    // if(xpos>final_x) xpos--;
    // if(ypos<final_y) ypos++;
    // if(ypos>final_y) ypos--;
    if(xpos<final_x) {
        //Math.ceil()向上取整
        dist = Math.ceil((final_x-xpos)/20)
        xpos +=dist;//每次移动距离的二十分之一
    }
    if(xpos>final_x) {
        dist = Math.ceil((xpos-final_x)/20)
        xpos -=dist;
    }
    if(ypos<final_y) {
        dist = Math.ceil((final_y-ypos)/20)
        ypos +=dist;
    }
    if(ypos>final_y) {
        dist = Math.ceil((ypos-final_y)/20)
        ypos -=dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+element_ID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}