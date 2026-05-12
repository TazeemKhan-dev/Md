<!-- #region 330-Spreading Infection  -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q330: Spreading Infection</h1>

## 1. Problem Statement

- You are given a graph representing people and their connections.
- A person src is initially infected.
- Every minute the infection spreads from an infected person to all of their neighbors.
- Given a time t, you must find how many people will be infected within t minutes.
---

## 2. Problem Understanding

- Each person is a node.
- Each connection between two people is an edge.
- If a person is infected, then after one unit of time, all of their neighbors become infected.
- This means infection spreads level by level in the graph.
- Level 0 contains the source.
- Level 1 contains all neighbors of the source.
- Level 2 contains neighbors of neighbors.
- We must count all nodes that lie within distance t from the source.
- This is exactly breadth first search with time tracking.
---

## 3. Constraints

- The number of vertices can be large
- The graph can be disconnected
- Time t can be zero or more
---

## 4. Edge Cases

- t = 0
- Source has no neighbors
- Graph has disconnected components
- Cycle in the graph
---

## 5. Examples

```text
Example 1

Vertices = 7
Edges
0 1
1 2
2 3
0 3
3 4
4 5
5 6
4 6

Source = 6
Time = 3

Graph

0 —— 1 —— 2 —— 3 —— 4 —— 5 —— 6
 \                 \             /
  \_________________ 3           4

Infection flow

Time 0: 6
Time 1: 5, 4
Time 2: 3
Time 3: 2

Total infected = 4


Example 2

Vertices = 4
Edges
0 1
1 2
2 3

Source = 3
Time = 2

Graph

0 —— 1 —— 2 —— 3

Infection flow

Time 0: 3
Time 1: 2
Time 2: 1

Total infected = 2
```

---

## 6. Approaches

### Approach 1: BFS with Time Tracking

**Idea:**
- Use BFS starting from the source.
- Each node carries the time at which it becomes infected.
- When a node is popped from the queue, if its time is within t, it is counted.
- Neighbors are pushed with time + 1.

**Steps:**
- Push (source, 0) into the queue.
- While the queue is not empty
    * remove the front
    * if already visited, skip
    * if time is greater than t, stop
    * mark visited
    * increase count
    * push all neighbors with time + 1

**Java Code:**
```java
static class Pair {
    int node;
    int time;
    Pair(int n, int t) {
        node = n;
        time = t;
    }
}

public static int spreadInfection(ArrayList<ArrayList<Integer>> graph, int src, int t) {

    Queue<Pair> q = new ArrayDeque<>();
    boolean[] visited = new boolean[graph.size()];

    q.add(new Pair(src, 0));
    int count = 0;

    while (!q.isEmpty()) {
        Pair cur = q.poll();

        if (visited[cur.node]) continue;

        if (cur.time > t) break;

        visited[cur.node] = true;
        count++;

        for (int nbr : graph.get(cur.node)) {
            if (!visited[nbr]) {
                q.add(new Pair(nbr, cur.time + 1));
            }
        }
    }

    return count;
}



// in class solution

import java.io.*;
import java.util.*;

public class Main {
   static class Edge {
      int src;
      int nbr;

      Edge(int src, int nbr) {
         this.src = src;
         this.nbr = nbr;
      }
   }

   public static void main(String[] args) throws Exception {
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

      int vtces = Integer.parseInt(br.readLine());
      ArrayList<Edge>[] graph = new ArrayList[vtces];
      for (int i = 0; i < vtces; i++) {
         graph[i] = new ArrayList<>();
      }

      int edges = Integer.parseInt(br.readLine());
      for (int i = 0; i < edges; i++) {
         String[] parts = br.readLine().split(" ");
         int v1 = Integer.parseInt(parts[0]);
         int v2 = Integer.parseInt(parts[1]);
         graph[v1].add(new Edge(v1, v2));
         graph[v2].add(new Edge(v2, v1));
      }

      int src = Integer.parseInt(br.readLine());
      int t = Integer.parseInt(br.readLine());
      
      // write your code here
      int count = 0;

boolean[] visited = new boolean[vtces];

ArrayDeque<int[]> q = new ArrayDeque<>();
// {node, time}
q.add(new int[]{src, 1});

while (!q.isEmpty()) {
    int[] rem = q.removeFirst();

    int node = rem[0];
    int time = rem[1];

    if (visited[node]) continue;

    visited[node] = true;

    if (time > t) break;

    count++;

    for (Edge e : graph[node]) {
        if (!visited[e.nbr]) {
            q.add(new int[]{e.nbr, time + 1});
        }
    }
}

System.out.println(count);

   }

}
```

**💭 Intuition Behind the Approach:**
- BFS expands outward in layers.
- Each layer corresponds to one unit of time.
- Counting all nodes up to depth t gives exactly how many people get infected.

**Complexity (Time & Space):**
- Time: O(V + E)
- Space: O(V)

---

## 7. Justification / Proof of Optimality

- Infection spreads to all neighbors in exactly one time unit.
- BFS simulates this behavior exactly.
- Stopping when time exceeds t ensures we count only valid infections.
---

## 8. Variants / Follow-Ups

- Find the time required to infect everyone
- Multiple initial infected nodes
- Directed graphs
---

## 9. Tips & Observations

- Always track time with each node.
- Never revisit an already infected person.
- BFS is mandatory for shortest distance in unweighted graphs.
---

## 10. Pitfalls

- Using DFS instead of BFS
- Not stopping when time exceeds t
- Counting nodes more than once
- Not marking visited early
---

<!-- #endregion -->
