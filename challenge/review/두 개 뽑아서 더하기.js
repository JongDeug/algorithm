// [문제 이해하기]
// 서로 다른 인덱스에 있는 2개의 수를 뽑아 더해 만들 수 있는 모든 수를 오름차순으로 담아 반환

// [제약 조건]
// numbers의 길이는 2이상 100이하

// [문제 세분화]
function solution(numbers) {
    // set 자료구조를 이용한다 
    const data = new Set();

    // 이중 반복문을 사용해 값을 더해서 set.add
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            data.add(numbers[i] + numbers[j]);
        }
    }

    // 오름차순으로 정렬 후 반환한다 
    // data에 들어갈 수 있는 요소의 개수가 최악의 경우에는 O(n^2)이 맞지. 이중 for문 다 돌리면 ㅇㅇ
    return [...data].sort((a, b) => a - b);
}

console.log(solution([2, 1, 3, 4, 1]));
console.log(solution([5, 0, 2, 7]));