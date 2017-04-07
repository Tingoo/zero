/**
 * Created by niki_ty on 2017/3/24.
 */
/*网页加载时调用*/
window.onload = function(){
    new zero().init();
};
var zero = function(config){
    this.config = Object.assign({},config);
    /*about zero*/
    this.nav = document.getElementById("Desktop_nav");
    this.menu = document.getElementById("menu_flexd");
};
zero.prototype = {
    init : function(){
        var that = this;

        //导航栏点击事件
        that.nav.addEventListener('click',function(e){
            if(e.target.nodeName.toLocaleLowerCase() === 'a'){
                var others = document.getElementsByClassName("menuChecked");
                /*排除其他已选择的菜单*/
                while(others.length>0){//此处others是类数组，每当移除一个元素该元素从数组中消失，因此使用实时other.length,且一直移除第一个元素
                    others[0].classList.remove('menuChecked');
                }
                e.target.className = 'menuChecked';
            }
        });
        //导航栏显隐
        window.onscroll = function(){
            var top1 = 100,
                top2 = document.body.scrollTop || document.documentElement.scrollTop;
            if(top1<top2){
                that.menu.style="opacity: 0.8;transition: 0.5s;z-index: 99;top:0"
            }else {
                that.menu.style="opacity: 0;transition: 0.5s;z-index: -1;top:-100px"
            }
            top1 = top2;
        };
        //main_a2添加鼠标滚动事件
        $('.main_a2').hover(function(){ //closest获得匹配选择器的第一个祖先元素
            /*$('.theCard_container_first').css('opacity',' 1').css('transform',' matrix(1, 0, 0, 1, 0, 0)');*/
            $('.theCard_container_first').addClass("showTheCard");
        });
        $('.theCard_intro_two').hover(function(){ //closest获得匹配选择器的第一个祖先元素
            /*$('.theCard_container_first').css('opacity',' 0').css('transform',' matrix(1, 0, 0, 1, -50, -50)').css('transition-duration','0s').css('transition-delay','0s');*/
            $('.theCard_container_first').removeClass('showTheCard');
        })
    }
};