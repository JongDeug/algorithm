// [문제 이해하기]
// 배열, comparator function을 인자로 받는 삽입 sort 구현
// 입력 : array, first class function(없을 수 도 있음), 출력 : 정렬된 배열
// 핵심 : 삽입 sort 구현, function이 없으면 오름차순으로 sort
// [구체적인 예시]
// insertionSort([4, 20, 12, 10, 7, 9]); // [4, 7, 9, 10, 12, 20]
// insertionSort(kitties, strComp); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]
// insertionSort(moarKittyData, oldestToYoungest); // sorted by age in descending order
// [문제 세분화하기]
function insertionSort(arr, comparator) {
    const swap = (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    if (typeof comparator !== 'function') {
        // ascending
        // Outer loop : 배열 길이 - 1 만큼 반복, (i가 1부터 배열 끝까지)
        for (let i = 1; i < arr.length; i++) {
            let element = arr[i];
            let j; // 마지막 인덱스를 기억해두셈
            // Inner loop : i전부터 배열 처음까지
            for (j = i - 1; j >= 0; j--) {
                // i가 j보다 작으면 바꿔야함. // 그래서 j+1에다가 j를 밀어넣고
                if (element < arr[j]) arr[j + 1] = arr[j];
                else break;
            }

            // outer loop에서 마지막으로 swap 할거임
            if (j + 1 !== i) arr[j + 1] = element;
        }
        return arr;
    }

    // Outer loop : 배열 길이 - 1 만큼 반복, (i가 1부터 배열 끝까지)
    for (let i = 1; i < arr.length; i++) {
        let element = arr[i];
        let j; // 마지막 인덱스를 기억해두셈
        // Inner loop : i전부터 배열 처음까지
        for (j = i - 1; j >= 0; j--) {
            // i가 j보다 작으면 바꿔야함. // 그래서 j+1에다가 j를 밀어넣고
            if (Math.sign(comparator(element, arr[j])) === -1) arr[j + 1] = arr[j];
            else break;
        }

        // outer loop에서 마지막으로 swap 할거임
        if (j + 1 !== i) arr[j + 1] = element;
    }
    return arr;
}

console.log(insertionSort([4, 20, 12, 10, 7, 9]));

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

function strComp(a, b) {
    if (a < b) { return -1;}
    else if (a > b) { return 1;}
    return 0;
}

console.log(insertionSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]