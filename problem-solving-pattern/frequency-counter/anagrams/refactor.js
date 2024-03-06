// 나는 object 두 개를 이용했는데 선생님은 한개를 이용했음.
function validAnagram(str1, str2) {
    let lookup = {};

    for (let key of str1) {
        lookup[key] = (lookup[key] || 0) + 1;
    }

    for (let key of str2) {
        if (!(key in lookup)) return false;
        else lookup[key] -= 1;
        // console.log(lookup)
    }

    // 하나씩 빼서 적용해도 되네
    // for (let val of Object.values(lookup)){
    //     if (val !== 0) return false
    //     // console.log(val)
    // }
    for (let key in lookup){
        console.log(lookup[key])
        if(lookup[key] !== 0) return false
    }

    return true;
}

console.log(validAnagram("cinemaa", "iceman"));