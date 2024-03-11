// [문제 이해하기]
// 객체를 받아서 문자열에 해당하는 놈들을 뽑아서 배열로 만들어주는 함수를 구현하라.
// Input : object
// Output : array of strings
// 중요하다고 생각하는 것? 헬퍼 메소드를 사용해서 재귀 함수를 구현하자(base case, return 꼭 필요)

// [구체적인 예시 찾기]
const obj = {
    stuff: 'foo',
    data: {
        val: {
            thing: {
                info: 'bar',
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: 'baz',
                    },
                },
            },
        },
    },
};

// collectStrings(obj) // ["foo", "bar", "baz"])

// [문제 세분화하기]
function collectStrings(obj) {
    // 반환할 배열 생성
    let result = [];

    // helper 함수 구현(Recursion)
    function helper(payload) {
        // 단일 프로퍼티를 뽑아. for문
        for (let key in payload) {
            // 프로퍼티가 객체면 helper 함수 호출
            if (payload[key].constructor === Object) {
                helper(payload[key]);
            }
            // 프로퍼티가 string이면 result 배열에 push
            else if (payload[key].constructor === String) {
                result.push(payload[key]);
            }
        }
    }

    // helper 함수 실행만
    helper(obj);

    // 배열 반환
    return result;
}

console.log(collectStrings(obj))