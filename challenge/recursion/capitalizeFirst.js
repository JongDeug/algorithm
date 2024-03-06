// [문제 이해하기]
// 문자열 배열을 받아서 해당 문자열의 첫 글자를 대문자로 바꿔서 출력하는 함수를 구현해라.
// Input : array of strings
// Output : array of strings
// 가장 중요하다고 생각하는 것? : 재귀로 구현하는 것

// [구체적인 예제]
// capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']
// 빈 입력 값
// [] // []

// [문제 세분화 하기]
// 문자열 배열을 인자로 받아 문자열의 첫 글자를 대문자로 바꿔주는 capitalizeFirst 함수 구현
// concat을 사용해보자
function capitalizeFirst(arr){
    // 새로운 배열 선언
    let newArr = [];

    // Base Case : arr 길이가 0일 때 return
    if (arr.length === 0) return newArr;

    // 첫글자 대문자로 바꿔주는 로직 구현
    let str = arr[0][0].toUpperCase() + arr[0].substring(1, arr[0].length);
    newArr.push(str)

    // return 새로운 배열
    return newArr.concat(capitalizeFirst(arr.slice(1)))
}

console.log(capitalizeFirst(['car','taco','banana']));