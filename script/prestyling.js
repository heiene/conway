/**
 * Created with JetBrains WebStorm.
 * User: rykket
 * Date: 6/22/13
 * Time: 10:29 AM
 * To change this template use File | Settings | File Templates.
 */
function gun() {
    var preStyle = new Array(9);

    for (var i = 0; i<9; i++) {
        preStyle[i] = new Array(35);
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

}