<!-- #region 93-Valid Sudoku -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q93: Valid Sudoku</h1>

## 1. Problem Understanding

- You’re given a 9×9 Sudoku board (partially filled) with digits 1–9 and . representing empty cells.
- You must determine if the current board is valid, i.e., it follows all Sudoku rules for filled cells.
- Sudoku Rules:
  - Each row must have digits 1–9 without repetition.
  - Each column must have digits 1–9 without repetition.
  - Each of the nine 3×3 sub-boxes must also have digits 1–9 without repetition.
- 👉 You don’t have to solve the Sudoku — just check for validity of existing numbers.

---

## 2. Constraints

- Grid size: 9 × 9
- board[i][j] = '.' or '1'–'9'
- Validate only filled cells.

---

## 3. Edge Cases

- All cells are empty → ✅ valid.
- Duplicate number in any row/column/box → ❌ invalid.
- Invalid characters (not . or 1–9) → ❌ invalid.
- Partially filled but consistent → ✅ valid.

---

## 4. Examples

```text
Input
. 6 9 1 2 . . 8 3
. 5 . 3 6 7 2 . 9
3 . 2 5 8 . 6 1 7
1 2 5 9 . 3 8 . 6
. 3 . 8 1 . 9 2 4
4 9 . 2 7 6 3 5 1
. 1 . 6 9 8 7 3 5
9 . . 4 . . 1 6 8
5 8 6 7 3 1 4 9 2

Output
correct
```

---

## 5. Approaches

### Approach 1: Using Boolean Arrays (Straightforward & Clear)

**Idea:**

- Maintain three boolean matrices:
  - rows[9][10] → marks if a digit has appeared in a row
  - cols[9][10] → marks if a digit has appeared in a column
  - boxes[9][10] → marks if a digit has appeared in a 3×3 box
- If any duplicate found → invalid Sudoku.

**Java Code:**

```java
💻 Main Function
public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    char[][] board = new char[9][9];
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            board[r][c] = sc.next().charAt(0);
        }
    }
    System.out.println(isValidSudoku(board) ? "correct" : "incorrect");
}

⚙️ Helper Function
static boolean isValidSudoku(char[][] board) {
    boolean[][] rows = new boolean[9][10];
    boolean[][] cols = new boolean[9][10];
    boolean[][] boxes = new boolean[9][10];

    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            char ch = board[r][c];
            if (ch == '.') continue;
            int d = ch - '0';
            int boxIndex = (r / 3) * 3 + (c / 3);
            if (rows[r][d] || cols[c][d] || boxes[boxIndex][d]) return false;
            rows[r][d] = cols[c][d] = boxes[boxIndex][d] = true;
        }
    }
    return true;
}
```

**Complexity (Time & Space):**

- ⏱️ Time Complexity (Approach 1)
  - Process all 81 cells → O(81) = O(1)
  - Constant-time checks and updates → O(1)
- 💾 Space Complexity (Approach 1)
  - Three 9×10 boolean matrices → O(1)
- ✅ Overall
  - Time: O(1)
  - Space: O(1)

### Approach 2: Bitmasking (Optimized Space)

**Idea:**

- Use integer bitmasks to represent seen digits in rows, columns, and boxes.
- Each digit d corresponds to a bit (1 << d).

**Java Code:**

```java
static boolean isValidSudokuBit(char[][] board) {
    int[] rows = new int[9];
    int[] cols = new int[9];
    int[] boxes = new int[9];

    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            char ch = board[r][c];
            if (ch == '.') continue;
            int d = ch - '0';
            int bit = 1 << d;
            int boxIndex = (r / 3) * 3 + (c / 3);

            if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[boxIndex] & bit) != 0)
                return false;

            rows[r] |= bit;
            cols[c] |= bit;
            boxes[boxIndex] |= bit;
        }
    }
    return true;
}
```

**Complexity (Time & Space):**

- ⏱️ Time Complexity (Approach 2)
  - Check all cells → O(1)
  - Each bitwise operation → O(1)
- 💾 Space Complexity (Approach 2)
  - Three integer arrays (rows, cols, boxes) → O(1)
- ✅ Overall
  - Time: O(1)
  - Space: O(1)

### Approach 3: HashSet (Concise & Readable)

**Idea:**

- Use a single Set<String> to track unique combinations like:
- "5 in row 3", "5 in col 6", "5 in box 1-2"
- If any duplicate string appears → invalid Sudoku.

