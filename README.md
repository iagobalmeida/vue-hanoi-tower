# Vue Hanoi Tower

Made with Vue JS & Bootstrap 5

## How to play
```
The objective of the game is to move all the pieces from one tower to another.
The only rule is that a piece can only be positioned on a bigger piece or an empty tower.
There is always a perfect solution, based on the number of pieces.
The number of movements on a perceft solution can be found trought:
    2 ^ n + 1
Where 'n' is the number of pieces in the game.

1, 2, 3 - Get piece from / Put piece on top of tower
Space   - Undo last movement
A       - Add piece to game ( restarts the game )
D       - Remove piece from game ( restarts the game )
R       - Restart the game

All the hotkeys are configurable.
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
