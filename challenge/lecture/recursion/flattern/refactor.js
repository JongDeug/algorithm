// 이런 방법도 있는데 helper 사용하는게 더 이해가 쉬움.
function flatten(oldArr){
    var newArr = []
    for(var i = 0; i < oldArr.length; i++){
        if(Array.isArray(oldArr[i])){
            newArr = newArr.concat(flatten(oldArr[i]))
        } else {
            newArr.push(oldArr[i])
        }
    }
    return newArr;
}


console.log(flatten([1, 2, 3, [4, 5] ]))
// console.log(flatten([1, [2, [3, 4], [[5]]]]));

