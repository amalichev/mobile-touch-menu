var MobileTouchMenu = function (params) {

    this.createBackdrop = function() {
        this.$mobileTouchMenuBackdrop = document.createElement('div');
        this.$mobileTouchMenuBackdrop.classList.add('mobile-touch-menu-backdrop');
        this.$mobileTouchMenu.after(this.$mobileTouchMenuBackdrop);
    }

    this.handleSwipe = function() {
        var self = this;

        this.$mobileTouchMenu.addEventListener('touchstart', handleTouchStart);
        this.$mobileTouchMenu.addEventListener('touchmove', handleTouchMove);
        this.$mobileTouchMenu.addEventListener('touchend', handleTouchEnd);

        var x1 = null, y1 = null,
            x2 = null, y2 = null,
            xDiff = null,
            yDiff = null,
            isRightDirection = 'right' === self.params.direction,
            swipeDistance = this.params.swipeDistance || 120;

        function handleTouchStart(event) {
            var firstTouch = event.touches[0];

            x1 = firstTouch.clientX;
            y1 = firstTouch.clientY;
        }

        function handleTouchEnd(event) {
            if (!x1 || !y1) {
                return false;
            }

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                self.$mobileTouchMenu.style.transform = 'translateX(0)';

                if (isRightDirection && xDiff > swipeDistance || !isRightDirection && xDiff < -swipeDistance) {
                    self.hide();
                } else {
                    self.setAnimation();
                }
            } else {
                self.$mobileTouchMenu.style.transform = 'translateX(0)';
                self.setAnimation();
            }
        }

        function handleTouchMove(event) {
            if (!x1 || !y1) {
                return false;
            }

            x2 = event.touches[0].clientX;
            y2 = event.touches[0].clientY;

            xDiff = x2 - x1;
            yDiff = y2 - y1;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (isRightDirection && xDiff > 0) {
                    self.$mobileTouchMenu.style.transform = 'translateX(' + xDiff + 'px)';
                } else if (!isRightDirection && xDiff < 0) {
                    self.$mobileTouchMenu.style.transform = 'translateX(' + xDiff + 'px)';
                }
            }
        }
    }

    this.handleToggler = function() {
        var self = this;

        this.$mobileTouchMenuToggler.forEach(function(toggler) {
            toggler.addEventListener('click', function(e) {
                e.preventDefault();

                if (self.$mobileTouchMenu.classList.contains('show')) {
                    self.hide();
                } else {
                    self.show();
                }
            });
        });
    }

    this.handleBackdrop = function() {
        var self = this;

        this.$mobileTouchMenuBackdrop.addEventListener('click', function() {
            self.hide();
        });
    }

    this.setParams = function(params) {
        var defaultWidth = '280px';

        this.params = Object.assign({
            width: this.$mobileTouchMenu && this.$mobileTouchMenu.dataset.width || defaultWidth,
            transitionDuration: this.$mobileTouchMenu && this.$mobileTouchMenu.dataset.transitionDuration || 300,
            direction: this.$mobileTouchMenu && this.$mobileTouchMenu.dataset.direction,
        }, params);
    }

    this.setStyles = function() {
        this.$mobileTouchMenu.style.width = this.params.width;

        if ('right' === this.params.direction) {
            this.$mobileTouchMenu.style.left = 'auto';
            this.$mobileTouchMenu.style.right = '0';
        } else {
            this.$mobileTouchMenu.style.left = '0';
        }
    }

    this.setAnimation = function() {
        var self = this;
        var startValue = this.params.transitionDuration + 'ms';
        var endValue = '0ms';
        var notations = ['webkitTransitionDuration', 'MozTransitionDuration', 'msTransitionDuration', 'OTransitionDuration', 'transitionDuration'];

        for (notation of notations) {
            this.$mobileTouchMenu.style[notation] = startValue;
        }

        setTimeout(function() {
            for (notation of notations) {
                self.$mobileTouchMenu.style[notation] = endValue;
            }
        }, this.params.transitionDuration);
    }

    this.show = function() {
        document.body.style.overflow = 'hidden';

        this.$mobileTouchMenu.classList.add('show');
        this.setAnimation();
    }

    this.hide = function() {
        document.body.style.overflow = 'visible';

        this.$mobileTouchMenu.classList.remove('show');
        this.setAnimation();
    }

    this.$mobileTouchMenu = document.querySelector('.mobile-touch-menu');

    if (this.$mobileTouchMenu) {
        this.params = params;

        this.$mobileTouchMenuBackdrop = document.querySelector('.mobile-touch-menu-backdrop');
        this.$mobileTouchMenuToggler = document.querySelectorAll('.mobile-touch-menu-toggler');

        this.$mobileTouchMenu.dataset.direction = params && params.direction
            ? params.direction
            : 'left';

        this.createBackdrop();

        this.setParams(params);
        this.setStyles(params);

        this.handleToggler();
        this.handleBackdrop();
        this.handleSwipe();
    }
}

if ('undefined' !== typeof module) {
    module.exports = MobileTouchMenu;
}
