// [문제 이해하기]
// A, B 플레이어가 최선을 다해 플레이에 임했을 때 움직인 횟수의 합을 구해라.

// [참고]
// https://school.programmers.co.kr/questions/25678

// [조건]
// 특정 플레이어가 더 이상 움직일 수 없는 경우
// -> 현재 턴에 있는 사람이 패배, 게임 종료
// 같은 위치에 있을 때 
// -> 현재 턴에 있는 사람이 승
// 현 플레이어가 지는 경우 최대한 오래 버티는 것이 중요
// 현 플레이어가 이기는 경우 상대를 더 빨리 이기기 위한 것이 중요

// [접근법]
// DFS로 모든 경우를 다 구해야 함.

function solution(board, aloc, bloc) {
    // 상하좌우, isValid 
    const rowLen = board.length;
    const colLen = board[0].length;
    const [dy, dx] = [[-1, 1, 0, 0], [0, 0, -1, 1]];
    const isValid = (y, x) => {
        return x >= 0 && x < colLen && y >= 0 && y < rowLen && board[y][x];
    };

    // 재귀 함수 작성
    const dfs = (apos, bpos, visited, step) => {
        // 짝수 A, 홀수 B 턴
        const [y, x] = step % 2 === 0 ? apos : bpos;

        let canMove = false;
        // 상대편이 위너냐?
        let isOpponentWinner = true;

        // 이전 턴의 step을 담는 배열
        const winSteps = [];
        const loseSteps = [];

        // 4방향으로 이동할 때 움직일 수 있는 경우 
        for (let k = 0; k < 4; k++) {
            const ny = y + dy[k];
            const nx = x + dx[k];

            if (isValid(ny, nx) && !visited.has(`${ny},${nx}`)) {
                canMove = true;

                // Base Case
                // 움직일 수 있으면서 두 플레이어가 같은 위치에 있는 경우
                if (apos[0] === bpos[0] && apos[1] === bpos[1]) {
                    return [true, step + 1];
                }

                // 재귀 및 반환값 저장
                const [win, returnedStep] = step % 2 === 0
                    ? dfs([ny, nx], bpos, new Set([...visited, `${y},${x}`]), step + 1)
                    : dfs(apos, [ny, nx], new Set([...visited, `${y},${x}`]), step + 1);

                // 상대편 회신
                isOpponentWinner = isOpponentWinner & win;

                if (win) {
                    winSteps.push(returnedStep);
                } else {
                    loseSteps.push(returnedStep);
                }
            }
        }

        // 움직일 수 없는 경우, 패배 게임 끝
        if (!canMove) return [false, step];

        // 각자 최선을 다하므로 
        // 현 플레이어가 지면, 상대방이 이긴 수 중에서 최대한 오래 버티는 수 선택
        if (isOpponentWinner) return [false, Math.max(...winSteps)];
        // 현 플레이어가 이기면, 상대방을 더 빨리 이기기 위해 상대방이 진 수 중에서 최대한 적은 수 선택
        else return [true, Math.min(...loseSteps)];
    };

    const [_, steps] = dfs(aloc, bloc, new Set(), 0);
    return steps;
}

console.log(solution([[1, 1, 1], [1, 1, 1], [1, 1, 1]], [1, 0], [1, 2]));