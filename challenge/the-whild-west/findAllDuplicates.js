// [문제 이해하기]
// 양의 정수 배열이 주어졌을 때 2번 나오는 놈을 배열로 반환하는 함수를 구현해라.
// 입력 : array of integers, 출력 : array of integers(duplicate)
// 핵심 : 객체로 만드는게 젤 깔끔함.
// [문제 세분화하기]
function findAllDuplicates(arr) {
    // 반환값 변수
    let result = [];
    // arr를 객체, Dictionary로 만들기
    let arrFrequencyCount = {};
    for (const item of arr) {
        arrFrequencyCount[item] = (arrFrequencyCount[item] || 0) + 1;
    }

    // 객체임.
    for (const key in arrFrequencyCount) {
        if(arrFrequencyCount[key] === 2) result.push(parseInt(key))
    }
    return result;
}

console.log(findAllDuplicates([4,3,2,7,8,2,3,1]))