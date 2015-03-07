(function(){

    'use strict';

    var stage, things;

    things = [
        'a',
        'b',
        'c',
        'd',
        'f'
    ];

    function grid() {
        var x, y, row;

        x = 0;
        y = 0;

        stage = [];
        while (x < 10) {
            row = [];
            while (y < 10) {
                row.push('.');
                y += 1;
            }
            stage.push(row);
            x += 1;
            y = 0;
        }
    }

    function makeRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    function getRandomPos(maxY, maxX) {
        return [makeRandomNumber(maxY), makeRandomNumber(maxX)];
    }

    function isOccupied(y, x, grid) {
        return grid[y][x] !== '.';
    }

    function addThings(thingsArr, grid) {
        var pos, x, y;

        thingsArr.forEach(function(thing){
            pos = getRandomPos(grid.length, grid[0].length);
            x = pos[1];
            y = pos[0];

            if (isOccupied(y, x, grid) === true) {
                return;
            }

            stage[y][x] = thing;
        });
    }

    function printGrid() {
        var el = document.getElementById('stage');
        el.innerHTML = '';
        stage.forEach(function(row) {
            row.forEach(function(column) {
                el.innerHTML += column + ' ';
            });
            el.innerHTML += '<br>';
        });
    }

    var personPos;

    function person(x,y) {
        personPos = [x,y];
        stage[x][y] = '@';
    }

    function isOutOfBounds(x) {
        return x >= stage.length || x < 0;
    }

    function isGoal(x, y, stage) {
        return stage[y][x] === goal;
    }

    function movePerson(x,y) {
        if (isOutOfBounds(x) || isOutOfBounds(y)) {
            console.log('out');
            return;
        }

        if (isGoal(y, x, stage)) {
            log('you found the ' + goal + ', but it did not fill the void inside your soul');
            main();
            return;
        }

        if (isOccupied(x, y, stage)) {
            console.log('something');
            return;
        }

        stage[x][y] = '@';
        stage[personPos[0]][personPos[1]] = '.';
        personPos = [x,y];
    }

    function onKeyDown(e) {
        //left
        if (e.keyCode === 37) {
            movePerson(personPos[0],personPos[1] - 1);
        }
        //right
        if (e.keyCode === 39) {
            movePerson(personPos[0],personPos[1] + 1);
        }
        //up
        if (e.keyCode === 38) {
            movePerson(personPos[0] - 1,personPos[1]);
        }
        //down
        if (e.keyCode === 40) {
            movePerson(personPos[0] + 1,personPos[1]);
        }

        printGrid();
    }

    function log(message) {
        var node, text;
        node = document.getElementById('log');
        text = document.createElement('p');
        text.innerHTML = message;

        node.appendChild(text);
    }

    function addEventHandler() {
        window.addEventListener('keydown', onKeyDown);
    }

    function pickGoal() {
        var thing = Math.floor(Math.random() * things.length);
        return things[thing];
    }

    function main() {
        grid();
        person(2,3);
        addThings(things, stage);
        printGrid();
        addEventHandler();
        goal = pickGoal();
        log('you want the ' + goal);
    }

    var goal;

    main();
}());
