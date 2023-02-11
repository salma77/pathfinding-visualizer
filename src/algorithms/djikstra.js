/*
Performs Djikstra's algorithm 
*/
export function djikstra(grid, startNode, finishNode){
    const visitedNodesInOrder = [];
    startNode.distance = 0
    const unvisitedNodes = getAllNodes(grid)
    while(!!unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)
        if(closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid)
    }
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbors(node, grid){
    const neighbors = getNeighbors(node, grid)
    for(const neighbor of neighbors){
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
    }
}

function getNeighbors(node, grid){
    const neighbors = []
    const {row, col} = node;
    if(row > 0) neighbors.push(grid[row - 1][col])
    if(row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if(col > 0) neighbors.push(grid[row][col - 1])
    if(col < grid.length - 1) neighbors.push(grid[row][col + 1])
}

function getAllNodes(grid){

}
