<!-- #region 00-GRAPH -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q00: GRAPH</h1>

## 1. Problem Understanding

- A graph is a non-linear data structure.
- It is made of:
    * Vertices (nodes)
    * Edges (connections between nodes)
- Graphs are used when data is connected in arbitrary ways,
- not in a straight sequence.

- **Examples:**
- Social networks
- Road maps
- Web links
- Course prerequisites
- Computer networks

- **Types of Graphs**
- Undirected Graph
  * Edges have no direction.
  * If A is connected to B,
  * B is also connected to A.
    * A —— B
- Directed Graph
  * Edges have direction.
  * You can only move in the direction of the arrow.
    * A → B
- Weighted Graph
  * Each edge has a cost or weight.
  * Used in shortest path problems.
    * A --5--> B

- **Degree of a Node**
- Degree = number of edges connected to a node
- In-degree  = number of edges coming into a node
- Out-degree = number of edges going out of a node
- Used in:
  * Course Schedule
  * Topological Sort
  * Cycle detection

- **Cycles in Graphs**
- A cycle exists if we can start from a node
- and come back to the same node
- by following edges.
- Types:
  * Acyclic → no cycles
  * Cyclic → at least one cycle
- Used in:
  * Course Schedule
  * Deadlock detection
  * Dependency resolution

- **Connected Components**
- A connected component is a group of nodes
- where every node is reachable from every other node in the group.
- Used in:
  * Count Components
  * Perfect Students
  * Number of Islands
  * Network groups

- **Graph Representation**
- Adjacency Matrix
  * A 2D array matrix[V][V]
  * matrix[i][j] = 1 → edge exists from i to j
  * matrix[i][j] = 0 → no edge
  * Good for:
  * Dense graphs
  * Fast edge lookup
  * Bad for:
    * Large sparse graphs
- Adjacency List
  * For each node, store a list of its neighbors.
  * Example:
    * 0 → [1, 3]
    * 1 → [0, 2]
    * 2 → [1]
    * 3 → [0]
  * Best for:
    * Almost all DSA problems

- **Graph Traversals**
- DFS — Depth First Search
  * Explores one path fully before backtracking.
  * Uses recursion or stack.
  * Used for:
    * Components
    * Cycle detection
    * Path enumeration
    * Islands
    * Backtracking
- BFS — Breadth First Search
  * Explores level by level.
  * Uses a queue.
  * Used for:
    * Shortest path in unweighted graphs
    * Grid distances
    * Multi-source problems

- **Grids are Graphs**
- Each cell in a matrix is a node.
- Edges exist between adjacent cells.
- Adjacency:
  * Up, Down, Left, Right
- So:
  * Number of Islands = Count components
  * Enclaves = Border-connected components
  * Nearest 1 = Multi-source BFS
  * Path with effort = Dijkstra on grid

- **Cycle Detection Rules**
- Undirected Graph
  * Use DFS with parent tracking.
  * If a visited neighbor is not the parent → cycle.
- Directed Graph
  * Use DFS with recursion stack.
  * If a node is visited and still in the recursion path → cycle.
- BFS Method
  * Use indegree (Kahn’s algorithm).
  * If all nodes cannot be removed → cycle.

- **Topological Sorting**
- Linear ordering of nodes
- such that every directed edge u → v
- comes before v.
- Used in:
  * Course Schedule
  * Task dependencies
  * Build systems

- **Dijkstra Algorithm**
- Used when:
  * Edges have weights
  * We need minimum cost / time / effort
- Uses:
  * Priority Queue (min-heap)
  * Greedy expansion

- **Priority Queue in Graphs**
- Always picks the smallest distance node.
- This makes Dijkstra possible.
- Operations:
  * add   → O(log N)
  * poll  → O(log N)
  * peek  → O(1)

- **The 5 Graph Problem Types**
- Every graph problem belongs to one:
- 1) Reachability
- 2) Shortest Path
- 3) Cycle Detection
- 4) Components
- 5) Dependency Ordering
- Once you identify the type,
- the algorithm becomes obvious.

- **The Graph Solving Formula**
- Every graph solution follows:
- Graph representation
- Visited array
- Traversal (DFS/BFS/Dijkstra)
- State tracking
- Answer extraction

- **When to Use What**
- If the problem only asks
    * can I reach a node
    * or
    * is a path possible
- then use
    * DFS or BFS
- If the problem asks
    * how many groups
    * how many islands
    * how many clubs
- then use
    * DFS for connected components
- If the problem asks
    * print all paths
    * list all routes
    * explore every possible way
- then use
    * DFS with backtracking
- If the problem asks
    * shortest path
    * minimum number of steps
    * nearest cell
    * distance in grid
- and all edges have equal cost
- then use
    * BFS
- If the problem asks
    * minimum cost
    * minimum time
    * minimum effort
    * weighted edges
- then use
    * Dijkstra (Priority Queue)
- If the problem asks
    * detect cycle in undirected graph
- then use
    * DFS with parent tracking
- If the problem asks
    * detect cycle in directed graph
- then use
    * DFS with recursion stack
    * or
    * BFS using indegree (Kahn)
- If the problem is about
    * prerequisites
    * dependencies
    * order of tasks
- then use
    * Topological Sort (BFS or DFS)
---

<!-- #endregion -->
