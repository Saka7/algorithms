import Vertex from '../../../ds/graphs/vertex';
import Graph from '../../../ds/graphs/graph';

export interface DfsTraversal<T> {
    nextVertex: Vertex<T>;
    previousVertex?: Vertex<T> | null;
    currentVertex?: Vertex<T>;
}

export interface DfsCallback<T> {
    allowTraversal?: (traversal: DfsTraversal<T>) => boolean;
    enterVertex?: (t?: any) => any;
    leaveVertex?: (t?: any) => any;
}

function initCallbacks<T>(callbacks: DfsCallback<T> = {}) {
    const initiatedCallback = callbacks;
    const stubCallback = () => {};

    const allowTraversalCallback = (
        () => {
            const seen: {[key: string]: boolean} = {};
            return ({ nextVertex }: DfsTraversal<T>) => {
                if (!seen[nextVertex.toString()]) {
                    seen[nextVertex.toString()] = true;
                    return true;
                }
                return false;
            };
        }
    )();

    initiatedCallback.allowTraversal = callbacks.allowTraversal || allowTraversalCallback;
    initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
    initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

    return initiatedCallback;
}

function depthFirstSearchRecursive<T>(graph: Graph<T>,
                                      currentVertex: Vertex<T>,
                                      previousVertex: Vertex<T> | null,
                                      callbacks: DfsCallback<T>
) {
    callbacks.enterVertex!({ currentVertex, previousVertex });

    graph.getNeighbors(currentVertex).forEach((nextVertex: Vertex<T>) => {
        if (callbacks.allowTraversal!({ previousVertex, currentVertex, nextVertex })) {
            depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
        }
    });

    callbacks.leaveVertex!({ currentVertex, previousVertex });
}

export default function depthFirstSearch<T>(graph: Graph<T>, startVertex: Vertex<T>, callbacks?: DfsCallback<T>) {
    const previousVertex = null;
    depthFirstSearchRecursive(graph, startVertex, previousVertex, initCallbacks(callbacks));
}
