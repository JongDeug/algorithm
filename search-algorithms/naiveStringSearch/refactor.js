function naiveStringSearch(longer, shorter) {
    let count = 0;

    // longer loop
    for (let i = 0; i < longer.length; i++) {
        // shorter loop
        for (let j = 0; j < shorter.length; j++) {
            if ((i + j) >= longer.length) break;
            // longer, shorter 단일 요소가 다르면 break out => 첨부터 다시
            if (longer[i + j] !== shorter[j]) break;
            // longer, shorter 단일 요소가 같으면 => keep going
            // 모두 다 같다는 것이 증명이 되면 count 증가.
            if (j === shorter.length - 1) count++;
        }
    }
    // return count
    return count;
}


console.log(naiveStringSearch('wowomgzomg', 'omg'));