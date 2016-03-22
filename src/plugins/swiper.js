export default (function () {

    function extend(target, source){
        for (var key in source){
            target[key] = source[key];
        }
        return target;
    }

    function getElement(expr) {
      return (typeof expr == 'string') ? document.querySelector(expr) : expr;
    }

    function noop(){}

    function Swiper(options){

        var me = this;

        me.default = {
            container: '.swiper', 
            item: '.item', 
            activeClass: 'active', 
            ratio: null,
            observer: true,
            autoplay: true,
            threshold: 50, 
            duration: 300,
            during: 3000,
            onSwiped: noop
        };

        me.options = extend(me.default, options);

        me.running = false;
        me.$container = getElement(me.options.container);
        me.$wrap = me.$container.parentNode;
        me.$items = me.$container.querySelectorAll(me.options.item);
        me.count = me.$items.length;

        me.init();
        window.addEventListener('resize', function(){
            me.init();
        })
        me.bindEvents();
    }

    Swiper.prototype.createDots = function(){
        if(!this.options.observer) return;
        var dotArr = [];
        var dotCon = document.createElement('div');
        dotCon.className = 'dotCon';
        for(var i = 0; i < this.count; i++){
            var dot = document.createElement('i');
            i == 0 ? dot.className = 'active' : null;
            dotArr[i] = dot;
            dotCon.appendChild(dot);
        }
        this.$wrap.appendChild(dotCon);
        this.dotArr = dotArr;
    }

    Swiper.prototype.activeDot = function(n){
        Array.prototype.forEach.call(this.dotArr, function(itm, i){
            i == n ? itm.className = 'active' : itm.className = '';
        });
    }

    Swiper.prototype.init = function(){

        var me = this;
        me.start = {};
        me.move = {};
        me.end = {};
        me.prev = 0;
        me.current = 0;
        me.offset = 0;
        me.goto = -1;
        me.eventHandlers = {};

        if(me.running){
            me.go(0);
            me.$container.removeAttribute('style');
            me.options.observer && me.activeDot(0);
        }else{
            me.createDots();
        }
        
        me.width = me.$wrap.offsetWidth;

        var width = me.width;
        me.$container.style.width = width * me.count + 'px';

        var ratio = me.options.ratio;
        if(ratio){
            me.$container.style.height =  width/ratio + 'px';
        } 

        Array.prototype.forEach.call(me.$items, function(el, key){
            el.style.width = width + 'px';
        });

        me.activate(0);
        me.options.autoplay && me.autoplay();
        me.running = true;
    };

    Swiper.prototype.bindEvents = function(){

        var me = this;

        this.$container.addEventListener('touchstart', function(e){
            me.start.x = e.changedTouches[0].pageX;
            me.$container.style['-webkit-transition'] = 'none';
            me.$container.style.transition = 'none';

        }, false);

        this.$container.addEventListener('touchmove', function(e){
            me.move.x = e.changedTouches[0].pageX;

            var distance = me.move.x - me.start.x;
            var transform = 'translate3d(' + (distance - me.offset) + 'px, 0, 0)';

            me.$container.style['-webkit-transform'] = transform;
            me.$container.style.transform = transform;

            e.preventDefault();

        }, false);

        this.$container.addEventListener('touchend', function (e){
            me.end.x = e.changedTouches[0].pageX;

            var distance = me.end.x - me.start.x;

            me.prev = me.current;
            if (distance > me.options.threshold) {
                me.current = me.current === 0 ? 0 : --me.current;
            } else if (distance < -me.options.threshold) {
                me.current = me.current < (me.count - 1) ? ++me.current : me.current;
            }

            me.show(me.current);

            me.options.observer && me.activeDot(me.current);

        }, false);

        this.$container.addEventListener('webkitTransitionEnd', function(e){
            if (e.target !== me.$container){
                return false;
            }
            if (me.current != me.prev || me.goto > -1){
                me.activate(me.current);
                me.options.observer && me.activeDot(me.current);
                var cb = me.eventHandlers.swiped || noop;
                cb.apply(me, [me.prev, me.current]);
                me.goto = -1;
            }
            e.preventDefault();
        }, false);
    };

    Swiper.prototype.show = function(index){
        this.offset = index * this.width;
        var transform = 'translate3d(-' + this.offset + 'px, 0, 0)';

        var duration = this.options.duration + 'ms';

        this.$container.style['-webkit-transition'] = duration;
        this.$container.style.transition = duration;
        this.$container.style['-webkit-transform'] = transform;
        this.$container.style.transform = transform;
    };

    Swiper.prototype.activate = function(index){
        var me = this;
        var claz = me.options.activeClass;
        Array.prototype.forEach.call(me.$items, function(el, key){
            el.classList.remove(claz);
            if (index === key) {
                el.classList.add(claz);
                me.options.onSwiped(key);
            }
        });
    };

    Swiper.prototype.go = function(index){
        if(index < 0 || index > this.count - 1 || index === this.current){
            return;
        }
        
        if(index === 0) {
            this.current = 0;
            this.prev = 0;
        }else{
            this.current = index;
            this.prev = index - 1;
        }

        this.goto = index;
        this.show(this.current);

        return this;
    };

    Swiper.prototype.next = function(){
        if(this.current >= this.count - 1){
            return;
        }
        this.prev = this.current;
        this.show(++this.current);
        return this;
    };

    Swiper.prototype.on = function(event, callback){
        if(this.eventHandlers[event]){
            throw new Error('event ' + event + ' is already register');
        }
        if(typeof callback !== 'function'){
            throw new Error('parameter callback must be a function');
        }

        this.eventHandlers[event] = callback;

        return this;
    };

    Swiper.prototype.autoplay = function(){
        var me = this;
        var wrap = me.$wrap;
        var flip = function(){
            me.playTimer && clearTimeout(me.playTimer);
            me.playTimer = setTimeout(function(){
                me.current + 2 > me.count ? me.go(0) : me.next();
                flip();
            }, me.options.during)
        };
        flip();
        wrap.addEventListener('touchstart', function(){
            clearTimeout(me.playTimer);
        }, false);
        wrap.addEventListener('touchend', function(){
            flip();
        }, false)
    }

    Swiper.prototype.stop = function(){
        clearTimeout(this.playTimer);
    }

    return Swiper 

})()