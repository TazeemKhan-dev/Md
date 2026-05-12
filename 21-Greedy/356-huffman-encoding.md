<!-- #region 356-Huffman Encoding -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q356: Huffman Encoding</h1>

## 1. Problem Statement

- You are given a string S of distinct characters of size N and an array f[]
- where character S[i] has frequency f[i].
- Your task is to build the Huffman Tree and return all Huffman Codes
- in preorder traversal of the constructed tree.
- Rules:
- If two nodes have same frequency,
- the one that occurs first must be placed on the left.
- Otherwise,
- node with smaller frequency goes to left,
- larger to right.
---

## 2. Problem Understanding

- Huffman Encoding builds a binary tree such that:
- More frequent characters get smaller code length.
- Less frequent characters get longer code length.
- Construction rule:
- Repeatedly merge two nodes with smallest frequencies.
- Final tree is built bottom-up.
- Once tree is built:
- Traverse it preorder.
- Left edge = append "0"
- Right edge = append "1"
- Leaf nodes contain actual characters.
- Internal nodes contain combined frequencies.
---

## 3. Constraints

- 1 <= N <= 26
- All characters are distinct
---

## 4. Edge Cases

- If N == 1:
- Only one character exists.
- Its code should be "0".
---

## 5. Examples

```text
Example 1

Input:
S = "abcdef"
f = [5, 9, 12, 13, 16, 45]

Step 1: Build Min Heap

Initial nodes:
a(5), b(9), c(12), d(13), e(16), f(45)

Step 2: Merge smallest two repeatedly

1) Merge a(5) + b(9) → 14
2) Merge c(12) + d(13) → 25
3) Merge 14 + e(16) → 30
4) Merge 25 + 30 → 55
5) Merge f(45) + 55 → 100 (root)

Final Huffman Tree:

                (100)
               /     \
            f(45)     (55)
                     /    \
                  (25)     (30)
                 /   \     /   \
              c(12) d(13) (14)  e(16)
                             / \
                          a(5) b(9)


Assign codes:
Left = 0
Right = 1

Traverse:

f  → 0
c  → 100
d  → 101
a  → 1100
b  → 1101
e  → 111

Preorder traversal (leaf codes):
0 100 101 1100 1101 111


Example 2

Input:
S = "abcde"
f = [2, 3, 7, 9, 18]

Initial nodes:
a(2), b(3), c(7), d(9), e(18)

Step 1: Merge 2 + 3 → 5
Step 2: Merge 5 + 7 → 12
Step 3: Merge 9 + 12 → 21
Step 4: Merge 18 + 21 → 39 (root)

Final Huffman Tree:

                (39)
               /     \
            e(18)     (21)
                     /    \
                  d(9)     (12)
                           /   \
                        (5)    c(7)
                       /   \
                    a(2)  b(3)


Assign codes:

e → 0
d → 10
a → 1100
b → 1101
c → 111

Preorder leaf output:
0 10 1100 1101 111
```

---

## 6. Approaches

### Approach 1: Optimal Greedy (Min Heap + Tree Construction)

**Idea:**
- Use Min Heap to always extract two smallest frequencies.
- Build tree bottom-up.

**Steps:**
- 1. Create a Node class:
   * char data
   * int freq
   * Node left, right
- 2. Insert all characters into Min Heap ordered by:
   * frequency
   * if tie → insertion order
- 3. While heap size > 1:
   * Remove two smallest nodes
   * Create new node with:
       * freq = sum
       * left = first removed
       * right = second removed
   * Insert new node back into heap
- 4. Remaining node is root.
- 5. Perform preorder traversal:
   * If leaf → add current code to result.
   * Go left with code + "0"
   * Go right with code + "1"

**Java Code:**
```java
class Solution {

    class Node {
        char ch;
        int freq;
        Node left, right;

        Node(char ch, int freq) {
            this.ch = ch;
            this.freq = freq;
        }
    }

    public ArrayList<String> huffmanCodes(String S, int f[], int N) {

        PriorityQueue<Node> pq = new PriorityQueue<>(
            (a, b) -> {
                if (a.freq == b.freq)
                    return 0;
                return a.freq - b.freq;
            }
        );

        for (int i = 0; i < N; i++) {
            pq.add(new Node(S.charAt(i), f[i]));
        }

        if (N == 1) {
            ArrayList<String> single = new ArrayList<>();
            single.add("0");
            return single;
        }

        while (pq.size() > 1) {

            Node left = pq.poll();
            Node right = pq.poll();

            Node parent = new Node('#', left.freq + right.freq);
            parent.left = left;
            parent.right = right;

            pq.add(parent);
        }

        Node root = pq.poll();

        ArrayList<String> result = new ArrayList<>();
        generateCodes(root, "", result);

        return result;
    }

    void generateCodes(Node root, String code, ArrayList<String> result) {

        if (root == null)
            return;

        if (root.left == null && root.right == null) {
            result.add(code);
            return;
        }

        generateCodes(root.left, code + "0", result);
        generateCodes(root.right, code + "1", result);
    }
}
```

**💭 Intuition Behind the Approach:**
- Why smallest first?
- Because when merging,
- that merged frequency will appear again in future merges.
- So if a large frequency is merged early,
- it keeps adding repeatedly → increases total weighted path.
- Greedy ensures:
- Small weights go deeper.
- Large weights stay near root.
- This minimizes:
- Total weighted path length.

**Complexity (Time & Space):**
- Time: O(N log N) — each insertion and removal from heap costs log N
- Space: O(N) — heap + tree nodes

---

## 7. Justification / Proof of Optimality

- Huffman Encoding is proven optimal using Greedy choice property.
- At each step:
- Choosing two smallest frequencies
- never worsens final total weighted path length.
- This satisfies optimal substructure.
---

## 8. Variants / Follow-Ups

- Minimum Cost of Ropes
- Optimal Merge Pattern
- File Merge Cost
- Prefix Codes
---

## 9. Tips & Observations

- Whenever:
- You must merge smallest repeatedly
- Think:
- Min Heap + Greedy
- Whenever:
- Binary encoding with frequency weights
- Think:
- Huffman
---

## 10. Pitfalls

- Handle N == 1
- Maintain correct left-right ordering
- Comparator must handle ties properly
- Do not print internal nodes
- Only print leaf node codes
---

<!-- #endregion -->
