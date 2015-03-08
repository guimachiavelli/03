(function(){

    'use strict';

    var stage, things;

    function getRandomThing() {
        var things = [
            'car',
            'chocolate',
            'house',
            'flat in central london',
            'gold baththub',
            'designer underwear',
            'palace',
            'trip to canarias',
            'money',
            'concert tickets',
            'videogame'
        ];
        return things[Math.floor(Math.random() * things.length)];
    }

    function generateRandomSymbol() {
        var randomCode;
        randomCode = Math.floor(Math.random() * 93) + 33;
        randomCode = String.fromCharCode(randomCode);

        if (randomCode === ' ' || randomCode === '.') {
            return generateRandomSymbol();
        }

        return randomCode;
    }

    function generateThingsList(length) {
        var thingsList, i;

        i = 0;
        thingsList = {};
        while (i < length) {
            thingsList[generateRandomSymbol()] = getRandomThing();
            i += 1;
        }

        return thingsList;
    }

    function grid() {
        var x, y, row;

        x = 0;
        y = 0;

        stage = [];
        while (x < 30) {
            row = [];
            while (y < 30) {
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

    function addThings(thingsObj, grid) {
        var pos, x, y, thing;

        for (thing in thingsObj) {
            pos = getRandomPos(grid.length, grid[0].length);
            x = pos[1];
            y = pos[0];

            if (isOccupied(y, x, grid) === true) {
                return;
            }

            stage[y][x] = '<i style="color:' + getRandomColour() + '">' + thing + '</i>';
        }
    }

    function getRandomColour() {
        var rgb;

        rgb = [
            Math.floor(Math.random() * 150) + 100,
            Math.floor(Math.random() * 150) + 100,
            Math.floor(Math.random() * 150)
        ];

        return 'rgb(' + rgb.join(',') + ')';
    }

    function printGrid() {
        var el = document.getElementById('stage');
        var content = '';
        stage.forEach(function(row) {
            row.forEach(function(column) {
                content += '<b>' + column + '</b>';
            });
            content += '<br>';
        });
        el.innerHTML = content;
    }

    var personPos;

    function person(x,y) {
        personPos = [x,y];
        stage[x][y] = '@';
    }

    function isOutOfBounds(x) {
        return x >= stage.length || x < 0;
    }

    function getNodeContent(node) {
        var tmp = document.createElement('b');
        tmp.innerHTML = node;
        return tmp.textContent || tmp.innerText || '';
    }

    function isGoal(x, y, stage) {
        return things[getNodeContent(stage[y][x])] === goal;
    }

    function movePerson(x,y) {
        if (isOutOfBounds(x) || isOutOfBounds(y)) {
            return;
        }

        if (isGoal(y, x, stage)) {
            log('you found the ' + goal + ', but it did not fill the void inside your soul');
            main();
            return;
        }

        if (isOccupied(x, y, stage)) {
            log('you found the ' + things[getNodeContent(stage[x][y])]+ ', but that is not what you crave');
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
        node.scrollTop = node.scrollHeight;
    }

    function addEventHandler() {
        window.addEventListener('keydown', onKeyDown);
    }

    function pickGoal() {
        var thing = Object.keys(things);
        return things[thing[thing.length * Math.random() << 0]];
    }

    function main() {
        grid();
        person(2,3);
        things = generateThingsList(Math.floor(Math.random() * 8) + 2);
        addThings(things, stage);
        printGrid();
        addEventHandler();
        goal = pickGoal();
        log('you want the ' + goal);
    }

    var goal;

    main();

    window.want = {
        main: main
    };

}());
