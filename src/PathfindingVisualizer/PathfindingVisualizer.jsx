import React, {Component} from "react";
import { djikstra, getNodesInShortestPathOrder } from "../algorithms/djikstra";
import Node from './Node/Node';

import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;  
const START_NODE_COL = 15;  
const FINISH_NODE_ROW = 10;  
const FINISH_NODE_COL = 35;  

export default class PathfindingVisualizer extends Component {
    constructor(){
        super();
        this.state = {
            grid: [],
            mousePressed: false,
        };
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid})
    }

    handleMouseDown(row, col){
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({grid: newGrid, mousePressed: true})
    }

    handleMouseEnter(row, col){
        if(!this.state.mousePressed) return 
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col)
        this.setState({grid: newGrid})
    }

    handleMouseUp(){
        this.setState({mousePressed:false});
    }

    animateDjikstra(visitedNodesInOrder){
        for(let i = 0; i < visitedNodesInOrder.length; i++){
            setTimeout(()=>{
                const node = visitedNodesInOrder[i]
                const newGrid = this.state.grid.slice()
                const newNode = {
                    ...node,
                    isVisited: true,
                };
                newGrid[node.row][node.col] = newNode
                this.setState({grid: newGrid});
            }, 15 * i);
        }
    }

    visualizeDjikstra(){
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        const visitedNodesInOrder = djikstra(grid, startNode, finishNode)
        this.animateDjikstra(visitedNodesInOrder)
    }

    render(){
        const {grid} = this.state;

        return(
            <>
                <button onClick={() => this.visualizeDjikstra()}>
                Visualize Djikstra Now
                </button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {row, col, isFinish, isStart, isVisited, isWall} = node;
                                    return(
                                        <Node 
                                            key={nodeIdx} 
                                            col={col}
                                            row={row}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isVisited={isVisited}
                                            isWall={isWall}></Node>
                                    )}
                                )}
                            </div>
                            )
                    })}
                </div>
            </>
        );
    }
}

const getInitialGrid = () => {
    const grid = [];
    for(let row = 0; row < 20; row++){
        const currRow = [];
        for (let col = 0; col < 50; col++){
            currRow.push(createNode(col, row));
        }
        grid.push(currRow);
    }
    return grid;
}

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    }
}

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
        ...node,
        isWall: !node.isWall,
    }
    newGrid[row][col] = newNode
    return newGrid;
}