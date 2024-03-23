// [문제 이해하기]
// 배열과 함수를 인자로 준다. 함수의 반환 값은 sort에 들어가는 콜백 함수랑 같음. 여튼 그걸로 버블 정렬을 해라.
// 입력 : array, callback function, 출력 : sorted array
// 핵심 : 버블 정렬로 구현, 콜백 함수의 반환 값으로 배열을 정리한다.
// [구체적인 예시]
// 콜백 함수의 반환값을 사용하면 된다.
// 콜백 함수가 없다면, 오름차순으로 정렬하라.
// [문제 세분화 하기]
function bubbleSort(arr, callback) {
    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    if (typeof callback !== 'function') {
        // Outer loop : 배열의 크기만큼 반복함.
        for (let i = arr.length - 1; i > 0; i--) {
            // Inner loop : 배열의 처음 인덱스 부터 끝까지(점점 끝이 줄어듦)
            for (let j = 0; j < i; j++) {
                // +1 값과 비교하고, j < (j + 1) 면 j를 j+1 위치로 옮겨야.
                if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
            }
        }
        return arr;
    }

    // Outer loop : 배열의 크기만큼 반복함.
    for (let i = arr.length - 1; i > 0; i--) {
        // Inner loop : 배열의 처음 인덱스 부터 끝까지(점점 끝이 줄어듦)
        for (let j = 0; j < i; j++) {
            // +1 값과 비교하고, j < (j + 1) 면 j를 j+1 위치로 옮겨야.
            if (Math.sign(callback(arr[j], arr[j + 1])) === 1) swap(arr, j, j + 1);
        }
    }

    // return 정렬된 배열
    return arr;
}

var moarKittyData = [{
    name: 'LilBub',
    age: 7,
}, {
    name: 'Garfield',
    age: 40,
}, {
    name: 'Heathcliff',
    age: 45,
}, {
    name: 'Blue',
    age: 1,
}, {
    name: 'Grumpy',
    age: 6,
}];


function oldestToYoungest(a, b) {
    return b.age - a.age;
}

// var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
//
// function strComp(a, b) {
//     if (a < b) { return -1;}
//     else if (a > b) { return 1;}
//     return 0;
// }

// console.log(bubbleSort(moarKittyData, oldestToYoungest));
console.log(bubbleSort([4, 20, 12, 10, 7, 9]))
console.log(bubbleSort([]))
