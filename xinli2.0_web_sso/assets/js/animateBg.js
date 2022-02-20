$( document ).ready( function () {
	var totalImgs = 235;
	var prev = 1;
	var next = 1;
	var fps = 24;
	var element = document.querySelector( '.animationBg' );
	var imgs = [];
	for ( var index = 0; index <= totalImgs; index++ ) {
		var imgItem = "../assets/img/animationPng/bg_" + index + ".png";
		imgs.push(imgItem)
	}
	// 底圖背景加暗
	var overLayer = document.createElement( "div" );
	overLayer.className = 'overLayer';
	overLayer.style.background = "rgba(0,0,0,0.6)";
	overLayer.style.width = "100vw";
	overLayer.style.height = "100vh";
	overLayer.style.position = "absolute";
	overLayer.style.zIndex = "999";
	$( '.animationBg' ).append( overLayer );
	//图片预加载
	$.preload(imgs, {
		// 是否有序加载
		order: true,
		// minTimer: 1000,
		//每加载完一张执行的方法
		each: function ( count ) {
			var imgBg=document.createElement("div");
			imgBg.src = "../assets/img/animationPng/bg_" + count + ".png";
			imgBg.id = "bg_" + count;
			imgBg.className = 'bgImg';
			imgBg.style.backgroundImage = "url("+"../assets/img/animationPng/bg_"+count+".png"+")";
			imgBg.style.backgroundSize = "cover";
			imgBg.style.backgroundPosition = "center center";
			$('.animationBg').append(imgBg);
		},
		end: function () {
			window.requestAnimationFrame(step);
		}
	} );
	// 底圖loop 動畫
	function step () {
		prev = next;
		if ( next >= totalImgs ) { next = 1; } else { next += 1; };
		$('#bg_'+prev).css('opacity',0);
		$( '#bg_' + next ).css( 'opacity', 1 );
		setTimeout(() => { window.requestAnimationFrame(step) }, 1000 / fps);
	}
});