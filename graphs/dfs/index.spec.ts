import {deepStrictEqual, strictEqual} from 'assert';
import Graph from '../graph'
import Vertex from '../vertex';
import Edge from '../edge';
import depthFirstSearch from './';

describe('depthFirstSearch', () => {
    it('should perform DFS operation on graph', () => {
        const graph = new Graph<string>(true);

        const vertexA = new Vertex('A');
        const vertexB = new Vertex('B');
        const vertexC = new Vertex('C');
        const vertexD = new Vertex('D');
        const vertexE = new Vertex('E');
        const vertexF = new Vertex('F');
        const vertexG = new Vertex('G');

        const edgeAB = new Edge(vertexA, vertexB);
        const edgeBC = new Edge(vertexB, vertexC);
        const edgeCG = new Edge(vertexC, vertexG);
        const edgeAD = new Edge(vertexA, vertexD);
        const edgeAE = new Edge(vertexA, vertexE);
        const edgeEF = new Edge(vertexE, vertexF);
        const edgeFD = new Edge(vertexF, vertexD);
        const edgeDG = new Edge(vertexD, vertexG);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCG)
            .addEdge(edgeAD)
            .addEdge(edgeAE)
            .addEdge(edgeEF)
            .addEdge(edgeFD)
            .addEdge(edgeDG);

        deepStrictEqual(graph.toString(), 'A,B,C,G,D,E,F');

        let enterCount = 0;
        let leaveCount = 0;

        depthFirstSearch(graph, vertexA, {
            enterVertex: () => enterCount++,
            leaveVertex: () => leaveCount++,
        });

        strictEqual(enterCount, 7);
        strictEqual(leaveCount, 7);
        strictEqual(enterCount, leaveCount);
    });
});
