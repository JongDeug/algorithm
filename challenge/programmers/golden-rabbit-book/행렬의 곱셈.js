// [문제 이해하기]
// 행렬 곱 구하는 프로그램을 짜라.

// 메커니즘
// 행렬 곱은 arr1의 행의 개수와 arr2의 열의 개수가 맞아야 곱을 할 수 있음
// 삼중 for 문을 쓴 이유는 아래와 같은 메커니즘을 가지기 때문임. 곱해보셈
// 1. arr1 행 고정 후
// 2. arr2 열 고정 후
// 3. k 로 곱을 함

// [문제 세분화]
function solution(arr1, arr2) {
    let answer = Array.from({ length: arr1.length }, () => new Array(arr2[0].length));
    // I. 삼중 for문
    // I. i => arr1의 행
    // I. j => arr2의 열
    // I. k => arr1의 열 or arr2의 행 수
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2[0].length; j++) {
            let element = 0;
            for (let k = 0; k < arr1[0].length; k++) {
                element += arr1[i][k] * arr2[k][j];
            }
            answer[i][j] = element;
        }
    }
    return answer;
}
