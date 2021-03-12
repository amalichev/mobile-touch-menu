class MobileTouchMenu {
    params = null;

    $mobileTouchMenu = document.querySelector('.mobile-touch-menu');
    $mobileTouchMenuBackdrop = document.querySelector('.mobile-touch-menu-backdrop');
    $mobileTouchMenuToggler = document.querySelectorAll('.mobile-touch-menu-toggler');

    constructor(params) {
        this.$mobileTouchMenu.dataset.direction = params && params.direction ? params.direction : 'left';

        this.createBackdrop();

        this.setParams(params);
        this.setStyles(params);

        this.handleToggler();
        this.handleBackdrop();
        this.handleSwipe();
    }

    createBackdrop() {
        this.$mobileTouchMenuBackdrop = document.createElement('div');

        this.$mobileTouchMenuBackdrop.classList.add('mobile-touch-menu-backdrop');

        this.$mobileTouchMenu.after(this.$mobileTouchMenuBackdrop);
    }

    handleSwipe() {
        var self = this;

        this.$mobileTouchMenu.addEventListener('touchstart', handleTouchStart);
        this.$mobileTouchMenu.addEventListener('touchmove', handleTouchMove);
        this.$mobileTouchMenu.addEventListener('touchend', handleTouchEnd);

        var x1 = null, y1 = null,
            x2 = null, y2 = null,
            xDiff = null,
            yDiff = null,
            swipeDistance = this.params.swipeDistance || 120;

        function handleTouchStart(event) {
            var firstTouch = event.touches[0];

            x1 = firstTouch.clientX;
            y1 = firstTouch.clientY;
        }

        function handleTouchEnd(event) {
            self.$mobileTouchMenu.style.transform = 'translateX(0)';
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
                if ('right' === self.params.direction) {
                    if (xDiff > 0) {
                        self.$mobileTouchMenu.style.transform = 'translateX(' + xDiff + 'px)';
                    }

                    if (xDiff > swipeDistance) {
                        self.hide();
                    }
                } else if ('right' !== self.params.direction) {
                    if (xDiff < 0) {
                        self.$mobileTouchMenu.style.transform = 'translateX(' + xDiff + 'px)';
                    }

                    if (xDiff < -swipeDistance) {
                        self.hide();
                    }
                }
            }
        }
    }

    handleToggler() {
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

    handleBackdrop() {
        var self = this;

        this.$mobileTouchMenuBackdrop.addEventListener('click', function() {
            self.hide();
        });
    }

    setParams(params) {
        var defaultWidth = '280px';

        this.params = Object.assign({
            width: this.$mobileTouchMenu.dataset.width || defaultWidth,
            direction: this.$mobileTouchMenu.dataset.direction,
        }, params);
    }

    setStyles() {
        this.$mobileTouchMenu.style.width = this.params.width;

        if ('right' === this.params.direction) {
            this.$mobileTouchMenu.style.left = 'auto';
            this.$mobileTouchMenu.style.right = '-' + this.$mobileTouchMenu.style.width;
        } else {
             this.$mobileTouchMenu.style.left = '-' + this.$mobileTouchMenu.style.width;
        }
    }

    show() {
        this.$mobileTouchMenu.classList.add('show');
    }

    hide() {
        this.$mobileTouchMenu.classList.remove('show');
    }
}
