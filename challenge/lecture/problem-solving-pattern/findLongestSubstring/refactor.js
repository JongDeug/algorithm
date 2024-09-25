function findLongestSubstring(str) {
    // 필요한 변수 3가지
    let longest = 0;
    let seen = {};
    let start = 0;

    for (let i = 0; i < str.length; i++) {
        // character 받기
        let chr = str[i];

        // 본 것 중에 있는거면 start 이동
        if (seen[chr] >= 0) {
            // max를 하는 이유? start가 3이었다가 2가 될 수 없음. 즉, max를 하지 않으면 다시 중복이 되는 곳으로 돌아감!!
            // seen[chr] + 1 을 하는 이유? 중복 알파벳 다음부터 시작을 해야하므로.
            start = Math.max(start, seen[chr] + 1); // max를 하는 이유가?
            // start = seen[chr] + 1;
        }

        // longest 할당
        longest = Math.max(longest, i - start + 1); // 길이니까 + 1 추가

        // 본 것에 추가
        seen[chr] = i;
        // 해답에서 i + 1을 한 이유는? => 12번 줄에 seen[chr]을 통과하기 위해서, 0이면 if를 넘어갈 수 없으니까
        // 나는 내가 이해할 수 있게 그냥 0이상이라고 했음. seen이잖아(본 것 이므로)
    }
    return longest;
}

console.log(findLongestSubstring('thisishowwedoit'))