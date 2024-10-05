// [문제 이해하기]
// 오징어 게임인데 이기는 플레이어가 최대한 빨리 끝내고, 지는 플레이어는 최대한 오래 버티는 경우 중 두 캐릭터 최대 합을 구해라.

// [문제 풀이]
// * 특정 플레이어가 더 이상 움직일 수 없는 경우
// -> 게임 종료
// * 특정 플레이어가 어느 위치로 이동해도 전부 지는 경우
// -> 해당 플레이어는 최선을 다해야 하므로 최대한 많이 이동
// * 특정 플레이어가 특정 위치로 이동하면 이기고 특정 위치로 이동하면 지는 경우
// -> 해당 플레이어는 최선을 다한다고 했으므로 무조건 이기는 위치로 이동
function solution(board, aloc, bloc) {
  const rowLen = board.length;
  const colLen = board[0].length;

  // 상하좌우
  const drow = [-1, 1, 0, 0]; // y
  const dcol = [0, 0, -1, 1]; // x

  const isValidPos = (r, c) => {
    return 0 <= r && r < rowLen && 0 <= c && c < colLen;
  };

  const recursive = (apos, bpos, visited, step) => {
    // I. 짝수 A턴, 홀수 B턴
    const [r, c] = step % 2 === 0 ? apos : bpos;
    let canMove = false;
    let isOpponentWinner = true; // 상대편 이김

    // I. 현재 플레이어가 이긴 경우, 진 경우
    const winSteps = [];
    const loseSteps = [];

    for (let k = 0; k < 4; k++) {
      const nr = r + drow[k];
      const nc = c + dcol[k];

      // I. 이동 가능 ?  && board[nr][nc] => 0, 1로 이뤄져있음. 발판
      if (isValidPos(nr, nc) && !visited.has(`${nr},${nc}`) && board[nr][nc]) {
        canMove = true;

        // I. 이동 가능하면서 두 플레이어 위치가 같다면 ? A가 이긴거, 이동 후 발판 없어지기 때문
        if (apos[0] === bpos[0] && apos[1] === bpos[1]) {
          return [true, step + 1];
        }

        // 다음으로 이동 ~, 반환 값은 상대 플레이어에 대한 변수들임
        const [win, stepsLeft] =
          step % 2 === 0
            ? recursive(
                [nr, nc],
                bpos,
                new Set([...visited, `${r},${c}`]),
                step + 1,
              )
            : recursive(
                apos,
                [nr, nc],
                new Set([...visited, `${r},${c}`]),
                step + 1,
              );

        isOpponentWinner &= win; // 상대편이 이겼다고 회신이 왔을 때

        // 상대가 이겼으면 넣어라 win에 넣어라
        if (win) {
          winSteps.push(stepsLeft);
        } else {
          loseSteps.push(stepsLeft);
        }
      }
    }
    // I. 이동할 수 없으면?
    if (!canMove) return [false, step];

    // I. 상대편이 이긴경우
    if (isOpponentWinner) return [false, Math.max(...winSteps)];
    // I. 현 플레이어가 이긴 경우 min 주의!
    return [true, Math.min(...loseSteps)];
  };

  const [_, steps] = recursive(aloc, bloc, new Set(), 0);
  return steps;
}
