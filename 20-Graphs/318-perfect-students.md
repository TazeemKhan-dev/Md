<!-- #region 318-Perfect Students -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q318: Perfect Students</h1>

## 1. Problem Statement

- You are given N students labeled from 0 to N−1.
- You are also given K pairs.
- Each pair (u, v) means student u and student v
- belong to the same club.
- All students connected directly or indirectly
- belong to the same club.
- You must count the number of ways
- to pick a pair of students
- such that they belong to different clubs.
---

## 2. Problem Understanding

- Each club is a connected component
- in an undirected graph.
- If two students are in the same connected component,
- they are in the same club.
- We must count how many pairs (i, j)
- exist such that i and j are in different components.
---

## 3. Constraints

- N can be large
- K pairs define an undirected graph
- We must find sizes of connected components.
---

## 4. Edge Cases

- All students in one club
- Each student alone
- Multiple small clubs
---

## 5. Examples

```text
Example 1
N = 10

Pairs
2-4
6-2
3-6
2-1
2-3
1-2

Graph

1
│
2 ── 4
│
6
│
3

This forms one club of size 5:
{1,2,3,4,6}

Remaining students:
0,5,7,8,9   → each alone

So clubs:
5, 1, 1, 1, 1, 1

Total students = 10

Total pairs = 10C2 = 45

Invalid pairs inside clubs
5C2 = 10

Valid pairs = 45 − 10 = 35
```

---

## 6. Approaches

### Approach 1: DFS + Combinatorics

**Idea:**
- Find connected components.
- If their sizes are:
- s1, s2, s3, ...
- Total ways =
- s1*s2 + s1*s3 + s2*s3 + ...

**Steps:**
- Build adjacency list
- Run DFS to get size of each component
- Store all sizes
- Compute sum of size[i] * size[j] for i < j

**Java Code:**
```java
long perfectStudents(int n, int[][] pairs) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());

    for (int[] p : pairs) {
        adj.get(p[0]).add(p[1]);
        adj.get(p[1]).add(p[0]);
    }

    boolean[] visited = new boolean[n];
    List<Integer> sizes = new ArrayList<>();

    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            sizes.add(dfs(i, adj, visited));
        }
    }

    long ans = 0;
    long sum = 0;

    for (int size : sizes) {
        ans += sum * size;
        sum += size;
    }

    return ans;
}

int dfs(int u, List<List<Integer>> adj, boolean[] visited) {
    visited[u] = true;
    int count = 1;

    for (int v : adj.get(u)) {
        if (!visited[v]) {
            count += dfs(v, adj, visited);
        }
    }
    return count;
}
```

**💭 Intuition Behind the Approach:**
- Pairs inside the same club are invalid.
- So we only count cross-club pairs
- by multiplying sizes of different components.

**Complexity (Time & Space):**
- Time: O(N + K)
- Space: O(N + K)

---

## 7. Justification / Proof of Optimality

- Each connected component is one club.
- Choosing one student from one club
- and one from another
- always gives a valid pair.
---

## 8. Variants / Follow-Ups

- Three students from different clubs
- Minimum number of clubs to cover N students
---

## 9. Tips & Observations

- This is same as "Journey to the Moon" problem.
- Use long for counting pairs.
---

## 10. Pitfalls

- Counting pairs inside same club
- Using int for large multiplication
- Not building undirected edges
---

<!-- #endregion -->
