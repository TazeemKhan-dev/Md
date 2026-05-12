<!-- #region 278-Target Sum Pair In Bst -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q278: Target Sum Pair In Bst</h1>

## 1. Problem Statement

- Given a Binary Search Tree and a target value,
- print all unique pairs of nodes whose sum equals the target.
- Each pair must be printed as:
  * smaller_value larger_value
- Pairs must be in increasing order.
- If no such pair exists, print -1.
---

## 2. Problem Understanding

- We must find all distinct pairs (x, y) such that:
  * x + y = target
  * x < y
- Because this is a BST, inorder traversal gives sorted values,
- which helps avoid duplicates and maintain order.
---

## 3. Constraints

- 1 <= N <= 1000
- 1 <= Node Value <= 10^4
- 1 <= Target <= 10^6
---

## 4. Edge Cases

- Tree with less than 2 nodes
- No valid pair exists
- Multiple valid pairs
- Very large target
---

## 5. Examples

```text
Example 1

Input:
Nodes = 2 1 3
Target = 4

Tree:

        2
       / \
      1   3

Output:
1 3

Example 2

Input:
Nodes = 2 4 15 6 3
Target = 100

Tree:

        2
         \
          4
         /  \
        3   15
            /
           6

Output:
-1
```

---

## 6. Approaches

### Approach 1: Brute Force Pairing

**Idea:**
- Check every possible pair.

**Steps:**
- Store inorder traversal in list
- For each i, for each j > i
  * If list[i] + list[j] == target
    * print pair
- If no pair found print -1

**Java Code:**
```java
static void targetSumPairs(Node root, int target) {
    List<Integer> list = new ArrayList<>();
    inorder(root, list);

    boolean found = false;
    int n = list.size();
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (list.get(i) + list.get(j) == target) {
                System.out.println(list.get(i) + " " + list.get(j));
                found = true;
            }
        }
    }
    if (!found) System.out.println(-1);
}

static void inorder(Node node, List<Integer> list) {
    if (node == null) return;
    inorder(node.left, list);
    list.add(node.data);
    inorder(node.right, list);
}
```

**💭 Intuition Behind the Approach:**
- No BST optimization, just brute pairing.

**Complexity (Time & Space):**
- Time: O(N^2) — all pairs checked.
- Space: O(N) — inorder storage.

### Approach 2: Two Pointer on Inorder (Optimal)

**Idea:**
- Use sorted inorder list with two pointers.

**Steps:**
- Store inorder traversal in list
- i = 0, j = n - 1
- While i < j
  * sum = list[i] + list[j]
  * If sum == target
    * print pair
    * i++, j--
  * Else if sum < target
    * i++
  * Else
    * j--
- If no pair printed, print -1

**Java Code:**
```java
static void targetSumPairs(Node root, int target) {
    List<Integer> list = new ArrayList<>();
    inorder(root, list);

    int i = 0, j = list.size() - 1;
    boolean found = false;

    while (i < j) {
        int sum = list.get(i) + list.get(j);
        if (sum == target) {
            System.out.println(list.get(i) + " " + list.get(j));
            found = true;
            i++;
            j--;
        } else if (sum < target) {
            i++;
        } else {
            j--;
        }
    }

    if (!found) System.out.println(-1);
}
```

**💭 Intuition Behind the Approach:**
- Sorted order allows linear scanning and natural duplicate avoidance.

**Complexity (Time & Space):**
- Time: O(N) — traversal + two pointer scan.
- Space: O(N) — inorder list.

---

## 7. Justification / Proof of Optimality

- Inorder traversal produces sorted values.
- Two pointer technique guarantees all unique valid pairs in increasing order.
---

## 8. Variants / Follow-Ups

- Count target sum pairs
- Return only one pair
- Two Sum in Binary Tree
---

## 9. Tips & Observations

- This is Two Sum on sorted data.
- BST simplifies the problem.
---

## 10. Pitfalls

- Printing duplicate pairs.
- Using same node twice.
- Not maintaining order of output.
---

<!-- #endregion -->
