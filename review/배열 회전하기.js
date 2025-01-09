// [문제 이해하기]
// 행렬을 시계 방향으로 90도, n번 돌린 값을 반환해라. 

// [접근법]
// 시계 방향: [i,j] => [j, (N-1)-i] (시계 방향이니까 오른쪽 변경으로 외우기)
// 반시계 방향: [i,j] => [(N-1)-j, i] (반시계 방향이니까 왼쪽 변경으로 외우기)

// [문제 세분화] => 동작을 분할하는 것이 좋다.
// 1. 공식을 가지고 90도씩 회전하는 함수
// 2. 함수를 n번 활용해서 답을 반환한다
function solution(arr, n) {
    let answer = arr.map(x => [...x]);
    const arrLen = arr.length;

    const rotate = (array) => {
        // 새로 만들기 귀찮아서
        const rotated = array.map(x => [...x]);

        for (let i = 0; i < arrLen; i++) {
            for (let j = 0; j < arrLen; j++) {
                rotated[j][arrLen - 1 - i] = array[i][j];
            }
        }

        return rotated;
    };

    for (let k = 0; k < n; k++) {
        answer = rotate(answer);
    }

    return answer;
}

console.log(
    solution(
        [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ],
        1,
    ),
);

console.log(
    solution(
        [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ],
        2,
    ),
);
