// [문제 이해하기]
// 간선 정보를 담은 edges를 보고, 생성한 정점, 도넛, 막대, 8자 모양의 그래프 수를 구해라.

// 입력: nested array(edges)
// 출력: array of integers [생성한 정점, 도넛, 막대, 8자]

// 핵심:
// 1. 처음 문제를 풀 때 DFS 그래프 순회로 접근하려 했음. for 문안에 DFS로 구현하려 했는데
// edges의 길이가 1,000,000 임. for 안에 DFS는 무조건 O(n^2) 근처가 될 거고 이러면 시간에서 탈락임.

// 2. 두 번째 방법을 강구해야 했는데 생각나지 않았다.

function solution(edges) {
    // M. 그래프 인접 리스트, 도넛 길이, 막대 길이, 8자 길이를 담는 변수
    let graph = [];
    let donut = 0;
    let makdae = 0;
    let ppal = 0;
    // M. 생성 정점
    let startNode;

    // I. makeGraph
    for (const [from, to] of edges) {
        graph[from] ? graph[from].to.push(to) : graph[from] = {from: [], to: [to], val: from};
        graph[to] ? graph[to].from.push(from) : graph[to] = {from: [from], to: [], val:to};
    }
    console.log(graph)

    // I. check
    for (const node of graph) {
        if(node){
            // console.log(node)
            let toLength = node.to.length;
            let fromLength = node.from.length;

            // 막대 그래프
            if(toLength === 0) makdae++;
            // 생성 정점, 8자 그래프
            else if(toLength >= 2) {
                // 8자인데 생성 정점까지 포함되어 있으므로
                if(fromLength >= 2) ppal++;
                else startNode = node;
            }
        }
    }
    // 도넛 길이는 [생성 노드의 길이 - (막대 + 8자)]
    donut = startNode.to.length - (makdae + ppal);

    // console.log(graph)
    return [startNode.val, donut, makdae, ppal];
}