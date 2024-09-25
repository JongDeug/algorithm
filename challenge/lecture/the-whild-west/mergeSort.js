import merge from './merge.js';
// [문제 이해하기]
// 합병 함수 구현하기, 정렬된 새로운 배열을 만드는 건 이미 구현함.
// 입력 : arr, comparator, 출력 : sorted array
// 핵심 : 재귀로 구현(Base Case, return)
// [문제 세분화하기]
function mergeSort(arr, comparator) {
    if (arr.length <= 1) return arr;

    let middle = Math.ceil(arr.length / 2);
    let left = mergeSort(arr.slice(0, middle), comparator);
    let right = mergeSort(arr.slice(middle), comparator);
    return merge(left, right, comparator);
}

console.log(mergeSort([4, 20, 12, 10, 7, 9]));

var kitties = ['LilBub', 'Garfield', 'Heathcliff', 'Blue', 'Grumpy'];

function strComp(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

console.log(mergeSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]