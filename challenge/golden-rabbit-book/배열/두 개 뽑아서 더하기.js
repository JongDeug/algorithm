// [문제 이해하기]
// 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를 구하고 오름차순으로 담아!

// [구체적 예시]
// [2,1,3,4,1] => [3,5,6,3,4,5,2,7,4,5] => [2,3,4,5,6,7]

// [문제 세분화]
function solution(numbers) {
    let arr = [];
    // I. 이중 for 문으로 다 더해서 정답 배열에 넣기
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            arr.push(numbers[i] + numbers[j]);
        }
    }
    // I. 정답 배열 오름차순으로 정렬
    return [...new Set(arr)].sort((a, b) => a - b);
}