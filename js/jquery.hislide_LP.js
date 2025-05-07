
let queryTwo = window.matchMedia("(max-width:650px)");
// var slidess = document.querySelector('.hi-slide');
if(queryTwo.matches){
    (function($) {
        var slide = function(ele,options) {
            var $ele = $(ele);
            var setting = {
                speed: 500,
                interval: 2000,
                
            };
            $.extend(true, setting, options);
            var states = [
                { $zIndex: 0, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                { $zIndex: 1, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                { $zIndex: 2, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                { $zIndex: 3, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                { $zIndex: 4, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                { $zIndex: 5, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                { $zIndex: 6, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                { $zIndex: 7, width: 0, height: 150, top: 69, left: 400, $opacity: 0 },
                { $zIndex: 8, width: 0, height: 170, top: 59, left: 400, $opacity: 0 },
                { $zIndex: 9, width: 0, height: 0, top: 125, left: -200, $opacity: 1 },
                { $zIndex: 10, width: 211, height: 295, top: 0, left: 0, $opacity: 1 },
                { $zIndex: 9, width: 0, height: 0, top: 125, left: 368, $opacity: 1 },
                { $zIndex: 8, width: 0, height: 250, top: 0, left: 400, $opacity: 0.0 },
                { $zIndex: 7, width: 0, height: 150, top: 69, left: 400, $opacity: 0 },
                { $zIndex: 6, width: 0, height: 0, top: 79, left: 500, $opacity: 0 },
                { $zIndex: 5, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                { $zIndex: 4, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                { $zIndex: 3, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                { $zIndex: 2, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                { $zIndex: 1, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                { $zIndex: 0, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
            ];
    
            var $lis = $ele.find('li');
            var timer = null;
            const counter = document.getElementById('counter');
            const max = document.getElementById('max'); 
            let a = 1;
            // 事件
            $ele.find('.hi-next').on('click', function() {
                next();
            });
            $ele.find('.hi-prev').on('click', function() {
                states.push(states.shift());
                move();
                minus();
            });
            $ele.on('mouseenter', function() {
                clearInterval(timer);
                timer = null;
            }).on('mouseleave', function() {
                autoPlay();
            });
    
            move();


            function move() {
                $lis.each(function(index, element) {
                    var state = states[index];
                    $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
                });
            }
            function next() {
                states.unshift(states.pop());
                move();
                if(a < max.innerText){                    a++;
                    counter.innerText = a;
                }else{
                    a = 1;
                    counter.innerText = a;

                }
            }
    
            function autoPlay() {
                timer = setInterval(next, setting.interval);
            }
            function add(){
                if(a < max.innerText){                    a++;
                    counter.innerText = a;
                }else{
                    a = 1;
                    counter.innerText = a;

                }

            }
            function minus(){
                if(a < max.innerText, a > 1 ){                    a--;
                    counter.innerText = a;
                }else if (a <= 1){
                    a--;
                    a = max.innerText;
                    counter.innerText = a;

                }else{
                    a = 1
                    counter.innerText = a;
                }
            }
        }
        $.fn.hiSlide = function(options) {
            $(this).each(function(index, ele) {
                slide(ele,options);
            });
            return this;
        }
    })(jQuery);
}else{
    let query = window.matchMedia("(max-width:1110px)");
    if(query.matches){
        (function($) {
            var slide = function(ele,options) {
                var $ele = $(ele);
                var setting = {
                    speed: 500,
                    interval: 2000,
                    
                };
                $.extend(true, setting, options);
                var states = [
                    { $zIndex: 0, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 1, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 2, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 3, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 4, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 5, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 6, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 7, width: 0, height: 150, top: 69, left: 400, $opacity: 0 },
                    { $zIndex: 8, width: 0, height: 0, top: 59, left: 400, $opacity: 0 },
                    { $zIndex: 9, width: 0, height: 0, top: 125, left: -200, $opacity: 1 },
                    { $zIndex: 10, width: 211, height: 295, top: 0, left: 0, $opacity: 1 },
                    { $zIndex: 9, width: 211, height: 295, top: 0, left: 261, $opacity: 1 },
                    { $zIndex: 8, width: 0, height: 0, top: 125, left: 672, $opacity: 0.0 },
                    { $zIndex: 7, width: 0, height: 150, top: 69, left: 400, $opacity: 0 },
                    { $zIndex: 6, width: 0, height: 0, top: 79, left: 500, $opacity: 0 },
                    { $zIndex: 5, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 4, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 3, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 2, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 1, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 0, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },

                ];

                var $lis = $ele.find('li');
                var timer = null;
                const counter = document.getElementById('counter');
                const max = document.getElementById('max'); 
                let a = 1;
                // 事件
                $ele.find('.hi-next').on('click', function() {
                    next();
                });
                $ele.find('.hi-prev').on('click', function() {
                    states.push(states.shift());
                    move();
                    minus();
                });
                $ele.on('mouseenter', function() {
                    clearInterval(timer);
                    timer = null;
                }).on('mouseleave', function() {
                    autoPlay();
                });
        
                move();


                function move() {
                    $lis.each(function(index, element) {
                        var state = states[index];
                        $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
                    });
                }
                function next() {
                    states.unshift(states.pop());
                    move();
                    if(a < max.innerText){                    a++;
                        counter.innerText = a;
                    }else{
                        a = 1;
                        counter.innerText = a;

                    }
                }
        
                function autoPlay() {
                    timer = setInterval(next, setting.interval);
                }
                function add(){
                    if(a < max.innerText){                    a++;
                        counter.innerText = a;
                    }else{
                        a = 1;
                        counter.innerText = a;

                    }

                }
                function minus(){
                    if(a < max.innerText, a > 1 ){                    a--;
                        counter.innerText = a;
                    }else if (a <= 1){
                        a--;
                        a = max.innerText;
                        counter.innerText = a;

                    }else{
                        a = 1
                        counter.innerText = a;
                    }
                }
            }
            $.fn.hiSlide = function(options) {
                $(this).each(function(index, ele) {
                    slide(ele,options);
                });
                return this;
            }
        })(jQuery);
        
    }else{
        (function($) {
            var slide = function(ele,options) {
                var $ele = $(ele);
                var setting = {
                    speed: 500,
                    interval: 2000,
                    
                };
                $.extend(true, setting, options);
                var states = [
                    { $zIndex: 0, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 1, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 2, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 3, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 4, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 5, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 6, width: 0, height: 0, top: 79, left: 400, $opacity: 0 },
                    { $zIndex: 7, width: 0, height: 0, top: 69, left: 400, $opacity: 0 },
                    { $zIndex: 8, width: 0, height: 0, top: 198, left: -200, $opacity: 0.8 },
                    { $zIndex: 9, width: 200, height: 295, top: 25, left: 0, $opacity: 0.8 },
                    { $zIndex: 10, width: 281, height: 350, top: 0, left: 245, $opacity: 1 },
                    { $zIndex: 9, width: 200, height: 295, top: 25, left: 558, $opacity: 0.8 },
                    { $zIndex: 8, width: 0, height: 0, top: 198, left: 800, $opacity: 0.8 },
                    { $zIndex: 7, width: 0, height: 0, top: 69, left: 400, $opacity: 0 },
                    { $zIndex: 6, width: 0, height: 0, top: 79, left: 500, $opacity: 0 },
                    { $zIndex: 5, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 4, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 3, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 2, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 1, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },
                    { $zIndex: 0, width: 0, height: 0, top: 79, left: 700, $opacity: 0 },


                ];
                var $lis = $ele.find('li');
                var timer = null;
                const counter = document.getElementById('counter');
                const max = document.getElementById('max'); 
                let a = 1;
                // 事件
                $ele.find('.hi-next').on('click', function() {
                    next();
                });
                $ele.find('.hi-prev').on('click', function() {
                    states.push(states.shift());
                    move();
                    minus();
                });
                $ele.on('mouseenter', function() {
                    clearInterval(timer);
                    timer = null;
                }).on('mouseleave', function() {
                    autoPlay();
                });
        
                move();


                function move() {
                    $lis.each(function(index, element) {
                        var state = states[index];
                        $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
                    });
                }
                function next() {
                    states.unshift(states.pop());
                    move();
                    if(a < max.innerText){                    a++;
                        counter.innerText = a;
                    }else{
                        a = 1;
                        counter.innerText = a;

                    }
                }
        
                function autoPlay() {
                    timer = setInterval(next, setting.interval);
                }
                function add(){
                    if(a < max.innerText){                    a++;
                        counter.innerText = a;
                    }else{
                        a = 1;
                        counter.innerText = a;

                    }

                }
                function minus(){
                    if(a < max.innerText, a > 1 ){                    a--;
                        counter.innerText = a;
                    }else if (a <= 1){
                        a--;
                        a = max.innerText;
                        counter.innerText = a;

                    }else{
                        a = 1
                        counter.innerText = a;
                    }
                }
            }
            $.fn.hiSlide = function(options) {
                $(this).each(function(index, ele) {
                    slide(ele,options);
                });
                return this;
            }
        })(jQuery);
        
    }
}

