import {strictEqual} from 'assert';
import Vertex from "../vertex";
import Edge from "../edge";
import Graph from "../graph";
import stronglyConnectedComponents from "./index";

describe('StronglyConnectedComponents', () => {
    it('should detect strongly connected components in graph', () => {
        const vertexA = new Vertex<string>('A');
        const vertexB = new Vertex<string>('B');
        const vertexC = new Vertex<string>('C');
        const vertexD = new Vertex<string>('D');

        const edgeAB = new Edge<string>(vertexA, vertexB);
        const edgeBC = new Edge<string>(vertexB, vertexC);
        const edgeCA = new Edge<string>(vertexC, vertexA);
        const edgeCD = new Edge<string>(vertexC, vertexD);

        const graph = new Graph<string>(true);

        graph
            .addEdge(edgeAB)
            .addEdge(edgeBC)
            .addEdge(edgeCA)
            .addEdge(edgeCD);

        const components = stronglyConnectedComponents(graph);

        strictEqual(components.length, 2);
        strictEqual(components[0][0].getKey(), vertexA.getKey());
        strictEqual(components[0][1].getKey(), vertexC.getKey());
        strictEqual(components[0][2].getKey(), vertexB.getKey());
        strictEqual(components[1][0].getKey(), vertexD.getKey());
    });
});
