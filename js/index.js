/*一、初始化fullpage组件*/
$(function(){
 "use strict";  
  /*1、哪个容器需要做全屏切换效果，就找到哪个容器
    2、设置每一个屏幕的背景颜色*/
	$('.container').fullpage({ 
	  //3、给fullpage配置一个对象，这个对象里面的属性就是fullpage参数，通过某一个配置参数来实现不同屏幕有不同的背景颜色
		sectionsColor:["#fadd67","#84a2d4","#ef674d","#ffeedd","#d04759","#84d9ed","#8ac060","#3E3098"],
	  //4、设置屏幕内容默认对齐方式；默认是垂直居中true；现在改成顶部对齐*/
		verticalCentered:false,
	  /*5、设置轮播图圆点显示--默认是不显示的false*/
		navigation:true,
		
		
	  /*6、第二屏动画--什么时候完全进入动画？afterLoad：当某个屏幕完全进入的时候
		 1、监听进入某一屏的时候--回掉函数,一个是链接，一个是索引*/
		afterLoad:function(link,index){  //index当前屏的序号，从1开始
			/*console.log(index); 当屏幕在切换的时候，index变了，证明afterLoad生效*/
			 /*2、当页面完全进入某一屏的时候，给当前屏加上now*/
			$('.section').eq(index-1).addClass('now');
		},
		/*7、点击“更多”切换下一页，最好在插件初始完毕或者插件渲染完毕后就可以*/
		afterRender:function(){ //绑定事件
			$('.more').on('click',function(){
				//切换下一页
				//插件的封装：$.fn.fullpage=function(){}，moveSectionDown向下滚动--插件里面有解释
				$.fn.fullpage.moveSectionDown(); 
			});	
			
		 /*10、监听第四屏购物车动画结束后，执行收货地址的动画*/
			$('.screen04 .cart').on('transitionend',function(){
				/*alert('过渡结束');*/
				$('.screen04 .address').show().find('img:last').fadeIn(1000);  //收获地址背景图片出现后，上面的文字在出现
				//11、设置收获地址上的文字显示完后，另外一排文字的显示
				$('.screen04 .text').addClass('show');  
			});	
			
		},
		
		/*8、当离开第二屏的时候给沙发做动画；离开某一个页面的时候触发--onLeave*/
		onLeave:function(index,nextIndex,direction){
				//从第二屏到第三屏的动画
				var currentSection=$('.section').eq(index-1); 
				if(index==2 && nextIndex==3){ 
				/*当前是为1个沙发做动画，要为多个元素做往下滚的动画，添加类*/
				currentSection.addClass('leaved');  
			}else if(index==3 && nextIndex==4){ //当沙发离开第三屏屏到第四屏时候的动画
					/*当前是从第三页到第四页*/ 
				currentSection.addClass('leaved');
				//当沙发离开第五屏屏到第六屏时候的动画
			 }else if(index==5 && nextIndex==6){ 
					/*当前是从第五页到第六页 
				currentSection.removeClass('now').addClass('leaved');*/
					currentSection.addClass('leaved');	
					$('.screen06 .box').addClass('show');  //给盒子添加类，让沙发和盒子一起做动画,通过添加的show控制动画
			 }else if(index==6 && nextIndex==7){ //当第六屏到第七屏的时候
						 /*当前是从第六页到第七页，星星的出现*/ 
						 $('.screen07 .star').addClass('show'); /*追加now，方便CS实现动画效果*/
						 $('.screen07 .text').addClass('show'); //定义星星出现后文字出现动画的类
						 $('.screen07 .star img').each(function(i,item){ //找到要做动画的星星做遍历
						 $(this).css('transition-delay',i*0.5+'s');//设置过渡的延迟,这里的单位是秒
						}); 
					 } /*判断结束*/
			
			
			/*11、第八屏功能*/
				/*1、手要跟着鼠标移动*/
					 $('.screen08').on('mousemove',function(e){ //第第八屏绑定鼠标移动事件
						 /*鼠标的坐标设置给手*/
						 $(this).find('.hand').css({ //this代表screen08
							 left: e.clientX-305,
							 top: e.clientY-130
						 }); 
					   }).find('.again').on('click',function(){ //给.again绑定点击事件
						 /*2、点击“在来一次”重置动画，并且跳回第一页*/
						 /*2-1、动画是怎么进行的
						   2-1-1、加now类
						   2-1-2、加leaved类
						   2-1-3、加show类*/
						   $('.now,.leaved,.show').removeClass('now').removeClass('leaved').removeClass('show');
						   /*2-1-4、加CSS属性  用jQuery加了CSS属性后果：会操作DOM，会加一个style的属性*/
						   $('.conten [style]').removeAttr('style');  //移除conten下面的style属性
						   /*2-1-5、用jQuery方法 show()函数、fadeIn()函数，后果：加一个style的属性*/
						
						 /*12、跳回第一页*/
						 $.fn.fullpage.moveTo(1);
				   }); 
		},
		/*9、当离开第二屏的时候给沙发做动画；和页面的滚动同步*/
		scrollingSpeed:1000 /*页面切换时间，默认是700毫秒*/
	});	
});