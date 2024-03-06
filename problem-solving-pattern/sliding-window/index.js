// 문제를 이해하자.
// 1. 문제 재정의
// array of integers, n을 인자로 받는데 n번 연속된 요소들의 최대 합을 구하는 maxSubarraySum 함수를 구현하라.
// 2. 입 / 출력 값
// input : array of integers, n
// output : sum or null
// 3. 이 문제에서 가장 중요하다고 생각하는 것?
// sliding window pattern을 사용하는 것. 아직 뭔지 모름 그냥 구현해보자.

// 구체적인 예시를 찾아라
// ([1,2,5,2,8,1,5], 2) // 10
// ([],4) // null

// 문제를 세분화 하라. 내가 작성할 코드를 글로 간략하게 적어보자.
// array of integers, n 을 인자 값으로 받아서 n번 연속하는 최대 합을 구하는 함수 작성
function maxSubarraySum(arr, n) {
    // []일 경우 null 처리
    if (arr.length === 0) return null;
    // 반환 값 max 변수 선언
    let max = 0;
    // index 변수 선언
    let index = 0;
    // 2중 루프를 만들고
    // 1차로 index가 arr 길이를 넘어서면 중지
    // index < arr.length &&
    while (index + n <= arr.length) {
        // 2차로 n만큼 쭉 연속해서 다 더함 (max)
        let sum = 0;
        for (let i = index; i < index + n; i++) {
            sum += arr[i];
        }
        max = max < sum ? sum : max;
        index++;
    }

    // return
    return max;
}

// console.log(maxSubarraySum([1,2,5,2,8,1,5],2))
// console.log(maxSubarraySum([1,2,5,2,8,1,5],4))
// console.log(maxSubarraySum([],4))
console.log(maxSubarraySum([4, 2, 1, 6, 2], 4));
