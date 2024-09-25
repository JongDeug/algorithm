// [문제 이해하기]
// N/2 뽑았을 대 최대 종류 수를 반환하는 함수를 구현해라.
function solution(nums) {
  const newNums = new Set(nums);
  const choiceNum = nums.length / 2; // 항상 짝수
  // I. 크면 N/2, 같거나 작으면 set.size ==> 가장 작은걸 선택하면 되는거임
  // return newNums.size > choiceNum ? choiceNum : newNums.size;
  return Math.min(newNums.size, choiceNum);
}
