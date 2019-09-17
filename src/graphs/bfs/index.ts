import Queue from '../queue';
import Graph from "../graph";
import Vertex from "../vertex";

export interface BfsTraversal<T> {
    nextVertex: Vertex<T>;
    previousVertex?: Vertex<T> | null;
    currentVertex?: Vertex<T> | null;
}

export interface BfsCallback<T> {
    allowTraversal?: (traversal: BfsTraversal<T>) => boolean;
    enterVertex?: (t?: any) => any;
    leaveVertex?: (t?: any) => any;
}

function initCallbacks<T>(callbacks: BfsCallback<T> = {}) {
    const initiatedCallback = callbacks;

    const stubCallback = () => {};

    const allowTraversalCallback = (
        () => {
            const seen: {[key: string]: boolean} = {};
            return ({ nextVertex }: BfsTraversal<T>) => {
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

export default function breadthFirstSearch<T>(
    graph: Graph<T>,
    startVertex: Vertex<T>,
    originalCallbacks: BfsCallback<T>
) {
    const callbacks = initCallbacks(originalCallbacks);
    const vertexQueue = new Queue<Vertex<T>>();

    vertexQueue.enqueue(startVertex);

    let previousVertex: Vertex<T> | null = null;

    while (!vertexQueue.isEmpty()) {
        const currentVertex = vertexQueue.dequeue();
        callbacks.enterVertex!({ currentVertex, previousVertex });

        graph.getNeighbors(currentVertex!).forEach((nextVertex: Vertex<T>) => {
            if (callbacks.allowTraversal!({ previousVertex, currentVertex, nextVertex })) {
                vertexQueue.enqueue(nextVertex);
            }
        });

        callbacks.leaveVertex!({ currentVertex, previousVertex });

        previousVertex = currentVertex;
    }
}
