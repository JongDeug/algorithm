// [문제 이해하기]
// 프렌즈 게임. 2*2 맞춰지면 삭제를 반복해서 마지막으로 빈 블록이 몇 개인지 출력하는 함수 구현

// 입력: m(높이), n(폭), board(배열)
// 출력: 빈 블록 개수, int

// [문제 이해하기]
// 프렌즈 게임. 2*2 맞춰지면 삭제를 반복해서 마지막으로 빈 블록이 몇 개인지 출력하는 함수 구현

// 입력: m(높이), n(폭), board(배열)
// 출력: 빈 블록 개수, int

// 리펙토링 완료
function solution(m, n, board) {
    let answer = 0;
    board = board.map(x => x.split('')); // 문자열 자르기

    // Helper
    return (function helper() {
        // Memory
        let store = [];

        // I1. m-1, n-1 범위에서 삭제
        for(let i=0; i < m-1; i++) {
            for(let j=0; j < n-1; j++) {
                let emoji = board[i][j];
                // 모두 같음
                if(emoji !== '' && emoji === board[i][j+1] && emoji === board[i+1][j] && emoji === board[i+1][j+1]) {
                    store.push([i,j]);
                    store.push([i,j+1]);
                    store.push([i+1,j]);
                    store.push([i+1,j+1]);
                }
            }
        }

        // Base Case, 같은게 없으면 종료(store)에 저장된 것이 없으면 종료.
        // I2. store에 저장된 인덱스에 접근해서 모두 ''로 바꿈
        if(store.length) {
            for(const s of store) {
                board[s[0]][s[1]] = '';
            }
        } else {
            // console.log([].concat(...board))
            return board.flat().filter(e => e === '').length;
        }
        // console.log(board);

        // I3. 아래로 끌기, 흠 이게 어렵네(이게 3중 for문인데 input이 30이라 가능한 거임)
        for (let length = 0; length < m; length++) {
            for (let i=0; i < m-1; i++) {
                for (let j=0; j < n; j++) {
                    if(board[i+1][j] === '') {
                        [board[i][j], board[i+1][j]] = [board[i+1][j], board[i][j]];
                    }
                }
            }
        }

        return helper();
    })();
}

// 리펙토링 전 코드
// function solution(m, n, board) {
//     let answer = 0;
//     board = board.map(x => x.split('')); // 문자열 자르기
//
//     // Helper
//     (function helper() {
//         // Memory
//         let store = [];
//
//         // I1. m-1, n-1 범위에서 삭제
//         for(let i=0; i < m-1; i++) {
//             for(let j=0; j < n-1; j++) {
//                 let emoji = board[i][j];
//                 // 모두 같음
//                 if(emoji !== '' && emoji === board[i][j+1] && emoji === board[i+1][j] && emoji === board[i+1][j+1]) {
//                     store.push([i,j]);
//                     store.push([i,j+1]);
//                     store.push([i+1,j]);
//                     store.push([i+1,j+1]);
//                 }
//             }
//         }
//
//         // Base Case, 같은게 없으면 종료(store)에 저장된 것이 없으면 종료.
//         // I2. store에 저장된 인덱스에 접근해서 모두 ''로 바꿈
//         if(store.length) {
//             for(const s of store) {
//                 board[s[0]][s[1]] = '';
//             }
//         } else return;
//
//         // console.log(board);
//
//         // I3. 아래로 끌기, 흠 이게 어렵네(이게 3중 for문인데 input이 30이라 가능한 거임)
//         for (let length = 0; length < m; length++) {
//             for (let i=0; i < m-1; i++) {
//                 for (let j=0; j < n; j++) {
//                     if(board[i+1][j] === '') {
//                         [board[i][j], board[i+1][j]] = [board[i+1][j], board[i][j]];
//                     }
//                 }
//             }
//         }
//
//         // console.log(board)
//         helper();
//     })();
//
//     // console.log(board);
//
//     for(let i=0; i < m; i++) {
//         for(let j=0; j < n; j++) {
//             if(board[i][j] === '') answer++;
//         }
//     }
//
//     return answer;
// }