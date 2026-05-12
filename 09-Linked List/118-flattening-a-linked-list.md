<!-- #region 118-Flattening a Linked List -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q118: Flattening a Linked List</h1>

## 1. Problem Understanding

```
You are given a linked list where:
Each node has 2 pointers:
  right → points to next list head
  down → points to a sorted sub-linked-list

Every sub-list is sorted.

Goal:
Flatten all lists into a single sorted list using ONLY the down pointer.

Final Conditions:
  All nodes must be connected using down pointers
  right pointers must be removed (set to null)
  Output should be sorted
```

---

## 2. Constraints

```
Number of lists n ≤ 50
Size of each sublist k ≤ 20
Total nodes ≤ 1000
Values ≤ 1000
```

---

## 3. Edge Cases

```
Empty main list
Only one list
Each list has one element
All values are same
Highly skewed lists
```

---

## 4. Examples

```
Example 1:

Input:
5 → 10 → 19 → 28
↓    ↓     ↓     ↓
7    20    22    35
↓           ↓     ↓
8           50    40
↓                 ↓
30                45

Output:
5 7 8 10 19 20 22 28 30 35 40 45 50

Explanation:
All nodes are merged into a single sorted down chain.


Example 2:

Input:
5 → 10 → 19 → 28
↓         ↓
7         22
↓         ↓
8         50
↓
30

Output:
5 7 8 10 19 22 28 30 50

Explanation:
Flattening merges all lists maintaining sorted order.
```

---

## 5. Approaches

---

### Approach 1: Iterative Sequential Merge

#### Idea
```
Observation:
  Each down list is already sorted.

Core Concept:
  Merge lists one by one from left to right.

Strategy:
  result = first list
  then merge(result, next list)
  repeat until all lists are merged
```

#### Steps
```
Initialize result = root
Traverse right side
Merge result with each list
Ensure right pointers are removed
Return result
```

#### Java Code
```java
static Node merge(Node a, Node b) {
    Node dummy = new Node(-1);
    Node tail = dummy;

    while (a != null && b != null) {
        if (a.data < b.data) {
            tail.down = a;
            a = a.down;
        } else {
            tail.down = b;
            b = b.down;
        }
        tail = tail.down;
        tail.right = null;
    }

    while (a != null) {
        tail.down = a;
        a = a.down;
        tail = tail.down;
        tail.right = null;
    }

    while (b != null) {
        tail.down = b;
        b = b.down;
        tail = tail.down;
        tail.right = null;
    }

    return dummy.down;
}

static Node flatten(Node root) {
    if (root == null) return null;

    Node result = root;
    Node curr = root.right;

    while (curr != null) {
        result = merge(result, curr);
        curr = curr.right;
    }

    return result;
}
```

#### Intuition Behind the Approach
```
We keep merging sorted lists one by one.
Each merge increases the size of result.
Simple and avoids recursion.
```

#### Complexity
```
Time: O(N * n) — each merge traverses nodes again sequentially
Space: O(1) — in-place merging, no extra space
```

---

### Approach 2: Recursive Right-to-Left Merge

#### Idea
```
Observation:
  Lists are connected via right pointer.

Core Concept:
  Flatten from right side first, then merge.

Strategy:
  flatten(right)
  merge(current, flattened right)
```

#### Steps
```
Base case:
  if root is null or only one list → return root

Recursively flatten right side
Merge current with flattened right
Remove right pointers
Return result
```

#### Java Code
```java
// Merge two sorted down lists
static Node merge(Node a, Node b) {
    if (a == null) return b;
    if (b == null) return a;

    Node result;

    if (a.data < b.data) {
        result = a;
        result.down = merge(a.down, b);
    } else {
        result = b;
        result.down = merge(a, b.down);
    }

    result.right = null;
    return result;
}

static Node flatten(Node root) {
    if (root == null || root.right == null)
        return root;

    root.right = flatten(root.right);
    root = merge(root, root.right);

    return root;
}
```

#### Intuition Behind the Approach
```
We reduce the problem:
merge(L1, merge(L2, merge(L3...)))

Recursion handles flattening naturally.
```

#### Complexity
```
Time: O(N * n) — repeated merging of growing lists
Space: O(n) — recursion stack depth
```

---

### Approach 3: Min Heap (Optimal)

#### Idea
```
Observation:
  This is exactly merging K sorted lists.

Core Concept:
  Always pick the smallest node using a Min Heap.

Strategy:
  Push all list heads into heap
  Extract min node
  Push its down node
```

#### Steps
```
Create min heap based on node value
Insert all head nodes
While heap not empty:
  Extract smallest node
  Attach to result
  If node has down → push into heap
Set right pointers to null
Return result
```

#### Java Code
```java
import java.util.PriorityQueue;

static Node flatten(Node root) {
    if (root == null) return null;

    PriorityQueue<Node> pq = new PriorityQueue<>(
        (a, b) -> a.data - b.data
    );

    Node curr = root;
    while (curr != null) {
        pq.offer(curr);
        curr = curr.right;
    }

    Node dummy = new Node(-1);
    Node tail = dummy;

    while (!pq.isEmpty()) {
        Node node = pq.poll();

        tail.down = node;
        tail = tail.down;
        tail.right = null;

        if (node.down != null) {
            pq.offer(node.down);
        }
    }

    return dummy.down;
}
```

#### Intuition Behind the Approach
```
Heap always gives smallest element.
We simulate merging K sorted lists efficiently.
Avoid repeated full traversals.
```

#### Complexity
```
Time: O(N log n) — each node inserted and removed from heap
Space: O(n) — heap stores at most n nodes
```

---

## 6. Justification

```
Merging sorted lists is optimal strategy.
Heap approach reduces repeated traversal.
Ensures sorted order and efficient merging.
In-place structure maintained.
```

---

## 7. Variants

```
Merge K sorted linked lists
Flatten multilevel doubly linked list
Flatten binary tree to linked list
```

---

## 8. Tips & Observations

```
Always use down pointer for merging
Set right pointer to null
Think of it as merge K sorted lists
Heap approach is best for interviews
Avoid creating new nodes
```

---

## 9. Pitfalls

```
Forgetting to remove right pointers
Mixing right and down traversal
Incorrect merge logic
Missing heap optimization
```

<!-- #endregion -->