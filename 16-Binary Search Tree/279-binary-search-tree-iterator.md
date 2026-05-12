<!-- #region 279-Binary Search Tree Iterator -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q279: Binary Search Tree Iterator</h1>

## 1. Problem Statement

- Design an iterator over a Binary Search Tree such that:
  * next() returns the next smallest element (inorder).
  * hasNext() returns whether a next element exists.
---

## 2. Problem Understanding

- Design an iterator over a Binary Search Tree such that:
  * next() returns the next smallest element (inorder).
  * hasNext() returns whether a next element exists.
---

## 3. Constraints

- 1 <= N <= 10000
- 1 <= Node Value <= 100000
---

## 4. Edge Cases

- Empty tree
- Single node tree
- Skewed tree
- Multiple next() calls
---

## 5. Examples

```text
Example 1

Input (Inorder):
1 2 3 4 5 6 7

BST Structure:

        4
       / \
      2   6
     / \ / \
    1  3 5  7

Output Sequence:
1 2 3 4 5 6 7

Example 2

Input (Inorder):
3 4 5

BST Structure:

        4
       / \
      3   5

Output Sequence:
3 4 5
```

---

## 6. Approaches

### Approach 1: Store Full Inorder (Brute Force)

**Idea:**
- Precompute inorder traversal and iterate using index.

**Steps:**
- Do inorder traversal
- Store values in list
- Maintain pointer index
- next() returns list[index++]
- hasNext() checks index < list.size()

**Java Code:**
```java
class BSTIterator {
    List<Integer> list = new ArrayList<>();
    int idx = 0;

    BSTIterator(Node root) {
        inorder(root);
    }

    void inorder(Node node) {
        if (node == null) return;
        inorder(node.left);
        list.add(node.data);
        inorder(node.right);
    }

    public boolean hasNext() {
        return idx < list.size();
    }

    public int next() {
        return list.get(idx++);
    }
}
```

**💭 Intuition Behind the Approach:**
- Simple simulation of inorder traversal.
- Uses extra memory.

**Complexity (Time & Space):**
- Time: O(N) preprocessing, O(1) per operation.
- Space: O(N) — inorder storage.

### Approach 2: Stack-Based Lazy Traversal (Optimal)

**Idea:**
- Simulate inorder using a stack.
- Only store left path nodes.

**Steps:**
- Constructor:
  * Push all left nodes from root to stack.
- next():
  * Pop top node.
  * If popped node has right child,
    * push its left path.
- hasNext():
  * stack not empty

**Java Code:**
```java
class BSTIterator {
    Stack<Node> stack = new Stack<>();

    BSTIterator(Node root) {
        pushLeft(root);
    }

    void pushLeft(Node node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }

    public boolean hasNext() {
        return !stack.isEmpty();
    }

    public int next() {
        Node curr = stack.pop();
        if (curr.right != null) {
            pushLeft(curr.right);
        }
        return curr.data;
    }
}
```

**💭 Intuition Behind the Approach:**
- This is iterative inorder traversal, one element at a time.

**Complexity (Time & Space):**
- Time: O(1) amortized per next().
- Space: O(H) — height of tree.

---

## 7. Justification / Proof of Optimality

- Stack always holds the next smallest unvisited nodes.
- Thus inorder order is preserved correctly.
---

## 8. Variants / Follow-Ups

- Reverse BST Iterator (descending order)
- Peek operation
- Kth next element
---

## 9. Tips & Observations

- Iterator pattern avoids full traversal cost upfront.
- Very common interview design problem.
---

## 10. Pitfalls

- Pushing entire tree.
- Forgetting to process right subtree.
- Using recursion instead of stack.
---

<!-- #endregion -->
