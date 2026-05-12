<!-- #region 101-Tower of Hanoi -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q101: Tower of Hanoi</h1>

---

## 🧠 Problem Understanding

    You are given N discs and 3 rods:
        Source (fromRod)
        Destination (toRod)
        Auxiliary (auxRod)

    Rules:
        Only 1 disk can be moved at a time
        Larger disk cannot be placed on smaller disk

    Goal:
        Move all disks from source → destination using minimum moves

---

## ⚙️ Constraints

    1 <= N <= 15
    Minimum moves = 2^N - 1

---

## ⚠️ Edge Cases

    N = 1 → only one move
    Large N → recursion depth increases

---

## 🧪 Example

    Input:
    3

    Output:
    move disk 1 from rod 1 to rod 3
    move disk 2 from rod 1 to rod 2
    move disk 1 from rod 3 to rod 2
    move disk 3 from rod 1 to rod 3
    move disk 1 from rod 2 to rod 1
    move disk 2 from rod 2 to rod 3
    move disk 1 from rod 1 to rod 3

---

## 💡 Approaches

---

### Approach 1: Recursive (Classic)

#### Idea

    Move n disks:
        1. Move n-1 from source → aux
        2. Move nth disk to destination
        3. Move n-1 from aux → destination

---

#### Java Code

    static void towerOfHanoi(int n, int from, int to, int aux) {
        if (n == 1) {
            System.out.println("move disk 1 from rod " + from + " to rod " + to);
            return;
        }

        towerOfHanoi(n - 1, from, aux, to);
        System.out.println("move disk " + n + " from rod " + from + " to rod " + to);
        towerOfHanoi(n - 1, aux, to, from);
    }

---

#### 🌳 Recursion Tree (N = 3)

    T(3)
      ├── T(2)
      │     ├── T(1)
      │     ├── move 2
      │     └── T(1)
      ├── move 3
      └── T(2)

---

#### 💭 Intuition

    Clear smaller stack → move big disk → rebuild stack

---

#### ⏱️ Complexity

    Time: O(2^N) — exponential calls
    Space: O(N) — recursion depth

---

### Approach 2: Iterative

#### Idea

    Use pattern based on:
        total moves = 2^N - 1
        odd/even N determines movement direction

---

#### Java Code

    static void tohIterative(int n, int from, int to, int aux) {
        int totalMoves = (1 << n) - 1;

        if (n % 2 == 0) {
            int temp = to;
            to = aux;
            aux = temp;
        }

        for (int i = 1; i <= totalMoves; i++) {
            if (i % 3 == 1) move(from, to);
            else if (i % 3 == 2) move(from, aux);
            else move(aux, to);
        }
    }

    static void move(int a, int b) {
        System.out.println("move disk from rod " + a + " to rod " + b);
    }

---

#### 💭 Intuition

    Simulates recursion using cyclic movement

---

#### ⏱️ Complexity

    Time: O(2^N)
    Space: O(1)

---

## 🔁 Variants

---

### Variant 1: Count Moves (Recursive)

    static int countMoves(int n) {
        if (n == 1) return 1;
        return 2 * countMoves(n - 1) + 1;
    }

    Time: O(2^N)
    Space: O(N)

---

### Variant 2: Count Moves (Formula)

    static int countMovesFormula(int n) {
        return (1 << n) - 1;
    }

    Time: O(1)
    Space: O(1)

---

### Variant 3: Store Moves in List

    static List<String> getMoves(int n, int from, int to, int aux) {
        List<String> res = new ArrayList<>();
        helper(n, from, to, aux, res);
        return res;
    }

    static void helper(int n, int from, int to, int aux, List<String> res) {
        if (n == 1) {
            res.add("move disk 1 from rod " + from + " to rod " + to);
            return;
        }

        helper(n - 1, from, aux, to, res);
        res.add("move disk " + n + " from rod " + from + " to rod " + to);
        helper(n - 1, aux, to, from, res);
    }

    Time: O(2^N)
    Space: O(2^N)

---

### Variant 4: Count Using Global Variable

    static int count = 0;

    static void countMovesGlobal(int n, int from, int to, int aux) {
        if (n == 1) {
            count++;
            return;
        }

        countMovesGlobal(n - 1, from, aux, to);
        count++;
        countMovesGlobal(n - 1, aux, to, from);
    }

---

### Variant 5: K-th Move

    Idea:
        Use recursion tree size = 2^(n-1)

    If k <= left subtree → go left  
    If k == middle → print  
    Else → go right

    Time: O(N)

---

### Variant 6: 4 Rods (Advanced)

    Use Frame–Stewart algorithm

    Idea:
        Split problem into k + remaining disks

---

## 🎯 Pattern Summary

    Tower of Hanoi = FIXED recursion

    f(n):
        f(n-1)
        do work
        f(n-1)

---

## 💡 Key Insights

    Not include/exclude
    Not loop-based

    It is:
        Fixed recursive branching

---

## ⚠️ Pitfalls

    Wrong rod order → wrong output
    Forgetting role swap → incorrect recursion
    Mixing aux/destination → logic breaks

---

<!-- #endregion -->