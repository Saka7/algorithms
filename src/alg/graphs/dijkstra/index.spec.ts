import {deepStrictEqual, strictEqual} from 'assert';
import Graph from '../../../ds/graphs/graph'
import Vertex from '../../../ds/graphs/vertex';
import Edge from '../../../ds/graphs/edge';
import dijkstra from "./index";

describe('dijkstra', () => {
    it('should find minimum paths to all vertices for undirected graph', () => {
        const vertexA = new Vertex<string>('A');
        const vertexB = new Vertex<string>('B');
        const vertexC = new Vertex<string>('C');
        const vertexD = new Vertex<string>('D');
        const vertexE = new Vertex<string>('E');
        const vertexF = new Vertex<string>('F');
        const vertexG = new Vertex<string>('G');
        const vertexH = new Vertex<string>('H');

        const edgeAB = new Edge<string>(vertexA, vertexB, 4);
        const edgeAE = new Edge<string>(vertexA, vertexE, 7);
        const edgeAC = new Edge<string>(vertexA, vertexC, 3);
        const edgeBC = new Edge<string>(vertexB, vertexC, 6);
        const edgeBD = new Edge<string>(vertexB, vertexD, 5);
        const edgeEC = new Edge<string>(vertexE, vertexC, 8);
        const edgeED = new Edge<string>(vertexE, vertexD, 2);
        const edgeDC = new Edge<string>(vertexD, vertexC, 11);
        const edgeDG = new Edge<string>(vertexD, vertexG, 10);
        const edgeDF = new Edge<string>(vertexD, vertexF, 2);
        const edgeFG = new Edge<string>(vertexF, vertexG, 3);
        const edgeEG = new Edge<string>(vertexE, vertexG, 5);

        const graph = new Graph<string>();

        graph
            .addVertex(vertexH)
            .addEdge(edgeAB)
            .addEdge(edgeAE)
            .addEdge(edgeAC)
            .addEdge(edgeBC)
            .addEdge(edgeBD)
            .addEdge(edgeEC)
            .addEdge(edgeED)
            .addEdge(edgeDC)
            .addEdge(edgeDG)
            .addEdge(edgeDF)
            .addEdge(edgeFG)
            .addEdge(edgeEG);

        const { distances, previousVertices } = dijkstra(graph, vertexA);

        deepStrictEqual(distances,{
            H: Infinity,
            A: 0,
            B: 4,
            E: 7,
            C: 3,
            D: 14,
            G: 19,
            F: 16,
        });

        strictEqual(previousVertices!.F!.getKey(), 'D');
        strictEqual(previousVertices!.D!.getKey(), 'C');
        strictEqual(previousVertices!.B!.getKey(),'A');
        strictEqual(previousVertices!.G!.getKey(), 'F');
        strictEqual(previousVertices!.C!.getKey(), 'A');
    });
});
