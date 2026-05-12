<!-- #region 262-Binary Tree Coloring Game -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q262: Binary Tree Coloring Game</h1>

## 1. Problem Statement

- Two players play a turn-based game on a Binary Tree with n nodes (n is odd).
- Each node has a unique value from 1 to n.
  * Player 1 colors node x red
  * Player 2 colors node y blue, where y != x
  * Players alternate turns, starting with Player 1
  * On each turn, a player expands from their colored nodes to an uncolored adjacent node (left, right, or parent)
  * If a player cannot move, they pass
  * When both pass, the game ends
  * Winner = player who colored more nodes
- 👉 You are Player 2.
- Return true if there exists a choice of y that guarantees a win, else false.
---

## 2. Problem Understanding

- Once Player 1 colors node x, the tree is effectively split into 3 independent regions:
  * Left subtree of x
  * Right subtree of x
  * The remaining tree above x (parent side)
- Player 2 can choose only one region to dominate
- If Player 2 can secure more than half of the nodes, they win
- Since n is odd → winning requires strictly more than n/2 nodes
---

## 3. Constraints

- 1 <= n <= 100
- n is always odd
- Tree values are unique
- Tree size is small but logic-heavy
---

## 4. Edge Cases

- x is root
- x is a leaf
- One subtree is very large
- Completely skewed tree
---

## 5. Examples

```text
Example 1

Tree:

              1
            /   \ 
          2      3 
        /  \ 
       4    5  


Input:

n = 5, x = 2


Subtree sizes from node 2:

Left subtree → {4} → size = 1

Right subtree → {5} → size = 1

Parent side → {1,3} → size = 2

Max region size = 2
Player 2 cannot get more than n/2 = 2

Output:

false

Example 2

Tree:

              1
            /   \ 
          2      3 
        /  \ 
       4    5  


Input:

n = 5, x = 1


Subtree sizes from node 1:

Left subtree → {2,4,5} → size = 3

Right subtree → {3} → size = 1

Parent side → 0

Max region size = 3
3 > n/2 = 2 → Player 2 wins

Output:

true
```

---

## 6. Approaches

### Approach 1: Subtree Size Analysis (Optimal)

**Idea:**
- After Player 1 picks node x, Player 2 should pick a node in the largest region among:
  * Left subtree of x
  * Right subtree of x
  * Remaining parent-side tree
- If the largest region has more than half the nodes, Player 2 can win.

**Steps:**
- Locate node x
- Compute:
  * leftSize = size of left subtree of x
  * rightSize = size of right subtree of x
  * parentSide = n - (leftSize + rightSize + 1)
- Find maxRegion = max(leftSize, rightSize, parentSide)
- If maxRegion > n/2, return true, else false

**Java Code:**
```java
boolean btreeGameWinningMove(Node root, int n, int x) {
    int[] sizes = new int[3]; // [left, right, parent]
    count(root, x, sizes);

    int maxRegion = Math.max(
        sizes[0],
        Math.max(sizes[1], sizes[2])
    );

    return maxRegion > n / 2;
}

int count(Node root, int x, int[] sizes) {
    if (root == null) return 0;

    int left = count(root.left, x, sizes);
    int right = count(root.right, x, sizes);

    if (root.data == x) {
        sizes[0] = left;
        sizes[1] = right;
        sizes[2] = totalNodes - (left + right + 1);
    }

    return left + right + 1;
}

int totalNodes;




totalNodes = n should be set before calling count().
```

**💭 Intuition Behind the Approach:**
- After first move, the game becomes territorial
- Players cannot cross through the opponent’s colored node
- Player 2 must pick the largest isolated region
- Majority region ⇒ guaranteed win

**Complexity (Time & Space):**
- Time: O(N) — single DFS traversal
- Space: O(H) — recursion stack

---

## 7. Justification / Proof of Optimality

- Since the first player blocks node x, the tree splits into independent regions.
- If Player 2 controls a region larger than half the tree, Player 1 can never catch up.
---

## 8. Variants / Follow-Ups

- Multi-player coloring game
- Graph coloring instead of tree
- Weighted nodes instead of equal value
---

## 9. Tips & Observations

- Only three regions matter
- Do not simulate the game
- Think in terms of node counts, not turns
---

## 10. Pitfalls

- Forgetting parent-side region
- Using >= n/2 instead of > n/2
- Assuming BST properties
---

<!-- #endregion -->
