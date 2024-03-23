// [문제 이해하기]
// 합병 정렬에서 merge 하는 함수 구현하기
// 입력 : arr, arr, comparator(없으면 오름차순) 출력 : sorted array
// 핵심 : comparator가 없으면 오름차순으로 정렬, 있으면 알아서 정렬, 내장된 sort를 사용하지 말것. n번 비교할 것.
export default function merge(arr1, arr2, comparator) {
    // 새로운 배열 variable, i, j
    let newArr = [];
    let i = 0;
    let j = 0;

    // 반복문
    while (i < arr1.length && j < arr2.length) {
        // 같거나, i가 작은 경우
        if (typeof comparator !== 'function') {
            if (arr1[i] <= arr2[j]) {
                newArr.push(arr1[i]);
                i++;
            }
            // j가 작은 경우
            else {
                newArr.push(arr2[j]);
                j++;
            }
        } else {
            if (Math.sign(comparator(arr1[i], arr2[j])) === -1) {
                newArr.push(arr1[i]);
                i++;
            }
            // j가 작은 경우
            else {
                newArr.push(arr2[j]);
                j++;
            }
        }
    }
    // 만약 반복문이 멈추면 나머지 요소들 쭉 붙이기
    newArr.push(...arr1.slice(i));
    newArr.push(...arr2.slice(j));

    return newArr;
}

// var arr1 = [1, 3, 4, 5];
// var arr2 = [2, 4, 6, 8];
// // console.log(merge(arr1, arr2)); // [1,2,3,4,4,5,6,8]
//
// var arr3 = [-2, -1, 0, 4, 5, 6];
// var arr4 = [-3, -2, -1, 2, 3, 5, 7, 8];
//
// // console.log(merge(arr3, arr4));
//
// var names = ['Bob', 'Ethel', 'Christine'];
// var otherNames = ['M', 'Colt', 'Allison', 'SuperLongNameOMG'];
//
// function stringLengthComparator(str1, str2) {
//     return str1.length - str2.length;
// }
//
// console.log(merge(names, otherNames, stringLengthComparator)); // ["M", "Bob", "Colt", "Ethel", "Allison", "Christine", "SuperLongNameOMG"]