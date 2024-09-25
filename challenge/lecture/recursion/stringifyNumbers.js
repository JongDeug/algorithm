// [문제 이해하기]
// 객체의 property가 number이면 string으로 변환해서 객체를 반환하는 함수 구현
// Input : object (number)
// Output : object (string)

// 가장 중요한 것은 ? 재귀로 문제를 해결해야 함

// [구체적인 예제]
let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66,
        },
    },
};

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

// [문제 세분화 하기]
// 객체의 integer property를 string으로 변환하는 함수 구현
// function stringifyNumbers(obj) {
//     let newObj = {};
//
//     // 객체를 받아서 단일 property 추출 하는 로직
//     for (let key in obj) {
//
//         // 객체면 stringifyNumbers 재귀, return 값은 객체이므로 감싸주기
//         if (obj[key].constructor === Object) {
//             newObj = { ...newObj, [key]: { ...stringifyNumbers(obj[key]) } };
//         }
//         // 단일 property, 즉 객체가 아닌거지. 를 걸러서 string으로 변환하기
//         else if (Number.isInteger(obj[key])) {
//             newObj = { [key]: obj[key].toString(), ...newObj };
//         } else {
//             newObj = { ...newObj, [key]: obj[key] };
//         }
//     }
//
//     // return 모든 객체
//     return newObj;
// }

function stringifyNumbers(obj) {
    let newObj = {};

    // 객체를 받아서 단일 property 추출 하는 로직
    for (let key in obj) {

        // 객체면 stringifyNumbers 재귀, return 값은 객체이므로 감싸주기
        if (obj[key].constructor === Object) {
            newObj = Object.assign(newObj, { [key]: stringifyNumbers(obj[key]) });
        }
        // 단일 property, 즉 객체가 아닌거지. 를 걸러서 string으로 변환하기
        else if (Number.isInteger(obj[key])) {
            newObj = Object.assign(newObj, { [key]: obj[key].toString() });
        } else {
            newObj = Object.assign(newObj, { [key]: obj[key] });
        }
    }

    // return 모든 객체
    return newObj;
}

console.log(stringifyNumbers(obj));