<!-- #region 255-Root Leaf Path Sum -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q255: Root Leaf Path Sum</h1>

## 1. Problem Statement

- Given the root of a Binary Tree, each node contains a digit (1 to 9).
- You need to find the sum of all numbers formed by root-to-leaf paths.
- Each root-to-leaf path represents a number formed by concatenating digits along the path.
---

## 2. Problem Understanding

- Start from the root
- Move down to leaf nodes only
- Along each path, digits form a number (base-10)
- Sum all such numbers
- Return the final sum
---

## 3. Constraints

- 1 <= T <= 10
- 1 <= N <= 12
- 1 <= A[i] <= 9
- Tree height is small (safe for recursion)
---

## 4. Edge Cases

- Empty tree → sum 0
- Single node → node value itself
- Skewed tree
- Multiple test cases
---

## 5. Examples

```text
Example 1

Tree:

     1
   /   \
  2     3


Root-to-leaf numbers:

12

13

Output:

25

Example 2

Tree:

     1
   /   \
  2     3
 /
4


Root-to-leaf numbers:

124

13

Output:

137
```

---

## 6. Approaches

### Approach 1: Recursive DFS with Running Number (Optimal)

**Idea:**
- While traversing:
  * Carry the number formed so far
  * At each node:
  * newNumber = oldNumber * 10 + node.data
  * When a leaf node is reached, add the number to sum

**Steps:**
- Start DFS from root with currentSum = 0
- Update current number at each node
- If leaf node:
  * Return current number
- Return sum of left and right subtree calls

**Java Code:**
```java
int rootToLeafSum(Node root) {
    return dfs(root, 0);
}

int dfs(Node root, int curr) {
    if (root == null) return 0;

    curr = curr * 10 + root.data;

    if (root.left == null && root.right == null) {
        return curr;
    }

    return dfs(root.left, curr) + dfs(root.right, curr);
}
```

**💭 Intuition Behind the Approach:**
- Each path represents a number in base-10
- Multiplying by 10 shifts digits left
- DFS ensures all root-to-leaf paths are covered
- Leaf nodes act as termination points

**Complexity (Time & Space):**
- Time: O(N) — each node visited once
- Space: O(H) — recursion stack height

### Approach 2: DFS Using Explicit Path List (Alternative)

**Idea:**
- Store the full path, convert it into a number at leaf nodes, then sum.

**Steps:**
- Maintain a list representing the path
- On reaching a leaf:
  * Convert path digits into number
- Backtrack after recursive calls

**Java Code:**
```java
int rootToLeafSum(Node root) {
    List<Integer> path = new ArrayList<>();
    return dfs(root, path);
}

int dfs(Node root, List<Integer> path) {
    if (root == null) return 0;

    path.add(root.data);

    int sum = 0;
    if (root.left == null && root.right == null) {
        int num = 0;
        for (int d : path) {
            num = num * 10 + d;
        }
        sum = num;
    } else {
        sum = dfs(root.left, path) + dfs(root.right, path);
    }

    path.remove(path.size() - 1);
    return sum;
}
```

**💭 Intuition Behind the Approach:**
- Explicitly tracks the root-to-leaf path
- Easier to visualize but less optimal
- Useful for debugging or explanation

**Complexity (Time & Space):**
- Time: O(N * H) — path reconstruction at each leaf
- Space: O(H) — path list + recursion stack

---

## 7. Justification / Proof of Optimality

- Since every root-to-leaf path contributes exactly one number, DFS traversal ensures correctness while minimizing repeated work.
---

## 8. Variants / Follow-Ups

- Return modulo 10^9 + 7
- Print all root-to-leaf numbers
- Maximum root-to-leaf number
---

## 9. Tips & Observations

- Running-sum method is optimal
- Leaf check is critical
- Digits constraint (1–9) avoids overflow issues here
---

## 10. Pitfalls

- Forgetting to check leaf nodes
- Not multiplying by 10
- Accumulating sum at non-leaf nodes
---

<!-- #endregion -->
