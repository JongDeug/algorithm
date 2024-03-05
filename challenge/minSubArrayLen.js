// [문제 이해하기]
// 내 방식대로 정의하기
// 숫자 배열, n이 인자로 주어지는데 n보다 크거나 같은 sub 배열의 최소 길이를 반환하는 함수를 구현하라.

// 입력, 출력값 분석하기
// 입력 : array of integers, number
// 출력 : boolean

// 문제에서 가장 중요한 것?
// 시간 복잡도가 O(n^2)이 되면 안됨. sliding window 패턴을 사용해야함.

// [구체적인 예제 찾기]
// 간단한 예제
// minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
// 좀 더 복잡한 예제
// minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 [62], 길이가 가장 작은 subarray이므로
// minSubArrayLen([1,4,16,22,5,7,8,9,10],95) // 0
// 무효한 값?
// 0으로 반환하면 되잖아.

// [문제 세분화하기]
function minSubArrayLen(list, num) {
    if (list.length === 0) return 0

    // 정렬을 해 O(n)
    // 1,4,5,7,8,9,10,16,22 | 39
    let sortedList = list.sort((a, b) => a - b);
    let sum = 0;
    let result = [];

    // (어차피 정렬을 하고 큰 요소들의 합이 최소 길이)
    // 큰 인덱스부터 0까지 반복해서 sum 변수, 어떤 리스트에 넣어
    for (let i = list.length - 1; i >= 0; i--) {
        sum += sortedList[i];
        result.push(sortedList[i]);

        // sum 변수가 39보다 크거나 같으면 루프 탈출해서 리스트 길이 반환
        if (sum >= num) return result.length;
    }

    return 0
}

// 이게 맞긴한데 정렬하는게 아닌듯?
// 배열 그대로 써야하나봐




// console.log(minSubArrayLen([2,3,1,2,4,3], 7))
// console.log(minSubArrayLen([2,1,6,5,4], 9))
// console.log(minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52))
// console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],39))
// console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],55))
console.log(minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11))
// console.log(minSubArrayLen([1,4,16,22,5,7,8,9,10],95))