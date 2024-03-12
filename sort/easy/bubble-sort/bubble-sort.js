// 버블 정렬
// 왜 뒤에서부터 시작하지??

// 이게 잘못된 구현 => 좀 고쳐서 이젠 undefined까지 체킹하는거 제외하고 오류 없음.
// function bubbleSort(arr) {
//
//     // outer loop : i 선언, i는 arr 끝쪽부터 시작부분으로 진행
//     // for (let i = arr.length - 1; i >= 0; i--) { // 이건 아냐
//     for (let i = arr.length; i > 0; i--) { // => 6번 실행인데?
//         // inner loop :  j 선언, j는 i-1 지점
//         for (let j = i-1; j >= 0; j--) { // => 0까지 이니까 어차피 포함 6번째 실행 x
//             console.log(arr, arr[j], arr[j+1])
//             // j, j+1 비교 후 원하는대로 정렬(난 오름차순으로 정렬할거임)
//             if (arr[j] < arr[j + 1]) swap(arr, j, j+1);
//         }
//     }
//     // 반환
//     return arr;
// }

let count = 0

// // 올바른 구현
function bubbleSort(arr){

    for(let i = arr.length; i>0; i--){
        // i-1인 이유는, j가 step1에서 배열 마지막 요소까지 접근할텐데 없는 요소까지 접근할 필요가 없으니까 -1해주는거임
        for(let j = 0; j < i-1; j++) {
            count++
            console.log(arr, arr[j], arr[j+1])
            if (arr[j] > arr[j + 1]) swap(arr, j, j+1);
        }
    }

    return arr;
}

const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

// console.log(bubbleSort([20,19, 1, 2, 3]))
// console.log(bubbleSort([3, 2, 1, 19, 20]))
console.log(bubbleSort([8,1,2,3,4,5,6,7]))
console.log(count)