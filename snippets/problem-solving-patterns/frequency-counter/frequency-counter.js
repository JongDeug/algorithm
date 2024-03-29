// 빈도수 세기 알고리즘 패턴
// O(n^2) 시간 복잡도를 O(n)으로 개선할 수 있는 마법!

// 예시 1) same 함수
// 첫 번째 배열을 제곱한 것이 두 번째 배열에 있는지 확인하는 함수
// [1,2,3], [1,4,9] : true
// [1,2,3], [1,9] : false
// [1,2,1], [4,4,1] : false

function same(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    // 객체로 변환(key-value)
    let frequencyCounter1 = {};
    let frequencyCounter2 = {};

    for (let val of arr1) {
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
    }
    for (let val of arr2) {
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
    }

    for (let key in frequencyCounter1) {
        // key 가 존재하는지
        if (!(key ** 2 in frequencyCounter2)) return false;
        // 빈도수가 맞는지
        if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) return false;
    }
    return true;
}

console.log(same([1, 2, 2], [4, 4, 1]));

// 예시 2) anagram 문제
// anagram? 문자열의 나열 순서는 다르지만 구성이 일치하는 것
// 'aaz', 'zza'

function validAnagram(str1, str2) {
    let lookup = {};

    for (let key of str1) {
        lookup[key] = (lookup[key] || 0) + 1;
    }

    // 빈도수 빼기
    for (let key of str2) {
        if (!(key in lookup)) return false;
        else lookup[key] -= 1;
    }

    for (let key in lookup) {
        if (lookup[key] !== 0) return false;
    }
    return true;
}

console.log(validAnagram('cinemaa', 'iceman'));
console.log(validAnagram('azz', 'zaz'));
