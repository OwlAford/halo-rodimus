;(function () {

    function Swiper(options) {
        this.version = '1.4.1';
        this._default = {container: '.swiper', item: '.item', direction: 'vertical', activeClass: 'active', threshold: 50, duration: 300};
        this._options = extend(this._default, options);
        this._start = {};
        this._move = {};
        this._end = {};
        this._prev = 0;
        this._current = 0;
        this._offset = 0;
        this._goto = -1;
        this._eventHandlers = {};

        this.$container = document.querySelector(this._options.container);
        this.$items = this.$container.querySelectorAll(this._options.item);
        this.count = this.$items.length;

        this._width = this.$container.offsetWidth;

        this._init();
        this._bind();
    }

    Swiper.prototype._init = function () {
        var me = this;
        var width = me._width;

        var w = width * me.count;

        me.$container.style.width = w + 'px';


        Array.prototype.forEach.call(me.$items, function ($item, key) {
            $item.style.width = width + 'px';
        });

        me._activate(0);
    };

    Swiper.prototype._bind = function () {
        var me = this;

        this.$container.addEventListener('touchstart', function (e) {
            me._start.x = e.changedTouches[0].pageX;

            me.$container.style['-webkit-transition'] = 'none';
            me.$container.style.transition = 'none';

        }, false);

        this.$container.addEventListener('touchmove', function (e) {
            me._move.x = e.changedTouches[0].pageX;

            var distance = me._move.x - me._start.x;
            var transform = 'translate3d(' + (distance - me._offset) + 'px, 0, 0)';

            me.$container.style['-webkit-transform'] = transform;
            me.$container.style.transform = transform;

            e.preventDefault();
        }, false);

        this.$container.addEventListener('touchend', function (e) {
            me._end.x = e.changedTouches[0].pageX;

            var distance = me._end.x - me._start.x;

            me._prev = me._current;
            if (distance > me._options.threshold) {
                me._current = me._current === 0 ? 0 : --me._current;
            } else if (distance < -me._options.threshold) {
                me._current = me._current < (me.count - 1) ? ++me._current : me._current;
            }

            me._show(me._current);

        }, false);

        this.$container.addEventListener('transitionEnd', function (e) {
        }, false);

        this.$container.addEventListener('webkitTransitionEnd', function (e) {
            if (e.target !== me.$container) {
                return false;
            }

            if (me._current != me._prev || me._goto > -1) {
                me._activate(me._current);
                var cb = me._eventHandlers.swiped || noop;
                cb.apply(me, [me._prev, me._current]);
                me._goto = -1;
            }
            e.preventDefault();
        }, false);
    };

    Swiper.prototype._show = function (index) {
        this._offset = index * this._width;
        var transform = 'translate3d(-' + this._offset + 'px, 0, 0)';

        var duration = this._options.duration + 'ms';

        this.$container.style['-webkit-transition'] = duration;
        this.$container.style.transition = duration;
        this.$container.style['-webkit-transform'] = transform;
        this.$container.style.transform = transform;
    };

    Swiper.prototype._activate = function (index){
        var clazz = this._options.activeClass;
        Array.prototype.forEach.call(this.$items, function ($item, key){
            $item.classList.remove(clazz);
            if (index === key) {
                $item.classList.add(clazz);
            }
        });
    };

    Swiper.prototype.go = function (index) {
        if(index < 0 || index > this.count - 1 || index === this._current){
            return;
        }
        
        if (index === 0) {
            this._current = 0;
            this._prev = 0;
        }else{
            this._current = index;
            this._prev = index - 1;
        }

        this._goto = index;
        this._show(this._current);

        return this;
    };

    Swiper.prototype.next = function () {
        if (this._current >= this.count - 1) {
            return;
        }
        this._prev = this._current;
        this._show(++this._current);
        return this;
    };

    Swiper.prototype.on = function (event, callback) {
        if (this._eventHandlers[event]) {
            throw new Error('event ' + event + ' is already register');
        }
        if (typeof callback !== 'function') {
            throw new Error('parameter callback must be a function');
        }

        this._eventHandlers[event] = callback;

        return this;
    };

    function extend(target, source) {
        for (var key in source) {
            target[key] = source[key];
        }

        return target;
    }

    function noop() {}

    //二次封装
    window.swiper = function(opt){
        var sw = new Swiper(opt);
        var con = sw.$container.parentNode;
        var dotNumber = sw.count;

        if(opt.showState){
            var dotArr = [];
            var dotCon = document.createElement('div');
            dotCon.className = 'dotCon';
            for(var i = 0; i < dotNumber; i++){
                var dot = document.createElement('i');
                i == 0 ? dot.className = 'active' : null;
                dotArr[i] = dot;
                dotCon.appendChild(dot);
            }
            con.appendChild(dotCon);
            sw.on('swiped', function(prev, current){
                dotArr.forEach(function(e, i){
                    i == current ? e.className = 'active' : e.className = ''
                })
                if(opt.swipedFn) opt.swipedFn(current);
            })
        }

        if(opt.autoplay){
            var playTimer,
                delay = opt.during || 3000,
                flip = function(){
                    playTimer && clearTimeout(playTimer);
                    playTimer = setTimeout(function(){
                        sw._current + 2 > dotNumber ? sw.go(0) : sw.next();
                        flip()
                    }, delay)
                };
            flip();
            con.addEventListener('touchstart', function(){
                clearTimeout(playTimer);
            }, false);
            con.addEventListener('touchend', function(){
                flip();
            }, false)
        }

        return sw
    } 

}).call(this);