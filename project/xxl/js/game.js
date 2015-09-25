(function (window) {
    var gameConf = {
        //每块宝石的宽度，正方形
        gemWidth: 50,

        //关卡
        stage: {},

        //基础得分，没多消除一个宝石， + scoreBase分
        scoreBase: 10,

        //最少消除数
        minEliminate: 3,

        //5x6
        rows: 6,
        columns: 10,

        //当前地图
        map: [],
        //当前关卡
        currentStage: 0,

        //是否接收事件
        acceptClick: false,


        //游戏容器
        container: null,

        //计时器
        timer: null,
        //每一句的秒数
        second: null,
        second_current:null,

        moveStart: null,
        moveEnd: null,
        touchStart: null,
        touchMove: null,

        //事件
        onStageClear: null,
        onGameOver: null,
        onGameClear: null,
        onStart: null,
        onClear: null,
        onEliminate: null,
        onEliminateStop: null,
        onTimer: null,

        speed: 300, //毫秒
    };

    var score = 0;
    var combos = 0;
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //生成地图数据
    var genMapData = function () {
        var data = [];

        for (var i = 1; i <= gameConf.rows; i++) {
            var tmp = [];
            for (var j = 1; j <= gameConf.columns; j++) {
                //随机设置宝石
                tmp.push(getRandomInt(0, gameConf.currentStageGems.length - 1));
            }
            data.push(tmp);
        }

        //data = [
        //    [0, 1, 1, 3, 4, 0],
        //    [2, 3, 4, 0, 1, 2],
        //    [0, 0, 0, 2, 3, 4],
        //];

        if (ifNeedRegenMap(data)) {
            console.log('regenMap');
            return genMapData();
        } else
            return data;
    };

    //绘制地图
    var drawMap = function () {
        $(gameConf.container).find("div[data-row]").remove();
        for (var i in gameConf.map) {
            for (var j in gameConf.map[i]) {
                drawGem(i, j);
            }
        }

        setTimeout(function () {
            /**
             * 地图绘制完成 或者 地图填充完成 之后
             * 每个宝石做一次消除的尝试
             */
            tryEliminate();
        }, gameConf.speed);
    };

    /**
     * 绘制宝石到地图上
     */
    var drawGem = function (i, j) {
        var top = left = 0;

        top += i * gameConf.gemWidth;
        left += j * gameConf.gemWidth;

        var div = $('<div>', {
            "data-column": j,
            "data-row": i,
            "data-gem": gameConf.map[i][j],
        });
        div.css('position', 'absolute');
        div.css('top', top);
        div.css('left', left);
        div.css('display', 'block');
        div.css('height', gameConf.gemWidth);
        div.css('width', gameConf.gemWidth);
        div.css('background-image', 'url(' + gameConf.currentStageGems[gameConf.map[i][j]] + ')');
        div.css('background-size', '100% 100%');

        $(div).addClass('gemmagictime in');

        $(div)[0].addEventListener('touchstart', function (e) {
            if (gameConf.acceptClick != true) return;
            gameConf.moveStart = [$(this).attr('data-row'), $(this).attr('data-column')];
            gameConf.touchStart = [e.touches[0].pageX, e.touches[0].pageY];
        }, false);

        $(div)[0].addEventListener('touchmove', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (gameConf.acceptClick != true) return;
            gameConf.touchMove = [e.touches[0].pageX, e.touches[0].pageY];
        }, false);

        $(div)[0].addEventListener('touchend', function (e) {
            if (gameConf.acceptClick != true) return;

            gameConf.acceptClick = false;

            /**
             * 重设连击数
             */
            combos = 0;

            /**
             * 计算移动方向
             */
            var x = gameConf.touchMove[0] - gameConf.touchStart[0];
            var y = gameConf.touchMove[1] - gameConf.touchStart[1];
            var xABS = Math.abs(x);
            var yABS = Math.abs(y);
            var move, distance;
            var row1 = parseInt($(this).attr('data-row')), column1 = parseInt($(this).attr('data-column'));
            var row2, column2;

            if (xABS >= yABS) {
                move = 'x';
                distance = x;
            } else {
                move = 'y'
                distance = y;
            }

            /**
             * 目标宝石是否存在
             */
            if (move == 'y') {
                column2 = column1;

                if (distance > 0 && typeof gameConf.map[row1 + 1] != 'undefined') {
                    row2 = row1 + 1;
                } else if (distance < 0 && typeof gameConf.map[row1 - 1] != 'undefined') {
                    row2 = row1 - 1;
                } else {
                    gameConf.acceptClick = true;
                    return false;
                }
            } else {
                row2 = row1;

                if (distance > 0 && typeof gameConf.map[row1][column1 + 1] != 'undefined') {
                    column2 = column1 + 1;
                } else if (distance < 0 && typeof gameConf.map[row1][column1 - 1] != 'undefined') {
                    column2 = column1 - 1;
                } else {
                    gameConf.acceptClick = true;
                    return false;
                }
            }

            /**
             * 交换宝石位置
             */
            exchangeGem(row1, column1, row2, column2);

            /**
             * 是否有可以消除的宝石？
             * 如果没有，宝石位置交换回来
             */
            setTimeout(function () {
                var boom = tryEliminate();
                if (boom.length <= 0) {
                    exchangeGem(row2, column2, row1, column1);
                }
            }, 200);
        }, false);

        $(gameConf.container).append(div);
    };

    var exchangeGem = function (row1, column1, row2, column2) {
        var gem1 = $(gameConf.container).find('div[data-row=' + row1 + '][data-column=' + column1 + ']');
        var gem2 = $(gameConf.container).find('div[data-row=' + row2 + '][data-column=' + column2 + ']');

        /**
         * 数据层交换
         */
        var tmp = gameConf.map[row1][column1];
        gameConf.map[row1][column1] = gameConf.map[row2][column2];
        gameConf.map[row2][column2] = tmp;

        /**
         * 显示层交换
         */
        var tmpRow = $(gem1).attr('data-row');
        var tmpColumn = $(gem1).attr('data-column');
        $(gem1).attr({
            'data-row': $(gem2).attr('data-row'),
            'data-column': $(gem2).attr('data-column'),
        });
        $(gem2).attr({
            'data-row': tmpRow,
            'data-column': tmpColumn,
        });

        var pos1 = $(gem1).position();
        var pos2 = $(gem2).position();

        $(gem1).css('-webkit-transition', 'all .1s ease-out');
        $(gem1).css({
            top: pos2.top,
            left: pos2.left,
        });

        $(gem2).css('-webkit-transition', 'all .1s ease-out');
        $(gem2).css({
            top: pos1.top,
            left: pos1.left,
        });
    }

    /**
     * 是否需要重新生成地图（任何宝石移动都无法产生消除的情况下）
     * 宝石生成的方向为：
     * 左 -> 右
     * 上 -> 下
     * 只要有一个方向可以消除，就返回false
     */
    var ifNeedRegenMap = function (mapData) {
        var findedEliminate = false;

        findedEliminate:
            for (var i in mapData) {
                for (var j in mapData[i]) {
                    //不做任何动作，地图生成时可能就直接能消除
                    if (findEliminate(mapData, mapData[i][j], i, j, i, j)) {
                        findedEliminate = true;
                        break findedEliminate;
                    }

                    //模拟四个方向的移动
                    if (typeof mapData[i][+j - 1] != 'undefined' && findEliminate(mapData, mapData[i][j], i, +j - 1, i, j)) {
                        findedEliminate = true;
                        break findedEliminate;
                    }

                    if (typeof mapData[i][+j + 1] != 'undefined' && findEliminate(mapData, mapData[i][j], i, +j + 1, i, j)) {
                        findedEliminate = true;
                        break findedEliminate;
                    }

                    if (typeof mapData[+i - 1] != 'undefined' && findEliminate(mapData, mapData[i][j], +i - 1, j, i, j)) {
                        findedEliminate = true;
                        break findedEliminate;
                    }

                    if (typeof mapData[+i + 1] != 'undefined' && findEliminate(mapData, mapData[i][j], +i + 1, j, i, j)) {
                        findedEliminate = true;
                        break findedEliminate;
                    }

                }
            }

        return findedEliminate ? false : true;
    };

    /**
     * 找出是否有连线
     * @returns {{row: Array, column: Array}}
     */
    var findEliminate = function (mapData, value, row, column, originRow, originColumn) {
        row = parseInt(row);
        column = parseInt(column);
        originRow = parseInt(originRow);
        originColumn = parseInt(originColumn);

        var tmpValue;

        /**
         * 交换两个宝石的值
         */
        tmpValue = mapData[row][column];
        mapData[row][column] = mapData[originRow][originColumn];
        mapData[originRow][originColumn] = tmpValue;

        var num = 0, columnEliminate = [], rowEliminate = [], result = {row: [], column: []};

        //纵向是否有连线
        columnEliminate.push([row, column]);
        //向上找
        num = 0;
        while (true) {
            num++;
            if (typeof mapData[+row - +num] == 'undefined') break;

            if (value == mapData[+row - +num][column]) {
                columnEliminate.push([+row - +num, column]);
            } else {
                break;
            }
        }
        //向下找
        num = 0;
        while (true) {
            num++;
            if (typeof mapData[+row + +num] == 'undefined') break;

            if (value == mapData[+row + +num][column]) {
                columnEliminate.push([+row + +num, column]);
            } else {
                break;
            }
        }

        if (columnEliminate.length >= gameConf.minEliminate) result.column = columnEliminate;

        //横向是否有连线
        rowEliminate.push([row, column]);
        //向左找
        num = 0;
        while (true) {
            num++;
            if (typeof mapData[row][+column - +num] == 'undefined') break;

            if (value == mapData[row][+column - +num]) {
                rowEliminate.push([row, +column - +num]);
            } else {
                break;
            }
        }
        //向右找
        num = 0;
        while (true) {
            num++;
            if (typeof mapData[row][+column + +num] == 'undefined') break;

            if (value == mapData[row][+column + +num]) {
                rowEliminate.push([row, +column + +num]);
            } else {
                break;
            }
        }

        if (rowEliminate.length >= gameConf.minEliminate) result.row = rowEliminate;

        /**
         * 交换回两个宝石的值
         */
        tmpValue = mapData[row][column];
        mapData[row][column] = mapData[originRow][originColumn];
        mapData[originRow][originColumn] = tmpValue;

        return (result.row.length > 0 || result.column.length > 0) ? result : false;
    };

    /**
     * 舞台初始化
     */
    var initStage = function () {
        gameConf.currentStage++;
        gameConf.currentStageGems = gameConf.stage[gameConf.currentStage - 1]['gem'];

        /**
         * 绘制地图
         */
        gameConf.map = genMapData();
        drawMap();

        if (gameConf.onStageInit) {
            gameConf.onStageInit(gameConf.currentStage, gameConf.stage[gameConf.currentStage - 1]['score'], score);
        }
    };

    /**
     * 开始当前关卡
     */
    var play = function () {
        if (gameConf.gameOver) {
            /**
             * 重置游戏
             */
            resetGame();
            gameConf.currentStage = 0;
            gameConf.gameOver = false;
        }

        initStage();

        /**
         * 计时条的设置
         */
        var second_stage = gameConf.stage[gameConf.currentStage - 1]['time'];
        var second_current = second_stage;

        gameConf.timer = setInterval(function () {
            second_current--;

            gameConf.onTimer(second_current, second_stage);

            if(second_current <= 0) {
                //游戏时间结束
                clearInterval(gameConf.timer);

                var needScore = gameConf.stage[gameConf.currentStage - 1]['score'];

                /**
                 * 是否过关
                 */
                if (score < needScore) {
                    /**
                     * 游戏结束，回调
                     */
                    if (gameConf.onGameOver) {
                        gameConf.onGameOver(gameConf.currentStage, needScore, score);
                    }

                    gameConf.gameOver = true;
                } else {
                    if (typeof gameConf.stage[gameConf.currentStage] != 'undefined') {
                        /**
                         * 闯关成功，进入下一关
                         */
                        if (gameConf.onStageClear) {
                            gameConf.onStageClear(
                                gameConf.currentStage + 1,
                                gameConf.stage[gameConf.currentStage]['score'],
                                score
                            );
                        }
                    } else {
                        /**
                         * 通关
                         */
                        if (gameConf.onGameClear) {
                            gameConf.onGameClear(
                                score
                            );
                        }
                    }
                }
            }
        }, 1000);
    }

    var uniqueBoom = function () {

    }

    /**
     * 整个地图上每个宝石尝试消除
     */
    var tryEliminate = function () {
        gameConf.acceptClick = false;

        var eliminates, boomInfo, boom = [];
        for (var i in gameConf.map) {
            for (var j in gameConf.map[i]) {
                eliminates = findEliminate(gameConf.map, gameConf.map[i][j], i, j, i, j);

                if (!eliminates) continue;

                /**
                 * 添加到boom，并且不记录重复值
                 */
                for (var boom_i in eliminates['column']) {
                    boomInfo = eliminates['column'][boom_i][0] + '-' + eliminates['column'][boom_i][1];
                    if(boom.indexOf(boomInfo) == -1) {
                        boom.push(boomInfo);
                    }
                }
                for (var boom_i in eliminates['row']) {
                    boomInfo = eliminates['row'][boom_i][0] + '-' + eliminates['row'][boom_i][1];
                    if (boom.indexOf(boomInfo) == -1) {
                        boom.push(boomInfo);
                    }
                }
            }
        }

        //jQuery的这个方法在IOS设备上无效，没有去除重复的值
        //$.unique(boom);

        if (boom.length <= 0) {
            if(ifNeedRegenMap(gameConf.map)) {
                //alert('没有可消除的宝石，重新生成地图。');
                gameConf.map = genMapData();
                drawMap();
            } else {
                setTimeout(function () {
                    gameConf.acceptClick = true;
                    if(gameConf.onEliminateStop) {
                        gameConf.onEliminateStop();
                    }
                }, gameConf.speed);
            }

        } else {
            eliminateGem(boom);

            /**
             * 宝石消除动画结束后，补全地图
             */
            setTimeout(function () {
                suppleGem();
            }, gameConf.speed);
        }

        return boom;
    };

    /**
     * 消除宝石
     */
    var eliminateGem = function (gem) {
        if (!gem) return;

        var param;
        for (var i in gem) {
            param = gem[i].split('-');
            gameConf.map[param[0]][param[1]] = -1;

            //alert(param[0] + '-' + param[1]);
            combos++;
            score += gameConf.scoreBase * combos;
            if(gameConf.onEliminate) {
                gameConf.onEliminate(combos, gameConf.scoreBase * combos, score);
            }

            eliminateGemAnimate(param[0], param[1]);
        }
    };

    var eliminateGemAnimate = function (row, column) {
        //console.log(row + '-' + column);
        var gem = $(gameConf.container).find('div[data-row=' + row + '][data-column=' + column + ']');
        $(gem).one('webkitTransitionEnd webkitAnimationEnd', function () {
            $(gem).remove();
        });
        $(gem).addClass('gemmagictime out');
    };

    /**
     * 补充宝石
     * 自上而下的移动
     * 移动完之后，缺的部分直接填充
     */
    var suppleGem = function () {
        /**
         * 从上往下移动，从下往上计算
         */
        var tmpMap = $.merge([], gameConf.map);
        var moveData = [];

        for (var i in tmpMap) {
            for (var j in tmpMap[i]) {
                if (tmpMap[i][j] == -1) {
                    continue;
                }

                var moveDownNum = 0;
                for (var k = i; k < tmpMap.length; k++) {
                    if (typeof tmpMap[+k + 1] == 'undefined') break;
                    if (tmpMap[+k + 1][j] == -1) moveDownNum++;
                }
                if (moveDownNum > 0) {
                    moveData.push(i + '-' + j + ',' + (+i + moveDownNum) + '-' + j);
                }
            }
        }

        /**
         * 从下往上找
         */
        for (var i = moveData.length - 1; i >= 0; i--) {
            var param = moveData[i].split(',');
            var origin = param[0].split('-');
            var target = param[1].split('-');

            gameConf.map[target[0]][target[1]] = gameConf.map[origin[0]][origin[1]];
            gameConf.map[origin[0]][origin[1]] = -1;

            /**
             * 向下移动宝石
             */
            var gemDiv = $(gameConf.container).find('div[data-row=' + origin[0] + '][data-column=' + origin[1] + ']');
            var currentTop = parseInt($(gemDiv).css('top'));

            $(gemDiv).css('-webkit-transition', 'all .1s ease-out');
            $(gemDiv).css('top', currentTop + gameConf.gemWidth * (+target[0] - +origin[0]) + 'px');
            $(gemDiv).attr('data-row', target[0]);
        }

        /**
         * 补全空缺部分
         */
        if (moveData.length > 0) {

            setTimeout(function () {
                drawGemByPos();
            }, gameConf.speed);
        } else {
            drawGemByPos();
        }
    }

    var drawGemByPos = function () {
        for (var i in gameConf.map) {
            for (var j in gameConf.map[i]) {
                if (gameConf.map[i][j] != -1) continue;
                gameConf.map[i][j] = getRandomInt(0, gameConf.currentStageGems.length - 1);
                drawGem(i, j);
            }
        }

        setTimeout(function () {
            tryEliminate();
        }, gameConf.speed);
    };

    var resetGame = function () {
        score = 0;

        gameConf.currentStage = 0;
        gameConf.moveStart = null;
        gameConf.moveEnd = null;
    };

    window.ttaxc = function (param) {
        gameConf = $.extend(gameConf, param);

        $(gameConf.container).css('position', 'relative');
        $(gameConf.container).css('width', gameConf.gemWidth * gameConf.columns);
        $(gameConf.container).css('height', gameConf.gemWidth * gameConf.rows);
    };

    window.ttaxc.prototype.conf = function (param) {
        gameConf = $.extend(gameConf, param);
    };

    window.ttaxc.prototype.play = function () {
        play();
    };

    window.ttaxc.prototype.replay = function () {
        resetGame();
        play();
    };

})(window);