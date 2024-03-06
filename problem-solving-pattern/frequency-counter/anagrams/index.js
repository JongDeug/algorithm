// 문제를 이해하자.
// 1. 내 방식대로 문제를 재정의
// Anagram(문자열의 순서를 막 바꾸는거지) 문제임. 문자열 두개가 같은지 비교하는 validAnagram 함수를 구현하면 됨.

// 2. 입/출력 값 정의
// 입력 : two strings
// 출력 : boolean

// 3. 이 문제에서 가장 중요하다고 생각하는 것?
// anagram과 frequency counter pattern을 활용해보는 것이 중요하다 생각함.

// 구체적인 예시를 찾아보자
// 1. 간단한 예
// 'aaz', 'zza'
// 2. 더 복잡한 예
// 3. 빈 입력 값이나 무효한 입력 값
// '', ''

// Break it down, 문제를 세분화 하자, 밟아야 할 단계를 간단하게 적어보자.
// str1, str2의 철자가 똑같은지 검사하는 함수를 만들면 됨.
function validAnagram(str1, str2) {
    // str1, str를 object로 변환
    let frequencyCounter1 = {};
    let frequencyCounter2 = {};

    for (let key of str1) {
        frequencyCounter1[key] = (frequencyCounter1[key] || 0) + 1
    }

    for (let key of str2){
        frequencyCounter2[key] = (frequencyCounter2[key] || 0) + 1
    }

    // loop를 만들고
    for (let key in frequencyCounter1){
        // str1 object의 key가 str1 object에 존재하는지 확인
        if (!(key in frequencyCounter2)) return false
        // 빈도수도 물론 체크해야 함.
        if (frequencyCounter2[key] !== frequencyCounter1[key]) return false
    }

    // true, false 반환
    return true
}

console.log(validAnagram("cinema", "iceman"))