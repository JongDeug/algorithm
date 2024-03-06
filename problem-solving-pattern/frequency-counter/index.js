// 문제를 이해하자
// same 함수를 구현해라, 첫 번째 배열의 요소들을 제곱한 것이 두 번째 배열에 있어야 한다., 빈도수도 같아야 한다.

// 입, 출력 값 분석
// 입력 : array of integers
// 출력 : boolean

// 이 문제에서 가장 중요한 것은?
// 첫 번째 배열을 제곱했을 때 두 번째 배열이랑 같아야 한다. same 함수, 빈도 수 체킹

// 예시
// [1,2,3], [1,4,9] : true
// [1,2,3], [1,9] : false
// [1,2,1], [4,4,1] : false

// break it down 세분화

// 첫 번째 배열의 요소들을 제곱한 것이 두 번째 배열의 요소와 동일해야 한다. (+ 빈도수도 동일해야 한다)
function same(arr1, arr2) {
    // 빈도 수도 동일 해야한다.
    if (arr1.length !== arr2.length) return false;
    else {
        // 정렬을 하고,
        arr1.sort((a, b) => a - b);
        arr2.sort((a, b) => a - b);

        // arr1[i]를 제곱해서 arr[2]와 비교하는 루프를 작성한다.
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] ** 2 !== arr2[i]) return false;
        }
        return true;
    }
}

console.log(same([1, 2, 3, 2], [4, 4, 1]));
