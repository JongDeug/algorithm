# 알고리즘 학습

알고리즘 공부 및 코딩 테스트를 준비하는 공간입니다.

## 언어

Javascript를 사용하여 공부하고 있습니다.

## 시간 복잡도, 시간 제한

시간 복잡도와 시간 제한을 고려하며 문제를 푸는 중이었는데, 잘못 알고 있었던 것 같아 정리해봅니다.

- 일반적인 CPU 기반의 PC는 1초에 실행할 수 있는 최대 연산 횟수는 약 100,000,000번

| 시간 복잡도 | 최대 연산 횟수 |
|--------|----------|
| O(n)   | 약 1억번    |
| O(n^2) | 약 1만번    |
| O(n^3) | 약 500번   |
| O(2^n) | 약 20번    |
| O(n!)  | 10번      |

## 복습 큐

- [minSubArrayLen](challenge/problem-solving-pattern/minSubArrayLen/minSubArrayLen.js) (상)
- [sameFrequency](challenge/problem-solving-pattern/findLongestSubstring/findLongestSubstring.js) (상)
- 단일 연결 리스트 reverse 함수 복습
- [radix-digitCount](challenge/the-whild-west/radix-sort/radixSort.js) (중)
- [coinChange](challenge/the-whild-west/coin-change.js) (상)
- [findPair](challenge/the-whild-west/findPair.js) (중)
- [binary-search-tree-remove 함수](challenge/the-whild-west/binary-search-tree.js)
- [trie](challenge/the-whild-west/trie.js) (상)

## 코테 문제 복습 큐(프로그래머스)

1. ~~[하노이 탑](challenge/programmers/recursion/하노이%20탑/하노이%20탑%201회차.js) (재귀인데 풀지도 못함ㅠㅠ)~~
2. ~~[방문 길이](challenge/programmers/방문%20길이.js) (단순 구현인데 너무 꼬아서 풀었음)~~
3. ~~[둘만의 암호](challenge/programmers/둘만의%20암호%201회차.js) (흠)~~
4. ~~[뉴스 클러스터링](challenge/programmers/%5B1차%5D%20뉴스%20클러스터링%201회차.js) (흠)~~
5. ~~[디펜스 게임](challenge/programmers/binary-search/디펜스%20게임/디펜스%20게임%202회차.js) (이분탐색)~~
6. ~~[디펜스 게임](challenge/programmers/priority-queue/디펜스%20게임/디펜스%20게임%202회차.js) (우선순위 큐)~~
7. ~~[전화번호 목록](challenge/programmers/sort/전화번호%20목록/전화번호%20목록%202회차.js) (문자열 다루기, 정렬)~~
13. ~~[양궁대회 2회차](challenge/programmers/순열/양궁%20대회/양궁%20대회%202회차.js) (순열을 2단계 끝내고 제대로 하자)~~
14. ~~[후보키](challenge/programmers/조합/후보키/후보키%201회차.js) (겁나 어렵네;;;;)~~
15. ~~[숫자 카드 나누기](challenge/programmers/최대공배수,%20최대공약수/숫자%20카드%20나누기%201회차.js) (유클리드 호제법, +소수 구하는 방법도 공부)~~
16. [뉴스 클러스터링](challenge/programmers/%5B1차%5D%20뉴스%20클러스터링%202회차.js) (딱 한번만 더 하자)
17. [광물 캐기](challenge/programmers/sort/광물%20캐기/광물%20캐기%202회차.js) (다시!! )
18. [빛의 경로 사이클](challenge/programmers/brute-force/빛의%20경로%20사이클/빛의%20경로%20사이클%203회차.js), [이미지](images/빛의%20경로%20사이클.png) (
    브루투포스)
19. [조이스틱](challenge/programmers/greedy/조이스틱/조이스틱%202회차.js) (그리디 알고리즘, 어려웡 다시!)
20. [미로 탈출](challenge/programmers/BFS/미로%20탈출%202회차.js) (다시 !! 최단 경로 공부를)
12. [카펫](challenge/programmers/단순%20구현%20/카펫/카펫%202회차.js) (단순 구현, 이런게 문제야 ,, ㅠㅠㅠ, 알아갑니다~)
13. [양궁대회](challenge/programmers/순열/양궁%20대회/양궁%20대회%203회차.js) (잘 풀었는데 한 번만 더 연습 ㄱ)
14. [후보키](challenge/programmers/조합/후보키/후보키%202회차.js) (로직을 외워서 다른 곳에도 써먹자!)
15. [숫자 카드 나누기](challenge/programmers/최대공배수,%20최대공약수/숫자%20카드%20나누기%202회차.js) (혹시 모르니까 한 번 더, +소수 구하는 법)

## 코테 문제 복습 큐(백준)

1. [괄호](challenge/boj/stack/괄호.js) (재귀 + 스택, => 재귀로 풀고 싶었는데 실패)
2. [에디터](challenge/boj/linked-list/에디터%201회차%20못품.js) (다중 연결 리스트로 해결해봐야(키로거랑 비슷할듯), 스택)
3. [후위 표기식](challenge/boj/stack/후위%20표기식.js) (해결하긴 했는데 알고리즘 책 살펴보기, 재귀로 풀었던 기억이 남)
4. [방 배정하기](challenge/boj/brute-force/방%20배정하기.js) (왜왜오애왜오애 => 분석 결과 메모리 때문임 ..)
5. [퇴사](challenge/boj/dynamic-programming/퇴사.js) (다이내믹) || [퇴사](challenge/boj/brute-force/퇴사.js) (브루트 포스)
6. [문서 검색](challenge/boj/brute-force/문서%20검색.js) (후,,,, 쉬운건뎅)
7. [전투의 신](challenge/boj/brute-force/전투의%20신.js) (다시!!)
8. [양팔저울](challenge/boj/brute-force/양팔저울.js)
9. [양치기 꿍](challenge/boj/brute-force/bfs-and-dfs/양치기%20꿍.js) (BFS)
10. [치킨치킨치킨](challenge/boj/brute-force/치킨치킨치킨.js) (좀 더 효율적으로 생각!)
11. [바이러스](challenge/boj/brute-force/bfs-and-dfs/바이러스.js) (obj에 익숙하지 않아 좀 더 공부, obj <=> map)
12. [효율적인 해킹](challenge/boj/brute-force/bfs-and-dfs/효율적인%20해킹.js) (시간초과로 못풀긴했는데 구현을 한 번더 해보는 것도 좋아서 넣었음)
13. [집합의 표현](challenge/boj/graph/union-find/집합의%20표현.js) (union-find => 서로소 집합 disjoint set => 1. 그래프 사이클 판별, 2. 최소 신장 트리(MST):크루스칼(Kruskal)의 알고리즘에서 사용)
14. [사이클 게임](challenge/boj/graph/union-find/사이클%20게임.js) (사이클 판단 방법을 몰랐음!!)
15. [친구 네트워크](challenge/boj/graph/union-find/친구%20네트워크.js) (응용)
16. [랜선 자르기](challenge/boj/binary-search/랜선%20자르기.js) (큰 로직은 품, 디테일한 부분을 잡지 못함)
17. [용돈 관리](challenge/boj/binary-search/용돈%20관리.js) (내가 집은 문제의 핵심을 아직도 모호하게 알고 있달까.. 여러번 풀어야 함)
18. [가장 긴 증가하는 부분 수열](challenge/boj/dynamic-programming/가장%20긴%20증가하는%20부분%20수열.js) (해결법이 생각 안났음)
19. 