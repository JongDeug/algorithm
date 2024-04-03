// 좀 틀린 구현
// function solution(board) {
//     let OCount = 0;
//     let XCount = 0;
//
//     // I1. 일단 개수 체크
//     for (let i = 0; i<3; i++) {
//         for (let j = 0; j<3; j++) {
//             if(board[i][j] === 'O') OCount++;
//             else if(board[i][j] === 'X') XCount++;
//         }
//     }
//
//     // I2. 당연한 예외
//     if(OCount < XCount) return 0;
//     if(OCount - XCount >= 2) return 0;
//
//     // I3. 틱택톡을 찾는다.
//     let O = false;
//     let X = false;
//     if(board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
//         if(board[0][0] === 'O') O = true;
//         else X = true;
//     }
//     if(board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
//         if(board[1][0] === 'O') O = true;
//         else X = true;
//     }
//     if(board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
//         if(board[2][0] === 'O') O = true;
//         else X = true;
//     }
//     if(board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
//         if(board[0][0] === 'O') O = true;
//         else X = true;
//     }
//     if(board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
//         if(board[0][1] === 'O') O = true;
//         else X = true;
//     }
//     if(board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
//         if(board[0][2] === 'O') O = true;
//         else X = true;
//     }
//     if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
//         if(board[0][0] === 'O') O = true;
//         else X = true;
//     }
//     if(board[0][2] === board[2][2] && board[2][2] === board[2][0]) {
//         if(board[0][2] === 'O') O = true;
//         else X = true;
//     }
//
//     if(O && X) {
//         return 0;
//     } else if(O) {
//         if(XCount < OCount) return 1;
//         else return 0;
//     } else if(X) {
//         if(XCount === OCount) return 1;
//         else return 0;
//     }
//
//     return 1;
// }

// [문제 이해하기] (refactoring)
// 입력 : 배열, 출력 : 0 or 1

// 다 잘했는데
// if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
//     if (board[0][0] === 'O') O = true;
//     else X = true;                        => 이렇게 되면 '.'도 되어버림;
// }
function solution(board) {
    let OCount = 0;
    let XCount = 0;

    // I1. 일단 개수 체크
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 'O') OCount++;
            else if (board[i][j] === 'X') XCount++;
        }
    }

    // I2. 당연한 예외
    // if (OCount < XCount) return 0;
    // if (OCount - XCount >= 2) return 0;
    if (OCount < XCount || 1 < OCount - XCount) return 0;

    // I3. 틱택톡을 찾는다.
    let O = checkTicTaeToe(board, 'O');
    let X = checkTicTaeToe(board, 'X');


    if (O && X) return 0;
    if (O && OCount - XCount !== 1) return 0;
    if (X && XCount !== OCount) return 0;

    return 1;
}

function checkTicTaeToe(board, sign) {
    // 가로, 세로
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] === sign && board[i][1] === sign && board[i][2] === sign) {
            return true;
        }
        if (board[0][i] === sign && board[1][i] === sign && board[2][i] === sign) {
            return true;
        }
    }

    // 대각선
    if (board[0][0] === sign && board[1][1] === sign && board[2][2] === sign) {
        return true;
    }
    if (board[0][2] === sign && board[1][1] === sign && board[2][0] === sign) {
        return true;
    }

    return false;
}