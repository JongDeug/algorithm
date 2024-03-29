// 배열에서 하나의 창을 만들어 이동하면서 문제를 해결하는 패턴
// O(n^2) 시간 복잡도를 O(n)으로 개선시킬 수 있음.

// 예시) maxSubarraySum 문제
// 배열, n을 인자로 받고 n번 연속된 요소들의 최대 합을 구하는 문제
// ([1,2,5,2,8,1,5], 2) // 10
// ([],4) // null

function maxSubarraySum(arr, n) {
    if (arr.length < n) return null;

    let maxSum = 0;
    let tempSum = 0;

    for (let i = 0; i < n; i++) {
        maxSum += arr[i];
    }
    tempSum = maxSum;

    // n부터 시작 (window를 옮겨 가며 합을 구함)
    for (let i = n; i < arr.length; i++) {
        tempSum = tempSum - arr[i - n] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}

console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3));

// 예전에 작성했던 코드, sliding-window 패턴을 적용하지 않음.
// O(n^2) 시간 복잡도를 가짐.
// function maxSubarraySum(arr, n) {
//     // []일 경우 null 처리
//     if (arr.length === 0) return null;
//     // 반환 값 max 변수 선언
//     let max = 0;
//     // index 변수 선언
//     let index = 0;
//     // 2중 루프를 만들고
//     // 1차로 index가 arr 길이를 넘어서면 중지
//     // index < arr.length &&
//     while (index + n <= arr.length) {
//         // 2차로 n만큼 쭉 연속해서 다 더함 (max)
//         let sum = 0;
//         for (let i = index; i < index + n; i++) {
//             sum += arr[i];
//         }
//         max = max < sum ? sum : max;
//         index++;
//     }
//     return max;
// }

