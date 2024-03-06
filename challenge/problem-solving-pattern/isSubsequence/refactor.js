// [문제 되돌아보기]
// 중복된 코드를 제거하니까 코드가 훨씬 간결해졌음.
function isSubsequence(str1, str2) {
    let i = 0;
    let j = 0;

    if (!str1) return false;
    while (j < str2.length) {
        if (str1[i] === str2[j]) i++;
        if (i === str1.length) return true;
        j++;
    }
    return false;
}
