import depthFirstSearch from '../dfs';
import Graph from "../../../ds/graphs/graph";
import Stack from "../../../ds/stack/stack";
import Vertex from "../../../ds/graphs/vertex";

function getVerticesSortedByDfsFinishTime<T>(graph: Graph<T>) {
    const visitedVerticesSet: {[key: string]: Vertex<T>} = {};
    const verticesByDfsFinishTime = new Stack<Vertex<T>>();
    const notVisitedVerticesSet: {[key: string]: Vertex<T>} = {};

    graph.getAllVertices().forEach((vertex) => {
        notVisitedVerticesSet[vertex.toString()] = vertex;
    });

    const dfsCallbacks = {
        enterVertex: ({ currentVertex }: {currentVertex: Vertex<T>}) => {
            visitedVerticesSet[currentVertex.toString()] = currentVertex;
            delete notVisitedVerticesSet[currentVertex.toString()];
        },
        leaveVertex: ({ currentVertex }: {currentVertex: Vertex<T>}) => {
            verticesByDfsFinishTime.push(currentVertex);
        },
        allowTraversal: ({ nextVertex }: {nextVertex: Vertex<T>}) => {
            return !visitedVerticesSet[nextVertex.toString()];
        },
    };

    while (Object.values(notVisitedVerticesSet).length) {
        const startVertexKey = Object.keys(notVisitedVerticesSet)[0];
        const startVertex = notVisitedVerticesSet[startVertexKey];
        delete notVisitedVerticesSet[startVertexKey];
        depthFirstSearch(graph, startVertex, dfsCallbacks);
    }

    return verticesByDfsFinishTime;
}

function getSCCSets<T>(graph: Graph<T>, verticesByFinishTime: Stack<Vertex<T>>) {
    const stronglyConnectedComponentsSets: Vertex<T>[][] = [];
    let stronglyConnectedComponentsSet: Vertex<T>[] = [];
    const visitedVerticesSet: {[key: string]: Vertex<T>} = {};

    const dfsCallbacks = {
        enterVertex: ({ currentVertex }: {currentVertex: Vertex<T>}) => {
            stronglyConnectedComponentsSet.push(currentVertex);
            visitedVerticesSet[currentVertex.toString()] = currentVertex;
        },
        leaveVertex: ({ previousVertex }: {previousVertex: Vertex<T>}) => {
            if (previousVertex === null) {
                stronglyConnectedComponentsSets.push([...stronglyConnectedComponentsSet]);
            }
        },
        allowTraversal: ({ nextVertex }: {nextVertex: Vertex<T>}) => {
            return !visitedVerticesSet[nextVertex.toString()];
        },
    };

    while (!verticesByFinishTime.isEmpty()) {
        const startVertex = verticesByFinishTime.pop();
        stronglyConnectedComponentsSet = [];
        if (!visitedVerticesSet[startVertex!.toString()]) {
            depthFirstSearch(graph, startVertex!, dfsCallbacks);
        }
    }

    return stronglyConnectedComponentsSets;
}

export default function stronglyConnectedComponents<T>(graph: Graph<T>) {
    const verticesByFinishTime = getVerticesSortedByDfsFinishTime(graph);
    graph.reverse();
    return getSCCSets(graph, verticesByFinishTime);
}
