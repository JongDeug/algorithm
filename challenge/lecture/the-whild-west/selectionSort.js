// [문제 이해하기]
// bubble sort 문제와 같이 배열, 함수를 받아서 선택 정렬로 요소를 정렬하기.
// 입력 : arr, callback, 출력 : 정렬된 배열
// 핵심 : 정렬을 똑같이 하되, 콜백함수가 없으면? 오름차순으로 그냥 정렬하기
// [구체적인 예시 찾기]
// selectionSort([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
// selectionSort(kitties, strComp); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]
// selectionSort(moarKittyData, oldestToYoungest); // sorted by age in descending order
// [문제 세분화 하기[
function selectionSort(arr, callback) {
    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    if (typeof callback !== 'function') {
        // 오름차순으로 정렬하기
        // Outer loop : 찾을 배열의 앞부분이 점점 작아져야 하므로.
        for (let i = 0; i < arr.length; i++) {
            // 가장 작은 요소의 인덱스를 담을 변수 선언.
            let minIndex = i;

            // Inner loop : 가장 작은 요소의 인덱스를 찾는다. 찾을 배열의 앞부분이 점점 작아짐.
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[minIndex] > arr[j]) minIndex = j;
            }

            // minIndex, i가 같지 않을 때 swap 한다.
            if (i !== minIndex) swap(arr, i, minIndex);
        }
        return arr;
    }

    // Outer loop : 찾을 배열의 앞부분이 점점 작아져야 하므로.
    for (let i = 0; i < arr.length; i++) {
        // 가장 작은 요소의 인덱스를 담을 변수 선언.
        let minIndex = i;

        // Inner loop : 가장 작은 요소의 인덱스를 찾는다. 찾을 배열의 앞부분이 점점 작아짐.
        for (let j = i + 1; j < arr.length; j++) {
            if (Math.sign(callback(arr[minIndex], arr[j])) === 1) minIndex = j;
        }

        // minIndex, i가 같지 않을 때 swap 한다.
        if (i !== minIndex) swap(arr, i, minIndex);
    }


    return arr;
}

console.log(selectionSort([4, 20, 12, 10, 7, 9]));
// var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
//
// function strComp(a, b) {
//     if (a < b) { return -1;}
//     else if (a > b) { return 1;}
//     return 0;
// }
//
// console.log(selectionSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]
//
// var moarKittyData = [{
//     name: "LilBub",
//     age: 7
// }, {
//     name: "Garfield",
//     age: 40
// }, {
//     name: "Heathcliff",
//     age: 45
// }, {
//     name: "Blue",
//     age: 1
// }, {
//     name: "Grumpy",
//     age: 6
// }];
//
// function oldestToYoungest(a, b) {
//     return b.age - a.age;
// }
// console.log(selectionSort(moarKittyData, oldestToYoungest)); // sorted by age in descending order