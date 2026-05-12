<!-- #region 261-Flatten Binary Tree to Linked List -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q261: Flatten Binary Tree to Linked List</h1>

## 1. Problem Statement

- Given the root of a Binary Tree, flatten the tree into a linked list in-place.
- Rules:
  * Use the same Node structure
  * right pointer → next node in the list
  * left pointer → always null
  * Order of nodes must follow preorder traversal
  * (Root → Left → Right)
---

## 2. Problem Understanding

- We are not creating a new list
- We must re-wire pointers of the existing tree
- After flattening:
  * Tree becomes a right-skewed structure
  * Traversing via right gives preorder sequence
- Output is usually verified using inorder traversal of the flattened tree
---

## 3. Constraints

- 1 <= T <= 10
- 1 <= N <= 1000
- Tree size is moderate → multiple approaches allowed
---

## 4. Edge Cases

- Single-node tree
- Left-skewed tree
- Right-skewed tree
- Already flattened tree
- Empty tree
---

## 5. Examples

```text
Example 1

Tree:

        1
       / \
      2   3


Preorder:

1 2 3


Flattened Tree:

1
 \
  2
   \
    3


Output:

1 2 3

Example 2

Tree:

        1
      /   \
     2     3
    /
   4


Preorder:

1 2 4 3


Flattened Tree:

1
 \
  2
   \
    4
     \
      3


Output:

1 2 4 3
```

---

## 6. Approaches

### Approach 1: Recursive Postorder (Optimal, In-Place)

**Idea:**
- Flatten right subtree first, then left subtree, and keep a reference to the previous node.

**Steps:**
- Recur on right subtree
- Recur on left subtree
- Set:
  * root.right = prev
  * root.left = null
- Update prev = root

**Java Code:**
```java
Node prev = null;

void flatten(Node root) {
    if (root == null) return;

    flatten(root.right);
    flatten(root.left);

    root.right = prev;
    root.left = null;
    prev = root;
}
```

**💭 Intuition Behind the Approach:**
- Reverse preorder = Right → Left → Root
- By processing in reverse, we can safely rewire pointers
- prev always points to the next node in preorder list

**Complexity (Time & Space):**
- Time: O(N) — each node processed once
- Space: O(H) — recursion stack height

### Approach 2: Iterative Using Stack (Preorder Simulation)

**Idea:**
- Simulate preorder traversal using a stack and rewire pointers as we go.

**Steps:**
- Push root into stack
- Pop node:
  * Push right child
  * Push left child
- Link current node to stack top
- Set left pointer to null

**Java Code:**
```java
void flatten(Node root) {
    if (root == null) return;

    Stack<Node> st = new Stack<>();
    st.push(root);

    while (!st.isEmpty()) {
        Node curr = st.pop();

        if (curr.right != null) st.push(curr.right);
        if (curr.left != null) st.push(curr.left);

        if (!st.isEmpty()) {
            curr.right = st.peek();
        }

        curr.left = null;
    }
}
```

**💭 Intuition Behind the Approach:**
- Stack ensures preorder order
- Explicit control over traversal
- Avoids recursion depth issues

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(N) — stack

### Approach 3: Morris Traversal (O(1) Space)

**Idea:**
- Use threaded binary tree technique to flatten without recursion or stack.

**Steps:**
- For each node:
  * If left exists:
    * Find rightmost node of left subtree
    * Attach original right subtree
    * Move left subtree to right
- Move to right node

**Java Code:**
```java
void flatten(Node root) {
    Node curr = root;

    while (curr != null) {
        if (curr.left != null) {
            Node prev = curr.left;
            while (prev.right != null) {
                prev = prev.right;
            }

            prev.right = curr.right;
            curr.right = curr.left;
            curr.left = null;
        }
        curr = curr.right;
    }
}
```

**💭 Intuition Behind the Approach:**
- Uses existing null pointers
- Modifies tree in-place
- Most optimal in space

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(1)

---

## 7. Justification / Proof of Optimality

- All approaches ensure preorder order.
- The recursive reverse-preorder and Morris traversal are preferred for clean in-place solutions
---

## 8. Variants / Follow-Ups

- Flatten to doubly linked list
- Restore original tree after flattening
- Flatten using inorder or postorder order
---

## 9. Tips & Observations

- Preorder order is mandatory
- Always set left = null
- Be careful not to lose subtrees while rewiring
---

## 10. Pitfalls

- Flattening left first (wrong order)
- Forgetting to nullify left pointer
- Losing right subtree links
---

<!-- #endregion -->
