// [문제 이해하기]
// 내 방식대로 정의하기
// 인자로 정수 배열과 숫자가 주어지는데 주어진 숫자 만큼 배열을 더해서 최대합을 구하는 maxSubarraySum 함수 구현

// 입 / 출력값 분석하기
// 입력 : array of integers, integer
// 출력 : sum(integer)

// 문제에서 가장 중요한 것?
// sliding window로 구현해야함. 시간 복잡도가 O(N^2)이 되면 안됨.
// 즉, 중첩 for loop로 구현하지 말아야함.

// [구체적인 예시]
// 간단한 예제
// maxSubarraySum([100,200,300,400], 2) // 700
// 좀 더 복잡한 예제
// maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) // 5
// 무효한 입력
// maxSubarraySum([2,3], 3) // null
// maxSubarraySum([], 3) // null

// [문제 세분화하기]
function maxSubarraySum(list, range) {
    if(list.length < range) return null

    // 제일 처음 sum을 구하고 이것을 maxSum으로 간주
    let maxSum = 0;
    let sum = 0;

    for (let i = 0; i < range; i++) {
        sum += list[i];
    }
    maxSum = sum

    // for loop를 돌면서 처음 인덱스 값을 빼고 새로운 인덱스 값을 더한 maxSum을 구하면 됨.
    for (let i = 0; i < list.length; i++) {
        sum = (sum - list[i] + list[i+range])
        if (maxSum < sum) maxSum = sum
    }

    return maxSum
}

console.log(maxSubarraySum([100,200,300,400], 2))
console.log(maxSubarraySum([1,4,2,10,23,3,1,0,20], 4))
console.log(maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2))
console.log(maxSubarraySum([2,3], 3))