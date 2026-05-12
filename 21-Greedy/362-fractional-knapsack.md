<!-- #region 362-Fractional Knapsack -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q362: Fractional Knapsack</h1>

## 1. Problem Statement

- Given N items where each item has:
    * value[i]
    * weight[i]
- You are given a knapsack with capacity W.
- You must maximize total value inside the knapsack.
- Unlike 0/1 Knapsack:
- You are allowed to take fractional parts of an item.
- Input:
- First line: N and W
- Second line: N values
- Third line: N weights
- Output:
- Print maximum value with exactly 2 decimal precision.
---

## 2. Problem Understanding

- Since we can break items,
- this becomes a Greedy problem.
- Key Idea:
- Take item with highest value per unit weight first.
- Value density:
    * ratio = value / weight
- Higher ratio → more profit per unit weight.
- So:
- 1. Sort items by descending ratio.
- 2. Take full item if capacity allows.
- 3. Otherwise take fractional part.
---

## 3. Constraints

- 1 <= N <= 100000
- 1 <= W <= 100000
- 1 <= weight, value <= 1000
- Sorting O(N log N) is acceptable.
---

## 4. Edge Cases

- Capacity smaller than smallest weight
- Capacity larger than total weight
- Single item
- All items same ratio
---

## 5. Examples

```text
Example 1
Input:
3 50
60 100 120
10 20 30

Output:
240.00

Explanation:
Ratios:
60/10 = 6
100/20 = 5
120/30 = 4

Pick 60 fully (10)
Pick 100 fully (20)
Remaining capacity = 20
Take 20/30 fraction of 120 = 80

Total = 60 + 100 + 80 = 240.00


Example 2
Input:
2 50
60 100
10 20

Output:
160.00

Explanation:
Take both fully since total weight = 30 < 50
Total = 160.00
```

---

## 6. Approaches

### Approach 1: Brute Force Enumeration (Theoretical / Exponential)

**Idea:**
- Observation:
- Since fractional amounts are allowed,
- in theory we could try:
- For each item:
    * take 0% to 100% of it.
- That means continuous possibilities.
- To make it discrete for brute force,
- we can think in small fractional steps (like 0.01).
- This creates massive branching.
- At each item:
    * Option 1 → skip
    * Option 2 → take fully
    * Option 3 → take fraction
- This becomes exponential branching.
- So brute force explores all subsets + fractional splits.
- Why It Is Impractical
  * Number of combinations explodes.
  * Even without fractions:
      * 2^N subsets.
  * With fractional splits:
      * infinite possibilities.
  * So this approach is only theoretical.

**Steps:**
- For index i:
    * Either:
        * skip item
        * take full item
        * take fractional part (if remaining capacity < weight)

**Java Code:**
```java
double fractionalKnapsack(int W, Item arr[], int n) {
    return solve(arr, 0, W, n);
}

double solve(Item[] arr, int index, int capacity, int n) {

    if (index == n || capacity == 0) {
        return 0.0;
    }

    // Option 1: Skip current item
    double skip = solve(arr, index + 1, capacity, n);

    // Option 2: Take full item (if possible)
    double takeFull = 0.0;
    if (arr[index].weight <= capacity) {
        takeFull = arr[index].value +
                   solve(arr, index + 1,
                         capacity - arr[index].weight, n);
    }

    // Option 3: Take fractional part and stop
    double takeFraction = 0.0;
    if (arr[index].weight > capacity) {
        takeFraction = ((double)arr[index].value /
                        arr[index].weight) * capacity;
    }

    return Math.max(skip,
           Math.max(takeFull, takeFraction));
}
```

**💭 Intuition Behind the Approach:**
- We try every possible decision at every item.
- This mimics 0/1 knapsack recursion
- plus fractional choice.
- But this does NOT exploit greedy structure.
- It blindly explores possibilities.

**Complexity (Time & Space):**
- Time: O(2^N) — Each item creates branching.
- Space: O(N) — Recursion stack depth.
- If we tried to simulate fractional splits in multiple steps,
- complexity becomes unbounded.
- This is why brute force is infeasible for N up to 100000.
- Why This Is Wrong Conceptually
  * Fractional knapsack does NOT require exploring combinations.
  * It has greedy choice property.
  * So brute force is unnecessary and inefficient.

### Approach 2: Optimal Greedy (Value/Weight Sorting)

**Idea:**
- Observation:
- If we want maximum value,
- always prefer item giving more value per unit weight.
- This is proven optimal using greedy exchange argument.
- Algorithm:
- 1. Compute ratio = value / weight
- 2. Sort items in descending ratio
- 3. Iterate:
      * if weight <= capacity:
           * take full item
      * else:
           * take fraction and stop

**Java Code:**
```java
double fractionalKnapsack(int W, Item arr[], int n) {

    Arrays.sort(arr, new Comparator<Item>() {
        public int compare(Item a, Item b) {
            double r1 = (double)a.value / a.weight;
            double r2 = (double)b.value / b.weight;

            if (r1 < r2) return 1;
            else if (r1 > r2) return -1;
            return 0;
        }
    });

    double totalValue = 0.0;

    for (int i = 0; i < n; i++) {

        if (W >= arr[i].weight) {
            totalValue += arr[i].value;
            W -= arr[i].weight;
        } else {
            double fraction = (double) W / arr[i].weight;
            totalValue += arr[i].value * fraction;
            break;
        }
    }

    return totalValue;
}
```

**💭 Intuition Behind the Approach:**
- If an item has higher ratio,
- replacing a lower ratio item with it
- always increases total value.
- So locally optimal choice
- → globally optimal solution.
- This works ONLY because fractional picking is allowed.

**Complexity (Time & Space):**
- Time: O(N log N) — Sorting dominates.
- Space: O(1) — No extra space apart from sorting.

---

## 7. Justification / Proof of Optimality

- Greedy choice property holds.
- If a lower ratio item is chosen before higher ratio,
- we can swap fractions and increase value.
- Thus sorting by ratio guarantees optimality.
---

## 8. Variants / Follow-Ups

- 0/1 Knapsack (DP problem)
- Minimize cost for weight constraint
- Scheduling with profit density
---

## 9. Tips & Observations

- Fractional Knapsack → Greedy
- 0/1 Knapsack → DP
- Whenever fractional allowed,
- think greedy ratio.
---

## 10. Pitfalls

- Do NOT sort by value only.
- Do NOT sort by weight only.
- Do NOT use integer division for ratio.
- Always use double.
---

<!-- #endregion -->
