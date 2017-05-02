/**
 * Created by niki_ty on 2017/3/24.
 */
/*网页加载时调用*/


    var nav = document.getElementById("Desktop_nav");
    var menu = document.getElementById("menu_flexd");
    var svgCircle = document.getElementById('knob_info_svg');

    /*svg动画*/
    var svgDoc = null;
    var svgRoot = null;
    var trueCoords = null;//记录元素在视图中的实际坐标
    var GrabPoint = null;
    var backDrop = null;
    var DragTarget = null;//被拖动元素


    function init () {

        //导航栏点击事件
        nav.addEventListener('click', function (e) {
            if (e.target.nodeName.toLocaleLowerCase() === 'a') {
                var others = document.getElementsByClassName("menuChecked");
                /*排除其他已选择的菜单*/
                while (others.length > 0) {//此处others是类数组，每当移除一个元素该元素从数组中消失，因此使用实时other.length,且一直移除第一个元素
                    others[0].classList.remove('menuChecked');
                }
                e.target.className = 'menuChecked';
            }
        });
        //导航栏显隐
        window.onscroll = function () {
            var top1 = 100,
                top2 = document.body.scrollTop || document.documentElement.scrollTop;
            if (top1 < top2) {
                menu.style = "opacity: 0.8;transition: 0.5s;z-index: 99;top:0"
            } else {
                menu.style = "opacity: 0;transition: 0.5s;z-index: -1;top:-100px"
            }
            top1 = top2;
        };
        //main_a2添加鼠标滚动事件
        $('.main_a2').hover(function () { //closest获得匹配选择器的第一个祖先元素
            /*$('.theCard_container_first').css('opacity',' 1').css('transform',' matrix(1, 0, 0, 1, 0, 0)');*/
            $('.theCard_container_first').addClass("showTheCard");
        });
        $('.theCard_intro_two').hover(function () { //closest获得匹配选择器的第一个祖先元素
            /*$('.theCard_container_first').css('opacity',' 0').css('transform',' matrix(1, 0, 0, 1, -50, -50)').css('transition-duration','0s').css('transition-delay','0s');*/
            $('.theCard_container_first').removeClass('showTheCard');
        });
    }
function initLoad(evt){
    svgDoc = evt.target.ownerDocument;
    svgRoot = evt.target;
    /* 两个不显示的点*/
    trueCoords = svgRoot.createSVGPoint();
    GrabPoint = svgRoot.createSVGPoint();
    /* 透明背景层*/
    backDrop = svgDoc.getElementById('backDrop');
    /*作弊*/
    $('#knob_info_svg').hover(function(){
        setTimeout(function () {
            var getCirle1 = document.getElementById('circle1');
            /*getCirle1.setAttribute('transform','translate(310.267776489257812 14.267776489257812)');*/
            getCirle1.setAttribute('opacity','0');
            var getCirle11 = document.getElementById('circle11');
            getCirle11.setAttribute('opacity','1');
            var getCirle2 = document.getElementById('circle2');
            getCirle2.setAttribute('opacity','0');
            var getCirle22 = document.getElementById('circle22');
            getCirle22.setAttribute('opacity','1');
        },2000)
    });



}
/* 获得当前元素在视图中的坐标位置*/
function getTrueCoords(evt){
    var newScale = svgRoot.currentScale;//currentScale获得当前视图的伸缩比例
    var translation = svgRoot.currentTranslate;//currentTranslate获得当前视图的平移量
    trueCoords.x = (evt.clientX - translation.x) / newScale; //evt.clientX提供事件发生时应用客户端区域的水平坐标（与页面坐标不同）
    trueCoords.y = (evt.clientY - translation.y) / newScale;
}
/* 鼠标按下触发的事件*/
function Grab(evt){
    var targetElement = evt.target;//取得要拖动元素的object
    getTrueCoords(evt);
    if ("cir1" == targetElement.id || "cir2" == targetElement.id) {//两个半圆不能拖动
        DragTarget = null;//后续的拖动事件取消掉
        return;
    }
    if(targetElement != backDrop){
        DragTarget = targetElement;
    }
    DragTarget.parentNode.appendChild(DragTarget);//将要拖动的元素置于顶层
    DragTarget.setAttributeNS(null,'pointer-events','none');//取消被拖动元素鼠标接收事件

    var Matrix = DragTarget.getCTM();//获取当前SVG的坐标转换矩阵
    GrabPoint.x = trueCoords.x - Number(Matrix.e);//定义元素移动后在视图中的坐标
    GrabPoint.y = trueCoords.y - Number(Matrix.f);
}
/* 拖动鼠标触发的事件*/
function Drag(evt){
    getTrueCoords(evt);//获得当前元素在实际窗口坐标
    if (DragTarget) { //判断被拖动元素是否存在
        var newX = trueCoords.x - GrabPoint.x;
        var newY = trueCoords.y - GrabPoint.y;
        DragTarget.setAttributeNS(null, "transform", "translate(" + newX + "," + newY + ")");//设置元素的平移变化参数 实际效果就是被拖动的元素随着鼠标不断移动
    }
}

function Drop(evt){
    if(DragTarget){
        var targetElement = evt.target;
        DragTarget.setAttributeNS(null, "pointer-events", "all");//恢复要拖动元素鼠标接收事件
        DragTarget = null;
    }
}

init ();

