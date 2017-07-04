var Index = {

    init:function() {
        this.load();
        this.loadMain();
        this.weather();
        this.hotword();
        this.getadd();
        this.backtop();
    },
    load: function() {

        $.get('https://mainsite-restapi.ele.me/shopping/v2/entries?latitude=22.54286&longitude=114.059563&templates[]=main_template ', function(data) {
            if(data) {
                var data = data[0].entries;
                var bannerSelect = template('banS',{
                    list: data
                });
                 var bannerSelectA = template('banSA',{
                    list: data
                });
                $('.banner-list-1').append(bannerSelect);
                $('.banner-list-2').append(bannerSelectA);
            }
                        
        });

    },
    loadMain: function() {
        $.get('https://mainsite-restapi.ele.me/shopping/restaurants?latitude=22.533012&longitude=113.930475&offset=0&limit=20&extras[]=activities&terminal=h5', function(data) {
            if(data){
                var business = template('busi',{
                    data: data
                });
                $('.main').append(business);
            }
        });
    },
    weather: function (){
        $.get('https://mainsite-restapi.ele.me/bgs/weather/current?latitude=22.52154&longitude=114.05498', function(data) {
            if(data){
                var weathernow = template('weat',{
                    data: data
                });
                $('.header-t-r').append(weathernow);
            }
            
        });
    },
    hotword: function(){
        $.get('https://mainsite-restapi.ele.me/shopping/v3/hot_search_words?latitude=22.52154&longitude=114.05498', function(data) {
            if(data){
                var hotwordnow = template('hotw',{
                    data: data
                });
                $('.header-b').append(hotwordnow);
            }
        });
    },
    getadd: function() {
        $.get('https://mainsite-restapi.ele.me/bgs/poi/reverse_geo_coding?latitude=22.533012&longitude=113.930475', function(data) {
            if(data){
                var addnow = template('addn',{
                    data: data
                });
                $('.header-t-l').append(addnow);
            }
        });
    },
    backtop: function(){
        $(window).scroll(function() {
            if($('html body').scrollTop() > 1077){
                $('.backtotop').css('display','flex')
            }else{
                $('.backtotop').fadeOut('slow');
            }

        });

        $('.backtotop').click(function(){
            $('html body').animate({
                'scrollTop':0
            })  
        })
    }

}

$(function() {
    Index.init();

})