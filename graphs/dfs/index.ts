import Vertex from '../vertex';
import Graph from '../graph';

function initCallbacks<T>(callbacks: any = {}) {
    const initiatedCallback: any = callbacks;
    const stubCallback = () => {};

    const allowTraversalCallback = (
        () => {
            const seen: any = {};
            return ({ nextVertex }: any) => {
                if (!seen[nextVertex.getKey()]) {
                    seen[nextVertex.getKey()] = true;
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
                                      callbacks: any
) {
    callbacks.enterVertex({ currentVertex, previousVertex });

    graph.getNeighbors(currentVertex).forEach((nextVertex: Vertex<T>) => {
        if (callbacks.allowTraversal({ previousVertex, currentVertex, nextVertex })) {
            depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
        }
    });

    callbacks.leaveVertex({ currentVertex, previousVertex });
}

export default function depthFirstSearch<T>(graph: Graph<T>, startVertex: Vertex<T>, callbacks?: any) {
    const previousVertex = null;
    depthFirstSearchRecursive(graph, startVertex, previousVertex, initCallbacks(callbacks));
}
