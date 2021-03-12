# Mobile Touch Menu

###### Demo: https://amalichev.github.io/


## Instruction

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
| `swipeDistance`   | number    | 120       | swipe distance to close the menu |

### Methods
| Name              | Description           |
| ---               | ---                   |
| `show`            | open the menu         |
| `hide`            | close the menu        |

### Example

#### ES6
```
import MobileSwipeMenu from 'mobile-touch-menu';
import 'mobile-touch-menu/mobile-touch-menu.css';

new MobileTouchMenu('#menu', {
    width: '280px',
    direction: 'left',
    swipeDistance: 120
});
```

#### OR
```
<link rel="stylesheet" href="mobile-touch-menu.css">
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
