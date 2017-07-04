var Details = {
	init: function() {
		this.initParams();
		this.loadName();
		this.loadMenu();
		this.selectBtn();
		this.selectTab();
		this.loadcomsco();
		this.loadcard();
	}, 
	initParams: function() {
		var params = this.params;
		this.id = getQuery('id');
		
	},
	loadName: function() {
		$.get('https://mainsite-restapi.ele.me/shopping/restaurant/'+ this.id +'?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&latitude=22.533012&longitude=113.930475', function(data) {
			if(data ){
				var loadNames = template('loadName',{
					data: data
				});
				$('.header').append(loadNames);

				var loadFoots = template('loadFoot',{
					data: data
				});
				$('.footer').append(loadFoots);
			}
		});
	},
	loadMenu: function() {
		$.get('https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id='+this.id, function(data) {

			if(data) {
				var loadMenus = template('loadMenu',{
					data: data
				});
				$('.main-l').append(loadMenus);
				

				var contenta = template('product',{
					data: data
				});
				$('.product').append(contenta);
				$('.menubtn').eq(0).addClass('selectmenubtn');


				$('.menubtn').click(function() {
					$('.main-r').animate({
						'scrollTop':($('.title').eq($(this).index()).get(0).offsetTop-352)
					})
					
				});
				
			}

		});
		
	},
	selectBtn: function() {


		$('.main-l').on({

			click: function(){
				
				$(this).addClass('selectmenubtn').siblings().removeClass('selectmenubtn');

			},

		},'.menubtn')
	},
	selectTab: function() {
		$('.common').click(function() {
			$('.main').css('display', 'none');
			$('.mainc').css('display', 'flex');
			$('.products').removeClass('selectnow')
			$(this).addClass('selectnow');
			$('.selectline').css('left', 530);

		});
		$('.products').click(function() {
			$('.main').css('display', 'flex');
			$('.mainc').css('display', 'none');
			$('.common').removeClass('selectnow')
			$(this).addClass('selectnow');
			$('.selectline').css('left', 155);

		});
	},
	loadcomsco: function() {
		$.get('https://mainsite-restapi.ele.me/ugc/v2/restaurants/'+this.id+'/ratings/scores', function(data) {
			if(data){
				var loadcomscore = template('loadcomsco',{
					data:data
				});
				$('.commonscorea').append(loadcomscore);
			}
		});
	},
	loadcard: function() {
		$.get('https://mainsite-restapi.ele.me/ugc/v2/restaurants/'+this.id+'/ratings/tags', function(data) {
			/*optional stuff to do after success */
			console.log(data);
			if(data){
				var sloadcard = template('scard',{
					data: data
				});
				$('.comsele').append(sloadcard);
			}
		});
	}
}

$(function(){
	Details.init();
	
	
})





// 获取浏览器地址栏参数信息
function getQuery(name, url) {
    var u = url || location.search,
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        r = u.substr(u.indexOf("\?") + 1).match(reg);
    return r != null ? r[2] : "";
}