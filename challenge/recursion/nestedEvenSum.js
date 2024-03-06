// [문제 이해하기]
// 중첩된 객체를 재귀로 돌면서 짝수의 합을 구하는 함수를 구현해라.
// Input : object
// Output : integer
// 가장 중요하다고 생각하는 것? : 중첩된 객체를 푸는거, 재귀 함수로 구현 하는 것

// [구체적인 예제 찾기]
var obj1 = {
    outer: 2,
    obj: {
        inner: 2,
        otherObj: {
            superInner: 2,
            notANumber: true,
            alsoNotANumber: 'yup',
        },
    },
};

var obj2 = {
    a: 2,
    b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
    c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
    d: 1,
    e: { e: { e: 2 }, ee: 'car' },
};

// nestedEvenSum(obj1); // 6
// nestedEvenSum(obj2); // 10

// 빈 입력 값?
// {} // 0

// [문제 세분화 하기]
// 중첩된 객체를 재귀로 돌면서 짝수의 합을 구하는 nestedEvenSum 함수 구현
// helper 사용하는게 진짜 유용하네. 재귀는 helper로 극복한다.
function nestedEvenSum(obj) {
    // sum 변수 선언
    let sum = 0;

    // helper 구현
    function helper(input) {
        // Base Case : obj 값이 없으면 return
        if (input.constructor === Object && Object.keys(input).length === 0) return;

        let key = Object.keys(input)[0];
        let value = input[key];

        // 만약 value가 object이면 재귀를 한 번더 돌아야함.
        if (value.constructor === Object) {
            helper(value);
        }
        // value가 짝수인지 확인하고 sum에 더하기
        else if (Number.isInteger(value) && value % 2 === 0) {
            sum += value;
        }

        delete input[key];
        // return helper 재귀 argv : input.
        return helper(input);
    }

    // helper 실행, 인자값 obj
    helper(obj);
    return sum;
}

console.log(nestedEvenSum(obj1));
console.log(nestedEvenSum(obj2));
