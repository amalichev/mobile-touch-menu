# Mobile Touch Menu

###### Demo: https://fervent-sammet-c20465.netlify.app/demo.html

### Installation
```
npm install mobile-touch-menu --save
```
or
```
yarn add mobile-touch-menu
```

### Using
```
new MobileTouchMenu(options)
```

### Options
| Name              | Type      | Default   | Description                      |
| ---               | ---       | ---       | ---                              |
| `direction`       | string    | left      | operating mode (right, left)     |
| `width`           | string    | 280px     | menu width (with px or %)        |
| `swipeDistance`   | number    | 200       | swipe distance to close the menu |

### Methods
| Name              | Description           |
| ---               | ---                   |
| `show`            | open the menu         |
| `hide`            | close the menu        |

### Example

```
<link rel="stylesheet" href="mobile-touch-menu.css">
...
<button class="mobile-touch-menu-toggler">Toggle Menu</button>
...
<nav class="mobile-touch-menu">
    <ul>
        <li><a href="#">Menu Item #1</a></li>
        <li><a href="#">Menu Item #2</a></li>
        <li><a href="#">Menu Item #3</a></li>
        <li><a href="#">Menu Item #4</a></li>
        <li><a href="#">Menu Item #5</a></li>
        <li><a href="#">Menu Item #6</a></li>
        <li><a href="#">Menu Item #7</a></li>
        <li><a href="#">Menu Item #8</a></li>
        <li><a href="#">Menu Item #9</a></li>
    </ul>
</nav>
...
<script src="js/mobile-touch-menu.js"></script>
<script>
    var mobileTouchMenu = new MobileSwipeMenu({
        width: '280px',
        direction: 'left',
        swipeDistance: 120
    });
    document.getElementById('openMenu').addEventListener('click', function () {
        mobileTouchMenu.show();
    });
    document.getElementById('closeMenu').addEventListener('click', function () {
        mobileTouchMenu.hide();
    });
</script>
```

#### ES6
```
import MobileTouchMenu from 'mobile-touch-menu';
import 'mobile-touch-menu/mobile-touch-menu.css';

new MobileSwipeMenu({
    width: '280px',
    direction: 'left',
    swipeDistance: 120
});
```