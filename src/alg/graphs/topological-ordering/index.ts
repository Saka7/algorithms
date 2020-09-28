import Graph from "../../../ds/graphs/graph";
import Stack from "../../../ds/stack/stack";
import Vertex from "../../../ds/graphs/vertex";
import depthFirstSearch from "../dfs";

export default function topologicalSort<T>(graph: Graph<T>) {
    const unvisitedSet: {[key: string]: Vertex<T>} = {};
    graph.getAllVertices().forEach((vertex) => {
        unvisitedSet[vertex.toString()] = vertex;
    });

    const visitedSet: {[key: string]: Vertex<T>}= {};
    const sortedStack = new Stack<Vertex<T>>();

    const dfsCallbacks = {
        enterVertex: ({ currentVertex }: {currentVertex: Vertex<T>}) => {
            visitedSet[currentVertex.toString()] = currentVertex;
            delete unvisitedSet[currentVertex.toString()];
        },
        leaveVertex: ({ currentVertex }: {currentVertex: Vertex<T>}) => {
            sortedStack.push(currentVertex);
        },
        allowTraversal: ({ nextVertex }: {nextVertex: Vertex<T>}) => {
            return !visitedSet[nextVertex.toString()];
        },
    };

    while (Object.keys(unvisitedSet).length) {
        const currentVertexKey = Object.keys(unvisitedSet)[0];
        const currentVertex = unvisitedSet[currentVertexKey];
        depthFirstSearch(graph, currentVertex, dfsCallbacks);
    }

    return sortedStack.toArray();
}
