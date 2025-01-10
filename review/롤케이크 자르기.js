// [문제 이해하기]
// 토핑을 공평하게 나눌 수 있다면 그 방법의 수를 return 

// [구체적인 예시]
// [1,2,3,2,1,5] => [1,2,3], [2,1,5] => return 1

// [접근법]
// (틀린 접근법) O(N^2)
// 반복문을 통해 케이크를 자른다. (N)
// 잘린 배열의 count를 측정한다. (slice 해야하므로 N)
// 비교해서 같으면 count 측정

// (올바른 접근법) O(N)
// 토핑의 개수를 map에 저장해놓는다.
// 반복문을 통해 케이크를 자른다.
// set을 통해 내가 가진 토핑 개수와 형이 가진 토핑 개수와 비교해서 같으면 ++
function solution(topping) {
    let answer = 0;

    const me = new Set();
    const brother = new Map();

    for (const item of topping) {
        // item이 나오면 1부터 시작
        brother.set(item, (brother.get(item) || 0) + 1);
    }

    for (const item of topping) {
        me.add(item);
        brother.set(item, brother.get(item) - 1);

        // brother 요소의 수와 me의 수랑 비교 하므로 count값이 0이되면 key 제거
        if (brother.get(item) === 0) brother.delete(item);
        if (brother.size === me.size) answer++;
    }

    return answer;
}

console.log(solution([1, 2, 1, 3, 1, 4, 1, 2]));

console.log(solution([1, 2, 3, 2, 1, 5]));