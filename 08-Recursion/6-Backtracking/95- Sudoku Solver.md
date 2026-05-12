<!-- #region Sudoku Solver -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Sudoku Solver (Backtracking)</h1>

## 1. Problem Statement

- You are given a 9×9 Sudoku board filled with digits '1'–'9' and '.' (empty cells).
- Fill the board so it becomes a valid Sudoku.
- Rules:
  * Each row → unique 1–9
  * Each column → unique 1–9
  * Each 3×3 box → unique 1–9
- Modify the board in-place.

---

## 2. Problem Understanding

- This is a backtracking problem.
- At each empty cell:
  * Try digits 1–9
  * Check validity
  * If valid → move forward
  * If invalid → backtrack
- Goal = fill all cells correctly.

---

## 3. Constraints

- Fixed size: 9×9
- Values: '1'–'9' or '.'
- At least one valid solution exists

---

## 4. Edge Cases

- Already solved board
- Only one empty cell
- Multiple valid paths
- Early invalid placements

---

## 5. Examples
```
Input

5 3 . . 7 . . . .
6 . . 1 9 5 . . .
. 9 8 . . . . 6 .
8 . . . 6 . . . 3
4 . . 8 . 3 . . 1
7 . . . 2 . . . 6
. 6 . . . . 2 8 .
. . . 4 1 9 . . 5
. . . . 8 . . 7 9

Output

5 3 4 6 7 8 9 1 2
6 7 2 1 9 5 3 4 8
1 9 8 3 4 2 5 6 7
8 5 9 7 6 1 4 2 3
4 2 6 8 5 3 7 9 1
7 1 3 9 2 4 8 5 6
9 6 1 5 3 7 2 8 4
2 8 7 4 1 9 6 3 5
3 4 5 2 8 6 1 7 9
```
---

## 6. Approaches

### Approach 1: Backtracking (Standard)

**Idea:**
- Try all possibilities and undo if wrong

**Steps:**
- Traverse board
- If empty:
  * Try 1–9
  * Check safe
  * Place → recurse
  * If fails → remove
- If no empty → solved

**Java Code:**

    static boolean solveSudoku(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char num = '1'; num <= '9'; num++) {
                        if (isSafe(board, r, c, num)) {
                            board[r][c] = num;

                            if (solveSudoku(board)) return true;

                            board[r][c] = '.'; // backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    static boolean isSafe(char[][] board, int r, int c, char num) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == num) return false;
            if (board[i][c] == num) return false;
        }

        int boxRow = (r / 3) * 3;
        int boxCol = (c / 3) * 3;

        for (int i = boxRow; i < boxRow + 3; i++) {
            for (int j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] == num) return false;
            }
        }

        return true;
    }

**💭 Intuition:**
- Each empty cell = decision point
- Try → go deeper → fail → undo
- Classic DFS + pruning

**Complexity:**
- Time: O(9^(empty cells)) — branching factor 9
- Space: O(81) — recursion depth

---

## 7. Justification

- No greedy shortcut exists
- Must explore possibilities
- Backtracking prunes invalid paths early

---

## 8. Variants

- Sudoku Validator
- N-Queens
- Word Search
- Combination Sum

---

## 9. Tips

- Always check before placing
- Backtracking = try → recurse → undo
- Optimize using boolean arrays if needed

---

## 10. Pitfalls

- Forgetting to undo ('.')
- Wrong box calculation
- Missing base case
- Infinite recursion

---

<!-- #endregion -->