<!-- #region 289-Product of Array Except Self -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q289: Product of Array Except Self</h1>

## 1. Problem Statement

- You are given an integer array nums of size n where n > 1.
- Return an array output such that output[i] is equal to the product of all
- elements of nums except nums[i].
- The solution must run in linear time.
---

## 2. Problem Understanding

- For each index i, we need to compute:
    * nums[0] * nums[1] * ... * nums[i-1] * nums[i+1] * ... * nums[n-1]
- The element at index i must be excluded from the product.
- A naive solution would recompute products for every index, which is inefficient.
- We need an approach that avoids repeated multiplication.
---

## 3. Constraints

- 2 <= n <= 10^5
- -30 <= nums[i] <= 30
- The product of any prefix or suffix fits in a 32-bit integer.
---

## 4. Edge Cases

- Array contains exactly two elements.
- Array contains one or more zeros.
- All elements are 1.
- Large n with small values.
---

## 5. Examples

```text
nums = [4, 3, 2, 10]

Index 0
Product = 3 * 2 * 10 = 60

Index 1
Product = 4 * 2 * 10 = 80

Index 2
Product = 4 * 3 * 10 = 120

Index 3
Product = 4 * 3 * 2 = 24


nums = [1, 2, 3, 4, 5]

Index 0
Product = 120

Index 1
Product = 60

Index 2
Product = 40

Index 3
Product = 30

Index 4
Product = 24
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- For each index, multiply all elements except the current index.

**Steps:**
- For i from 0 to n-1:
    * Initialize product = 1.
    * For j from 0 to n-1:
        * If j != i:
            * product *= nums[j]
    * Store product in output[i].

**Java Code:**
```java
public static int[] productExceptSelfBrute(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];

    for (int i = 0; i < n; i++) {
        int product = 1;
        for (int j = 0; j < n; j++) {
            if (i != j) {
                product *= nums[j];
            }
        }
        res[i] = product;
    }
    return res;
}
```

**💭 Intuition Behind the Approach:**
- This directly follows the problem definition.
- It is easy to understand but performs repeated multiplications.

**Complexity (Time & Space):**
- Time: O(N^2) — nested loops multiply elements repeatedly.
- Space: O(1) — ignoring output array.

### Approach 2: Prefix and Suffix Arrays (Better)

**Idea:**
- Precompute products of elements to the left and right of each index.

**Steps:**
- Create left array where:
    * left[i] = product of nums[0 .. i-1]
- Create right array where:
    * right[i] = product of nums[i+1 .. n-1]
- For each index i:
    * output[i] = left[i] * right[i]

**Java Code:**
```java
public static int[] productExceptSelfPrefixSuffix(int[] nums) {
    int n = nums.length;
    int[] left = new int[n];
    int[] right = new int[n];
    int[] res = new int[n];

    left[0] = 1;
    for (int i = 1; i < n; i++) {
        left[i] = left[i - 1] * nums[i - 1];
    }

    right[n - 1] = 1;
    for (int i = n - 2; i >= 0; i--) {
        right[i] = right[i + 1] * nums[i + 1];
    }

    for (int i = 0; i < n; i++) {
        res[i] = left[i] * right[i];
    }
    return res;
}
```

**💭 Intuition Behind the Approach:**
- Instead of excluding nums[i], we multiply everything before and after it.
- Each element contributes to products exactly once.

**Complexity (Time & Space):**
- Time: O(N) — linear passes over the array.
- Space: O(N) — two auxiliary arrays are used.

### Approach 3: Prefix Product with Constant Space (Optimal)

**Idea:**
- Store prefix products directly in the output array and use a running suffix product.

**Steps:**
- Initialize output array.
- output[0] = 1
- For i from 1 to n-1:
    * output[i] = output[i - 1] * nums[i - 1]
- Initialize suffixProduct = 1
- For i from n-1 down to 0:
    * output[i] = output[i] * suffixProduct
    * suffixProduct = suffixProduct * nums[i]

**Java Code:**
```java
public static int[] productExceptSelfOptimal(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];

    res[0] = 1;
    for (int i = 1; i < n; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }

    int suffixProduct = 1;
    for (int i = n - 1; i >= 0; i--) {
        res[i] = res[i] * suffixProduct;
        suffixProduct *= nums[i];
    }
    return res;
}
```

**💭 Intuition Behind the Approach:**
- The output array first stores left products.
- A single backward pass injects right products without extra memory.

**Complexity (Time & Space):**
- Time: O(N) — two linear passes.
- Space: O(1) — no extra space apart from output array.

---

## 7. Justification / Proof of Optimality

- The optimal approach achieves linear time without using division
- and without allocating extra arrays, satisfying all constraints.
---

## 8. Variants / Follow-Ups

- Product of array except self with modulo.
- Product except self with division allowed.
- Product of array except self in matrix.
---

## 9. Tips & Observations

- Avoid division to handle zeros safely.
- Prefix and suffix techniques are reusable patterns.
- Always check if constant space optimization is possible.
---

## 10. Pitfalls

- Using division when zeros are present.
- Integer overflow in languages without bounds.
- Forgetting to initialize prefix values to 1.
---

<!-- #endregion -->
