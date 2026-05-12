<!-- #region 311-BFS Implementation -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q311: BFS Implementation</h1>

## 1. Problem Statement

- You are given a directed graph with N vertices and E edges.
- Each edge (u, v) means there is a directed edge from u to v.
- You must perform a Breadth First Search traversal
- starting from vertex 0.
- You must print the nodes in the order they are visited.
---

## 2. Problem Understanding

- BFS explores the graph level by level.
- First visit the starting node 0.
- Then visit all nodes directly reachable from 0.
- Then visit their neighbors, and so on.
- We must ensure that each node is visited only once
- to avoid infinite loops in graphs with cycles.
---

## 3. Constraints

- 2 <= N <= 10000
- 1 <= E <= N*(N-1)/2
- The graph is directed and does not contain self loops or multiple edges.
---

## 4. Edge Cases

- Graph with only one node
- Graph where 0 has no outgoing edges
- Graph with cycles
- Disconnected nodes
---

## 5. Examples

```text
Example 1
Edges
0 → 1
0 → 2
0 → 3
2 → 4

BFS from 0
0 1 2 3 4


Example 2
Edges
0 → 1
0 → 2

BFS
0 1 2
```

---

## 6. Approaches

### Approach 1: Standard BFS Using Queue

**Idea:**
- Use a queue to process nodes in FIFO order.
- When a node is visited,
- push all of its unvisited neighbors into the queue.

**Steps:**
- Create visited array
- Push 0 into queue
- While queue is not empty
    * pop front
    * print it
    * push all unvisited neighbors

**Java Code:**
```java
// boiler plate
import java.util.*;
import java.io.*;
 
class Graph {
    public int vertices;
    public ArrayList<Integer>[] adjList;
 
    Graph(int v) {
        this.vertices = v+1;
        adjList = new ArrayList[v+1];
        
        for (int i = 0; i <= v; i++) adjList[i] = new ArrayList<Integer>();
    }
 
    void addEdge(int v, int w) {
        adjList[v].add(w);
     
    }
 
    void BFS(int x) {
        // your code here
    }
}
 
public class Main {
    public static void main(String args[]) {
        
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int e = sc.nextInt();
        Graph g = new Graph(110);
        for(int i =0;i<e;i++){
            int x = sc.nextInt();
            int y = sc.nextInt();
            g.addEdge(x,y);
        }
        g.BFS(0);
    }
}



//solution


void BFS(int x) {
    boolean[] visited = new boolean[vertices];
    Queue<Integer> q = new LinkedList<>();

    visited[x] = true;
    q.add(x);

    while (!q.isEmpty()) {
        int node = q.poll();
        System.out.print(node + " ");

        for (int nbr : adjList[node]) {
            if (!visited[nbr]) {
                visited[nbr] = true;
                q.add(nbr);
            }
        }
    }
}
```

**💭 Intuition Behind the Approach:**
- BFS explores nodes in increasing distance from the source.
- The queue ensures that all nodes at the same depth
- are processed before moving deeper.

**Complexity (Time & Space):**
- Time: O(V + E) — each node and edge is processed once
- Space: O(V) — queue and visited array

---

## 7. Justification / Proof of Optimality

- Using a queue guarantees FIFO order,
- which gives correct BFS traversal.
- Marking nodes visited prevents revisiting.
---

## 8. Variants / Follow-Ups

- Multi-source BFS
- BFS for shortest path in unweighted graph
- Level order traversal
---

## 9. Tips & Observations

- Mark nodes visited when enqueuing, not when dequeuing.
- Queue is mandatory for BFS.
---

## 10. Pitfalls

- Forgetting visited array
- Using stack instead of queue
- Marking visited too late
---

<!-- #endregion -->
