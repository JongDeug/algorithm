// [문제 이해하기]
// 행렬곱을 구하는 함수 구현
// 입력 : arr1, arr2 출력 : arr

function solution(arr1, arr2) {
    var answer = [];

    // I1. arr1에서 배열 pop
    while(arr1.length) {
        const elements = arr1.shift();
        let buffer = [];

        // I2. arr2 이중 for문, elements 인덱스 === arr2 행
        for (let col = 0; col < arr2[0].length; col++) {
            let mul = 0;
            for (let row = 0; row < arr2.length; row++) {
                mul += (elements[row] * arr2[row][col]);
            }
            buffer.push(mul);
        }

        answer.push(buffer);
    }

    console.log(answer)

    return answer;
}
