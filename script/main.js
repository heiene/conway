/**
 * Created with JetBrains WebStorm.
 * User: rykket
 * Date: 6/16/13
 * Time: 9:33 AM
 * To change this template use File | Settings | File Templates.

 GAME RULES
 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
 2. Any live cell with two or three live neighbours lives on to the next generation.
 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.*/




window.addEventListener('load', function() {
    //making sure page is loaded
    var temp = document.getElementById('loadingState');
    temp.parentNode.removeChild(temp);
    temp = null;
    // Page load check finished

    //Three constants can be played with
    var RECH = 5;
    var RECW = 5;
    var OFFS = 1;
    var INT  = 33;

    var cells = [];                                     //Storing all cells in Array
    var cellArr;


    var canvas = document.getElementById('c');          //Setting up the canvas
    var ctx = canvas.getContext('2d');                  //Setting up the context
    var interval;                                       //Interval variable to be used to stop the animation

    canvas.width = (window.innerWidth * 0.5);
    canvas.height = (window.innerHeight * 0.5);

    // Setting up an initial function where cell objects are created
    function init() {
        cellArr = [];
        var cellID;
        var cellNum = 0;
        var cell = null;
        var row = 0;
        for(var i = 0, h = canvas.height; i <= h; i+= RECH+OFFS) {
            var col = 0;
            var cellTemp = [];
            for (var j = 0, w = canvas.width; j <= w; j+= RECW+OFFS)   {
                cellID = j+'-'+i;
                cell =  new Cell(j,i,cellID, cellNum, col, row);
                cells.push(cell);
                cellTemp.push(cell);
                cellNum++;
                cell.drawCell();
                cell = null;
                col++;
            }
            cellArr.push(cellTemp);
            row++;

        }

    }

    //Defining the cells  --------------------------------------------
    function Cell (x,y,id, num, col, row) {
        this.id = id;
        this.num = num;
        this.col = col;
        this.row = row;
        this.isAlive = false;
        this.x = x;
        this.y = y;
        this.nextIsAlive = false;
        this.cellChange = false;



    }

    Cell.prototype = {
        constructor: Cell,
        //Function where cell draws itself
        drawCell: function() {
            if (this.isAlive) {
                ctx.fillRect(this.x,this.y,RECW,RECH);
            } else {
                ctx.clearRect(this.x,this.y,RECW,RECH);
            }
        },
        //Function for killing a cell during animation
        killCell: function () {
            this.nextIsAlive = false;
        },
        //Function for reviving a cell during animation
        reviveCell: function () {
            this.nextIsAlive = true;
        },
        //function for turning on & off a cell when animation is not going.
        toggle: function() {
            if (this.isAlive) {
                this.isAlive = false;
            } else {
                this.isAlive = true;
            }
        },

        numNeigh: function() {

            var col,row, numCols, numRows, i,topLeft,top, topRight, right, bottomRight, bottom, bottomLeft, left;
            col = this.col;
            row = this.row;
            numCols = cellArr[0].length - 1;
            numRows = cellArr.length - 1;
            i = 0;

            topLeft     = (row>0 && col > 0) ? cellArr[row-1][col-1].isAlive : false;
            top         = (row>0) ? cellArr[row-1][col].isAlive : false;
            topRight    = (row>0 && col < numCols) ? cellArr[row-1][col+1].isAlive : false;
            right       = (col < numCols) ? cellArr[row][col+1].isAlive : false;
            bottomRight = (col < numCols && row < numRows) ? cellArr[row+1][col+1].isAlive : false;
            bottom      = (row < numRows) ? cellArr[row+1][col].isAlive : false;
            bottomLeft  = (row < numRows && col>0) ? cellArr[row+1][col-1].isAlive : false;
            left        = (col > 0) ? cellArr[row][col-1].isAlive : false;

            if(topLeft) {
                i++;
            }
            if(top) {
                i++;
            }
            if(topRight) {
                i++;
            }
            if(right) {
                i++;
            }
            if(bottomRight) {
                i++;
            }
            if(bottom) {
                i++;
            }
            if(bottomLeft) {
                i++;
            }
            if(left) {
                i++;
            }
            return i;

        }
    };
    // Cell finished -----------------------------------------------


    //Listener handling all clicks -------------------------------
    canvas.addEventListener('click', function(e) {
        var xCan = e.pageX - canvas.offsetLeft-ctx.canvas.clientLeft;
        var yCan = e.pageY - canvas.offsetTop-ctx.canvas.clientLeft;
        var cellPushed;

        cellPushed = getCell(xCan,yCan);
        console.log(cellPushed);
        console.log(cellPushed.numNeigh());
        if (cellPushed) {
            cellPushed.toggle();
            cellPushed.drawCell();
        } else {
            alert('push a cell');
        }


    });


    /*********************************************************
     //  Listener for buttons, patterns etc
     //
     //  Switch statement chooses which function to call
     //
    *********************************************************/

    document.addEventListener('click', handler);

    function handler(e){
        switch(e.target.id) {
            case 'honey':
                swapArray('honey');
                break;
            case 'gliderGun':
                swapArray('gliderGun');
                break;
            case 'start':
                startStep();
                break;
            case 'stop':
                stopStep();
                break;
            case 'default':
                break;
        }

    }


    /**********************************************************
     //
     // Functions for listeners
     //
    **********************************************************/

    function stopStep() {
        clearInterval(interval);
        var running = document.getElementById('running');
        running.style.visibility = 'hidden';

    }

    function startStep() {
        interval = setInterval(cellsNextStep,INT);
        var running = document.getElementById('running');
        running.style.visibility = 'visible';
    }

    function swapArray(arr) {
        init();
        var tempArr = pattern[arr],
            offset = 3;
        if (tempArr.height+ offset <= cellArr.length && tempArr.width + offset <= cellArr[0].length) {
            for (var i = 0 ; i< tempArr.height; i++) {
                for (var j = 0 ; j < tempArr.width; j++) {
                    cellArr[i+offset][j+offset].isAlive = tempArr.pattern[i][j];
                    cellArr[i+offset][j+offset].drawCell();
                }
            }
        } else {
            alert('Canvas too small!');
        }

    }

     // Listeners finished

    /**********************************************************
     //
     // Functions for finding cell based on x and y coordinates
     //
    **********************************************************/
    function getCell(x,y) {
        for (var i= 0,len=cells.length; i < len ; i++) {
            var currCell = cells[i];
            if (x >=currCell.x && x <= currCell.x+RECW && y >=currCell.y && y <= currCell.y+RECH) {
                return currCell;

             }

        }
    }

    /**********************************************************
     //
     // Functions for drawing next step
     //
     **********************************************************/

    function cellsNextStep() {
        var currCell;
        for (var i= 0,len=cells.length; i < len ; i++) {
            currCell = cells[i];
            determineNextStep(currCell);
        }

        for (var j= 0,leng=cells.length; j < leng ; j++) {
            currCell = cells[j];
            if (currCell.cellChange) {
                currCell.isAlive = currCell.nextIsAlive;
            }
            currCell.drawCell();
            currCell.cellChange = false;
            currCell.nextIsAlive = false;
        }
    }

    /**********************************************************
     //
     // Functions for determining value for next step
     //
     **********************************************************/

    function determineNextStep(cell) {
        var neighbours = cell.numNeigh();

        if (cell.isAlive) {
            if (neighbours < 2 || neighbours > 3) {
                cell.killCell();
                cell.cellChange = true;
            }

        } else {
            if (neighbours === 3) {
                cell.reviveCell();
                cell.cellChange = true;
            }
        }

    }

    //  Starting the initial function ------------------------------
    init();

/*    //testing the gun
    function gun() {
        var preStyle = new Array(9);

        for (var i = 0; i<9; i++) {
            preStyle[i] = new Array(36);
        }
        preStyle[0][24] = 1;
        preStyle[1][22] = 1;
        preStyle[1][24] = 1;
        preStyle[2][12] = 1;
        preStyle[2][13] = 1;
        preStyle[2][20] = 1;
        preStyle[2][21] = 1;
        preStyle[2][34] = 1;
        preStyle[2][35] = 1;
        preStyle[3][11] = 1;
        preStyle[3][15] = 1;
        preStyle[3][20] = 1;
        preStyle[3][21] = 1;
        preStyle[3][34] = 1;
        preStyle[3][35] = 1;
        preStyle[4][0] = 1;
        preStyle[4][1] = 1;
        preStyle[4][10] = 1;
        preStyle[4][16] = 1;
        preStyle[4][20] = 1;
        preStyle[4][21] = 1;
        preStyle[5][0] = 1;
        preStyle[5][1] = 1;
        preStyle[5][10] = 1;
        preStyle[5][14] = 1;
        preStyle[5][16] = 1;
        preStyle[5][17] = 1;
        preStyle[5][22] = 1;
        preStyle[5][24] = 1;
        preStyle[6][10] = 1;
        preStyle[6][16] = 1;
        preStyle[6][24] = 1;
        preStyle[7][11] = 1;
        preStyle[7][15] = 1;
        preStyle[8][12] = 1;
        preStyle[8][13] = 1;


        return preStyle;

    }*/

/*    function honey() {
        var preStyle = new Array(3);

        for (var i = 0; i<3; i++) {
            preStyle[i] = new Array(4);
        }
        preStyle[0][1] = 1;
        preStyle[0][2] = 1;
        preStyle[1][0] = 1;
        preStyle[1][3] = 1;
        preStyle[2][1] = 1;
        preStyle[2][2] = 1;

        return preStyle;
    }*/



    var pattern = {
        gliderGun: {
            pattern:    [[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1,null,1,null,null,null,null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null,null,null,null,null,1,1,null,null,null,null,null,null,1,1,null,null,null,null,null,null,null,null,null,null,null,null,1,1],
                        [null,null,null,null,null,null,null,null,null,null,null,1,null,null,null,1,null,null,null,null,1,1,null,null,null,null,null,null,null,null,null,null,null,null,1,1],
                        [1,1,null,null,null,null,null,null,null,null,1,null,null,null,null,null,1,null,null,null,1,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                        [1,1,null,null,null,null,null,null,null,null,1,null,null,null,1,null,1,1,null,null,null,null,1,null,1,null,null,null,null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null,null,null,1,null,null,null,null,null,1,null,null,null,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null,null,null,null,1,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null,null,null,null,null,1,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]],
            height: 9,
            width: 36

        },
        honey: {
            pattern:    [[null,1,1,null],
                        [1,null,null,1],
                        [null,1,1,null]],
            height: 3,
            width: 4
        }

    };
});


