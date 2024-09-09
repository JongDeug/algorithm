function solution(arr, target) {
    let dictionary = {};

    // I. dict 만들기
    for (const item of arr) {
        dictionary[item] = dictionary[item] + 1 || 1;
    }

    // I. 임의의 배열 아이템을 가지고 dict 이랑 비교해서 확인하기
    for (const item of arr) {
        // I. 중복값 처리
        if (dictionary[item]) dictionary[item]--;

        let key = target - item;
        if (dictionary[key]) {
            return true;
        }
    }
    return false;
}

console.log(solution([1, 2, 3, 4, 8], 6));
console.log(solution([2, 3, 5, 9], 10));
console.log(solution([1, 3, 2024, 1000], 6));
