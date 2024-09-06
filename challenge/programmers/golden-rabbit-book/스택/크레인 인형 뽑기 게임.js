// [문제 이해하기]
// 인형 뽑기에서 크레인을 모두 작동시킨 후 터트려서 사라진 인형의 개수를 return


// [문제 세분화]
function solution(board, moves) {
    let check = [];
    let answer = 0;

    // I. 뽑기
    for (const colIdx of moves) {
        for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
            const item = board[rowIdx][colIdx - 1];
            if (!item) continue;
            const top = check[check.length - 1];
            // i. 스택에 있는 놈이랑 비교
            // i-1. 같으면 answer up and pop()
            if (check.length > 0 && item === top) {
                answer += 2;
                check.pop();
            }
            // i-2. 다르면 push() 후 break;
            else {
                check.push(item);
            }

            // I. 지워줘야함.
            board[rowIdx][colIdx - 1] = 0;

            //console.log(item, top)
            //console.log(check)
            break;
        }
    }

    return answer;
}

// 피드백 타임!
// [시간복잡도]
// O(N*M) 임!