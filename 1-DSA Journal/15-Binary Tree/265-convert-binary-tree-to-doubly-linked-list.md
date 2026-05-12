<!-- #region 265-Convert Binary Tree to Doubly Linked List -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q265: Convert Binary Tree to Doubly Linked List</h1>

## 1. Problem Statement

- Given the root of a Binary Tree, convert it into a Doubly Linked List (DLL) in-place.
- Rules:
  * The left pointer should act as prev
  * The right pointer should act as next
  * The order of nodes in DLL must be the same as the Inorder Traversal of the binary tree
  * Do not create new nodes; reuse existing ones
- Return the head of the Doubly Linked List.
---

## 2. Problem Understanding

- Inorder traversal order is:
  * Left → Root → Right
- The DLL should follow this exact sequence
- We must rewire pointers, not allocate extra nodes
- Tree structure will be destroyed (converted into DLL)
---

## 3. Constraints

- Tree can be empty
- Tree can be skewed or balanced
- Node values are unique or non-unique (doesn’t matter)
---

## 4. Edge Cases

- Empty tree
- Single-node tree
- Left-skewed tree
- Right-skewed tree
---

## 5. Examples

```text
Example 1

Tree:

        10
       /  \
     12    15
    /  \
   25  30


Inorder Traversal:

25 12 30 10 15


Doubly Linked List:

25 <-> 12 <-> 30 <-> 10 <-> 15

Example 2

Tree:

        1
         \
          2
           \
            3


DLL:

1 <-> 2 <-> 3
```

---

## 6. Approaches

### Approach 1: Recursive Inorder Traversal (Optimal)

**Idea:**
- Perform an inorder traversal while keeping track of:
  * prev → previously processed node
  * head → first node of DLL

**Steps:**
- Recur on left subtree
- If prev is null → current node is head
- Else:
  * prev.right = current
  * current.left = prev
- Update prev = current
- Recur on right subtree

**Java Code:**
```java
Node head = null;
Node prev = null;

Node bToDLL(Node root) {
    inorder(root);
    return head;
}

void inorder(Node root) {
    if (root == null) return;

    inorder(root.left);

    if (prev == null) {
        head = root;
    } else {
        root.left = prev;
        prev.right = root;
    }
    prev = root;

    inorder(root.right);
}
```

**💭 Intuition Behind the Approach:**
- Inorder traversal already gives correct sequence
- prev acts as the previous DLL node
- First visited node becomes DLL head
- Clean, intuitive, interview-friendly

**Complexity (Time & Space):**
- Time: O(N) — each node visited once
- Space: O(H) — recursion stack height

### Approach 2: Iterative Inorder Using Stack

**Idea:**
- Simulate inorder traversal using an explicit stack and rewire pointers.

**Steps:**
- Push all left nodes
- Process node
- Move to right subtree
- Maintain prev pointer as in recursive approach

**Java Code:**
```java
Node bToDLL(Node root) {
    if (root == null) return null;

    Stack<Node> st = new Stack<>();
    Node curr = root, head = null, prev = null;

    while (curr != null || !st.isEmpty()) {
        while (curr != null) {
            st.push(curr);
            curr = curr.left;
        }

        curr = st.pop();

        if (prev == null) {
            head = curr;
        } else {
            prev.right = curr;
            curr.left = prev;
        }
        prev = curr;

        curr = curr.right;
    }

    return head;
}
```

**💭 Intuition Behind the Approach:**
- Same logic as recursive
- Stack replaces recursion
- Safer for deep trees

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(N) — stack

### Approach 3: Morris Traversal (O(1) Space)

**Idea:**
- Use Morris Inorder Traversal to avoid recursion and stack.

**Steps:**
- For each node:
  * If left is null → process node
  * Else find inorder predecessor
- Create temporary threads
- Rewire DLL pointers during traversal

**Java Code:**
```java
Node bToDLL(Node root) {
    Node curr = root, prev = null, head = null;

    while (curr != null) {
        if (curr.left == null) {
            if (prev == null) head = curr;
            else {
                prev.right = curr;
                curr.left = prev;
            }
            prev = curr;
            curr = curr.right;
        } else {
            Node pre = curr.left;
            while (pre.right != null && pre.right != curr) {
                pre = pre.right;
            }

            if (pre.right == null) {
                pre.right = curr;
                curr = curr.left;
            } else {
                pre.right = null;
                if (prev == null) head = curr;
                else {
                    prev.right = curr;
                    curr.left = prev;
                }
                prev = curr;
                curr = curr.right;
            }
        }
    }

    return head;
}
```

**💭 Intuition Behind the Approach:**
- Morris traversal gives inorder without extra space
- Threads help revisit nodes
- Harder to implement but optimal in space

**Complexity (Time & Space):**
- Time: O(N)
- Space: O(1)

---

## 7. Justification / Proof of Optimality

- Since the DLL must follow inorder traversal, inorder-based rewiring is the most natural and correct solution.
- Recursive approach is cleanest, Morris is most optimal.
---

## 8. Variants / Follow-Ups

- Convert BST to sorted DLL
- Convert to circular DLL
- Convert DLL back to balanced tree
---

## 9. Tips & Observations

- First inorder node → DLL head
- Always update both left and right
- Keep tree modification in mind
---

## 10. Pitfalls

- Forgetting to set head
- Missing prev update
- Creating new nodes (not allowed)
---

<!-- #endregion -->
