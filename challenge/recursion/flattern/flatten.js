// [문제 이해하기]
// 중첩된 배열을 1차원 배열로 만드는 flatten 함수 구현
// Input : nested array of integers
// Output : array of integers
// 가장 중요한 것? 재귀로 문제를 해결해야함. spread operator를 사용하는 것은 어떨까??

// [구체적인 예시 찾기]
// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]

// 빈 배열, 무효한 입력
// [] // []

// [문제 세분화 하기]
// 중첩된 배열을 1차원 배열로 만들어주는 flatten 배열 구현
// 헬퍼 함수 사용하자.
function flatten(nestedArray) {
    // result 배열 선언
    let result = [];

    // helper 함수 구현
    function helper(input) {
        // Base Case: input 길이가 0이라면 그냥 return
        if (input.length === 0) return;

        // 만약 input[0]가 배열이 아니라면 result push
        if (!Array.isArray(input[0])) {
            result.push(input[0]);
        }else {
            helper(input[0])
        }

        // return helper(), 인자는 input ...input.slice(1)
        return helper(input.slice(1))
    }

    // helper 함수 실행, argv(인자값은) nestedArray
    helper(nestedArray);

    // result 배열 반환
    return result;
}

// console.log(flatten([1, 2, 3, [4, 5] ]))
console.log(flatten([1, [2, [3, 4], [[5]]]]));