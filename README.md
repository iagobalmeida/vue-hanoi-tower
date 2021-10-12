# Vue Hanoi Tower
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## Motivation
This project was created in order to learn more about Vue changes from version 2 to 3 and practice the setup of a scalable VueJs project.

## How to play
The objective of the game is to move all the pieces from one tower to another.
The only rule is that a piece can only be positioned on a bigger piece or an empty tower.
There is always a perfect solution, based on the number of pieces.
The number of movements on a perceft solution can be found trought:
```
    2 ^ n + 1
```
Where 'n' is the number of pieces in the game.

 - 1, 2, 3 - Get piece from / Put piece on top of tower
 - Space   - Undo last movement
 - A       - Add piece to game ( restarts the game )
 - D       - Remove piece from game ( restarts the game )
 - R       - Restart the game

All the hotkeys are configurable.

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
