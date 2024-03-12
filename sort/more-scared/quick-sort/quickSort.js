function quickSort(arr, start = 0, end = arr.length - 1) {
    // Base Case: start부터 end까지의 요소의 길이가 1이하면 return 해 걍.
    let count = 0;
    for (let i = start; i <= end; i++) {
        count++;
    }
    if (count <= 1) return;

    // pivot 헬퍼 함수 호출
    let pivotIndex = pivot(arr, start, end);

    // return 안해도 되잖아?
    quickSort(arr, 0, pivotIndex - 1); //left
    quickSort(arr, pivotIndex + 1, end); //right

    return arr;
}

// 이놈이 하는 건 1step, 피벗 선택해서 left, right side로 옮기는 작업
// 간과 한게 하나 있음. pivot을 활용할거면 start, end 가 꼭필요하네 한 배열을 사용할거기 때문에
function pivot(arr, start = 0, end = arr.length - 1) {
    // pivot 선택
    let pivot = arr[start];
    // 작은 놈들 counting
    let lessThanPivot = start; // 야야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1야!!!1

    // 배열 loop 돌면서 작으면 counting하고 counting 위치랑 현재 인덱스 위치에 있는 요소랑 swap => 작은것들을 한쪽으로 모으는 작업
    // i=1보다 start + 1이 낮겠다ㅣ.
    for (let i = start + 1; i <= end; i++) {
        if (pivot > arr[i]) {
            lessThanPivot++;
            [arr[i], arr[lessThanPivot]] = [arr[lessThanPivot], arr[i]]; // swap
        }
    }

    // 마지막은 pivot 위치랑, lessThanPivot swap 하면 left, right side 만들어짐
    [arr[start], arr[lessThanPivot]] = [arr[lessThanPivot], arr[start]]; // swap

    return lessThanPivot;
}

console.log(quickSort([5, 2, 1, 8, 4, 7, 6, 3]));

