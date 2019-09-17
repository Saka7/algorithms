import LinkedList from './linked-list';
import Edge from "./edge";

export default class Vertex<T> {
    public value: T;
    public edges: LinkedList<Edge<T>>;

    constructor(value: T) {
        if (value === undefined) {
            throw new Error('Graph vertex must have a value');
        }

        this.value = value;
        this.edges = new LinkedList<Edge<T>>();
    }

    addEdge(edge: Edge<T>): Vertex<T> {
        this.edges.append(edge);
        return this;
    }

    deleteEdge(edge: Edge<T>) {
        this.edges.delete(edge);
    }

    getNeighbors(): Vertex<T>[] {
        const edges = this.edges.toArray();

        const neighborsConverter = (node: any) => {
            return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
        };

        return edges.map(neighborsConverter);
    }

    getEdges(): Edge<T>[] {
        return this.edges.toArray().map((linkedListNode: any) => linkedListNode.value);
    }

    getDegree(): number {
        return this.edges.toArray().length;
    }

    hasEdge(requiredEdge: Edge<T>): boolean {
        const edgeNode = this.edges.find({
            callback: (edge: Edge<T>) => edge === requiredEdge,
        });

        return Boolean(edgeNode);
    }

    hasNeighbor(vertex: Vertex<T>): boolean {
        const vertexNode = this.edges.find({
            callback: (edge: Edge<T>) => edge.startVertex === vertex || edge.endVertex === vertex,
        });

        return Boolean(vertexNode);
    }

    findEdge(vertex: Vertex<T>): Edge<T> | null {
        const edgeFinder = (edge: Edge<T>) => {
            return edge.startVertex === vertex || edge.endVertex === vertex;
        };

        const edge = this.edges.find({ callback: edgeFinder });

        return edge ? edge.value : null;
    }

    getKey(): T {
        return this.value;
    }

    toString(callback?: (t: T) => string): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