**Java Code:**

```java
static boolean isValidSudokuHashSet(char[][] board) {
    Set<String> seen = new HashSet<>();

    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char num = board[i][j];
            if (num == '.') continue;

            if (!seen.add(num + " in row " + i) ||
                !seen.add(num + " in col " + j) ||
                !seen.add(num + " in box " + i/3 + "-" + j/3))
                return false;
        }
    }
    return true;
}
```

**Complexity (Time & Space):**

- Time: O(1)
- Space: O(1)
- Pros: Easy to code and understand
- Cons: Slightly more memory than bitmasking

### Approach 4: Recursive Validation (DFS Style)

**Idea:**

- Validate the board recursively cell by cell.
- If a filled cell violates Sudoku rules → return false immediately.

**Java Code:**

```java
static boolean validate(char[][] board, int row, int col) {
    if (row == 9) return true; // reached end
    if (col == 9) return validate(board, row + 1, 0);
    if (board[row][col] == '.') return validate(board, row, col + 1);

    if (!isSafe(board, row, col, board[row][col])) return false;

    return validate(board, row, col + 1);
}

static boolean isSafe(char[][] board, int r, int c, char num) {
    for (int i = 0; i < 9; i++) {
        if (i != c && board[r][i] == num) return false;
        if (i != r && board[i][c] == num) return false;
    }

    int boxRow = (r / 3) * 3;
    int boxCol = (c / 3) * 3;

    for (int i = boxRow; i < boxRow + 3; i++) {
        for (int j = boxCol; j < boxCol + 3; j++) {
            if ((i != r || j != c) && board[i][j] == num) return false;
        }
    }
    return true;
}


🌳 Recursion Visualization

For the input:

1 . .
. 2 .
. . 3


Recursion Flow:

validate(0,0) → checks '1' → safe ✅ → validate(0,1)
validate(0,1) → '.' → skip → validate(0,2)
validate(0,2) → '.' → skip → validate(1,0)
...
validate(2,2) → '3' → safe ✅ → end reached → returns true


All cells validated → board is correct ✅
```

**Complexity (Time & Space):**

- ⏱️ Time Complexity (Approach 4)
  - Each of 81 cells validated once.
  - Each validation scans:
  - 9 cells in row
  - 9 cells in col
  - 9 in box → O(27) = O(1)
  - Total: O(81×27) ≈ O(1)
- 💾 Space Complexity (Approach 4)
  - Recursive stack depth ≤ 81 → O(1)
- ✅ Overall
  - Time: O(1)
  - Space: O(1)
  - Useful for conceptual clarity.

---

## 6. Justification / Proof of Optimality

- The time and space complexities are constant because the Sudoku grid size is always 9×9, meaning all loops and checks run a fixed number of times.
- All approaches (boolean arrays, bitmasking, HashSet, recursion) simply verify constraints — they don’t modify or solve the board.
- The boolean array method is most efficient and commonly used in interviews due to:
- O(1) lookups and updates
- Simple readability
- The bitmasking approach achieves the same logic in a space-optimized manner using integer operations.
- The recursive approach validates conceptually how Sudoku rules propagate cell by cell but is less practical for performance-sensitive environments.

---

## 7. Variants / Follow-Ups

- Sudoku Solver 🔍
  - Extend this validation to fill empty cells (.) recursively (backtracking).
  - Each step places a valid digit, checks constraints using isSafe, and continues recursively.
- Sudoku Generator 🧩
  - Create valid Sudoku puzzles by generating a solved board first, then remove random cells while keeping it solvable.
- Partial Sudoku Validator (Non-9×9) 🧠
  - Adapt validation logic for n×n Sudoku where n is a perfect square (e.g., 4×4, 16×16).
  - Formula for sub-box size becomes sqrt(n).
- Sudoku Validator for Streams ⚡
  - Validate a Sudoku board as numbers stream in (online validation).
  - Maintain hashmaps or bitmasks dynamically while reading input.
- Error Reporting Variant 🧾
  - Instead of boolean return, return coordinates of invalid cells for debugging or UI display.

---

## 8. Tips & Observations

- Formula for box index: (r / 3) \* 3 + (c / 3) → maps 9 subgrids uniquely.
- Short-circuit (return false) early to save time.
- Iterative methods are faster; recursion helps understand constraints deeply.
- All approaches have constant complexity because board size is fixed (9×9).

---

<!-- #endregion -->
