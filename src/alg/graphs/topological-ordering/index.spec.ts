import {deepStrictEqual, strictEqual} from 'assert';
import Graph from "../../../ds/graphs/graph";
import Vertex from "../../../ds/graphs/vertex";
import Edge from "../../../ds/graphs/edge";
import topologicalSort from "./index";

describe('topologicalSort', () => {
    it('should do topological sorting on graph', () => {
        const vertexA = new Vertex<string>('A');
        const vertexB = new Vertex<string>('B');
        const vertexC = new Vertex<string>('C');
        const vertexD = new Vertex<string>('D');
        const vertexE = new Vertex<string>('E');
        const vertexF = new Vertex<string>('F');
        const vertexG = new Vertex<string>('G');
        const vertexH = new Vertex<string>('H');

        const edgeAC = new Edge<string>(vertexA, vertexC);
        const edgeBC = new Edge<string>(vertexB, vertexC);
        const edgeBD = new Edge<string>(vertexB, vertexD);
        const edgeCE = new Edge<string>(vertexC, vertexE);
        const edgeDF = new Edge<string>(vertexD, vertexF);
        const edgeEF = new Edge<string>(vertexE, vertexF);
        const edgeEH = new Edge<string>(vertexE, vertexH);
        const edgeFG = new Edge<string>(vertexF, vertexG);

        const graph = new Graph<string>(true);

        graph
            .addEdge(edgeAC)
            .addEdge(edgeBC)
            .addEdge(edgeBD)
            .addEdge(edgeCE)
            .addEdge(edgeDF)
            .addEdge(edgeEF)
            .addEdge(edgeEH)
            .addEdge(edgeFG);

        const sortedVertices = topologicalSort<string>(graph);

        strictEqual(sortedVertices.length, graph.getAllVertices().length);
        deepStrictEqual(sortedVertices, [
            vertexB,
            vertexD,
            vertexA,
            vertexC,
            vertexE,
            vertexH,
            vertexF,
            vertexG,
        ]);
    });
});
