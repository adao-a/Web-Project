/*使用 localStorage 创建一个本地存储的 name/value 对，name="lastname" value="Smith", 
然后检索 "lastname" 的值，并插入到 id="result" 的元素上:
 localStorage.setItem("lastname",JSON.stringify(Smith));
 locaaStorage.getItem("lastname");
*/

var input = document.getElementById("input");
var list = document.getElementById("list");
var change = document.getElementsByClassName("clear");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST,id = 0; 

let data = localStorage.getItem("TODOLIST");
if(data) {  //parse方法将数据转换为 JavaScript 对象
    LIST = JSON.parse(data);
    id = LIST.length;
    loadlist(LIST);
}
else {
    LIST = [];
    id = 0;
}

//用于加载
function loadlist(array) {
    array.forEach(function(item){
        add(item.name, item.id, item.done, item.trash);
    });
}

function add(x, id, done, trash){
    if(trash) {
        return;
    }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}" contenteditable='true'>${x}</p>
                <i class="fa fa-trash-o done" job="delete" id="${id}"></i>
                </li>
                `;
     list.insertAdjacentHTML("beforeend", item); 
    }
input.onkeydown=function(e){
    if(e.keyCode == 13){ //keycode ==13 为回车键
        const x=input.value;
        if(x){
        add(x, id, false, false); 
        LIST.push({
            name: x,
            id: id,
            done: false,
            trash:false,
        });
        localStorage.setItem("TODOLIST",JSON.stringify(LIST));
        id++;
    }
        }
        input.value=" ";
    }

    function li_complete(element){
        
        //当存在类名时,取消此类名,当不存在时,添加此类名<即替换>
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

        LIST[element.id].done = LIST[element.id].done ? false : true;
    }   
    
    function li_dele(element){
        element.parentNode.parentNode.removeChild(element.parentNode);
        LIST[element.id].trash = true;
    }   
    

list.onclick = function(e){
    
    const element = e.target;//获取所点击的标签li的
    const elementjob = element.attributes.job.value;//获取li的属性的功能job

    //改变css样式
    if(elementjob =="complete"){
        li_complete(element);
    }
    else if(elementjob =="delete"){
        li_dele(element);
    }
    localStorage.setItem("TODOLIST",JSON.stringify(LIST));
}

/*----------------显示实时时间-----------------*/
var d = new Date();
//显示星期
var weekday = new Array(7);
    weekday[0]="星期日";
	weekday[1]="星期一";
	weekday[2]="星期二";
	weekday[3]="星期三";
	weekday[4]="星期四";
	weekday[5]="星期五";
	weekday[6]="星期六";
    var week = document.getElementById("weekday");
    //getDay()方法，返回一个数字(0~6);
    week.innerHTML=weekday[d.getDay()];
//显示日期
    var time = document.getElementById("time");
    //toLocaleDateString() 方法，根据本地时间把 Date 对象的日期部分转换为字符串:
    time.innerHTML = d.toLocaleDateString();

    /*----------------侧边导航栏-----------------*/
var aside = docuemnt.getElementById("aside");
function openaside(){
} 
function closeaside(){
    aside.style.display = "none";
}
