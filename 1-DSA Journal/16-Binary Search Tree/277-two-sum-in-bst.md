<!-- #region 277-Two sum in BST -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q277: Two sum in BST</h1>

## 1. Problem Statement

- Given a Binary Search Tree and a target value k,
- determine if there exist two nodes such that their sum equals k.
- Return true if such a pair exists, else return false.
---

## 2. Problem Understanding

- We must find two distinct nodes X and Y such that:
  * X.data + Y.data = k
- Because this is a BST, an inorder traversal gives a sorted sequence,
- which allows two-pointer style searching.
---

## 3. Constraints

- 1 <= N <= 10^4
- -10^4 <= Node Value <= 10^4
- -10^5 <= k <= 10^5
---

## 4. Edge Cases

- Tree with less than 2 nodes
- Negative values
- Target very large or very small
- Multiple valid pairs
---

## 5. Examples

```text
Input (Inorder):
2 3 4 5 6 7
Target = 9

BST Structure (conceptual):

        5
       / \
      3   7
     / \   \
    2   4   6

Output:
true


Input (Inorder):
2 3 4 5 6 7
Target = 28

BST Structure:

        5
       / \
      3   7
     / \   \
    2   4   6

Output:
false
```

---

## 6. Approaches

### Approach 1: Brute Force Pair Checking

**Idea:**
- Check every pair of nodes.

**Steps:**
- Store all nodes in a list using traversal
- For each i, for each j > i
  * If list[i] + list[j] == k return true
- Return false

**Java Code:**
```java
static boolean checkTarget(Node root, int k) {
    List<Integer> list = new ArrayList<>();
    inorder(root, list);
    int n = list.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (list.get(i) + list.get(j) == k) return true;
        }
    }
    return false;
}

static void inorder(Node node, List<Integer> list) {
    if (node == null) return;
    inorder(node.left, list);
    list.add(node.data);
    inorder(node.right, list);
}
```

**💭 Intuition Behind the Approach:**
- Direct pair comparison, no BST optimization.

**Complexity (Time & Space):**
- Time: O(N^2) — all pairs checked.
- Space: O(N) — inorder storage.

### Approach 2: HashSet Based

**Idea:**
- Traverse and store complements in a set.

**Steps:**
- If node is null return false
- If (k - node.data) exists in set return true
- Add node.data to set
- Check left and right subtrees

**Java Code:**
```java
static boolean checkTarget(Node root, int k) {
    Set<Integer> set = new HashSet<>();
    return dfs(root, k, set);
}

static boolean dfs(Node node, int k, Set<Integer> set) {
    if (node == null) return false;
    if (set.contains(k - node.data)) return true;
    set.add(node.data);
    return dfs(node.left, k, set) || dfs(node.right, k, set);
}
```

**💭 Intuition Behind the Approach:**
- Classic Two Sum logic on tree traversal.

**Complexity (Time & Space):**
- Time: O(N) — each node visited once.
- Space: O(N) — hash set storage.

### Approach 3: Two Pointer on Inorder (Optimal)

**Idea:**
- BST inorder gives sorted list.
- Use two-pointer technique.

**Steps:**
- Store inorder traversal into list
- Use two pointers i = 0, j = n-1
- While i < j
  * sum = list[i] + list[j]
  * If sum == k return true
  * If sum < k i++
  * Else j--
- Return false

**Java Code:**
```java
static boolean checkTarget(Node root, int k) {
    List<Integer> list = new ArrayList<>();
    inorder(root, list);

    int i = 0, j = list.size() - 1;
    while (i < j) {
        int sum = list.get(i) + list.get(j);
        if (sum == k) return true;
        if (sum < k) i++;
        else j--;
    }
    return false;
}
```

**💭 Intuition Behind the Approach:**
- Sorted structure allows binary-style narrowing.
- Most efficient practical solution.

**Complexity (Time & Space):**
- Time: O(N) — traversal + linear scan.
- Space: O(N) — inorder list.

---

## 7. Justification / Proof of Optimality

- Inorder traversal preserves sorted order.
- Two-pointer method guarantees all valid pairs are checked efficiently.
---

## 8. Variants / Follow-Ups

- Two Sum in Binary Tree
- Find all pairs with given sum
- Count pairs with given sum
---

## 9. Tips & Observations

- This is Two Sum on sorted data.
- BST property is key.
---

## 10. Pitfalls

- Using only parent-child pairs.
- Allowing same node twice.
- Ignoring negative values.
---

<!-- #endregion -->
