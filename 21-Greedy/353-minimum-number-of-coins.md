<!-- #region 353-Minimum Number Of Coins -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q353: Minimum Number Of Coins</h1>

## 1. Problem Statement

- You are given an infinite supply of Indian currency denominations
- {1, 2, 5, 10, 20, 50, 100, 200, 500}
- and a target amount A.
- You must determine the minimum number of coins or notes
- required to make the amount A.
- You need to print how many notes or coins
- are used for each denomination.
---

## 2. Problem Understanding

- You can use any denomination any number of times.
- The order of coins does not matter.
- Goal
  * represent the given amount A
  * using the minimum total number of coins and notes
- This is a classic coin change problem.
- However, the denominations are fixed and canonical.
---

## 3. Constraints

- 1 <= A <= 200000
- Denominations are fixed
- Infinite supply of each denomination
---

## 4. Edge Cases

- Amount is zero
- Amount is smaller than smallest denomination
- Amount exactly equals a denomination
- Large amount requiring many high-value notes
---

## 5. Examples

```text
Example 1
Input
688

Output
Number Of 500 Rupees Notes: 1
Number Of 100 Rupees Notes: 1
Number Of 50 Rupees Notes: 1
Number Of 20 Rupees Notes: 1
Number Of 10 Rupees Notes: 1
Number Of 5 Rupees Notes: 1
Number Of 2 Rupees Notes: 1
Number Of 1 Rupee Note: 1

Explanation
We start with the largest denomination.
500 is taken once, remaining amount becomes 188.
100 is taken once, remaining becomes 88.
50 is taken once, remaining becomes 38.
20 is taken once, remaining becomes 18.
10 is taken once, remaining becomes 8.
5 is taken once, remaining becomes 3.
2 is taken once, remaining becomes 1.
1 is taken once, remaining becomes 0.


Example 2
Input
1698

Output
Number Of 500 Rupees Notes: 3
Number Of 100 Rupees Notes: 1
Number Of 50 Rupees Notes: 1
Number Of 20 Rupees Notes: 2
Number Of 10 Rupees Notes: 0
Number Of 5 Rupees Notes: 1
Number Of 2 Rupees Notes: 1
Number Of 1 Rupees Notes: 1

Explanation
We greedily take the largest possible note each time.
This minimizes the total number of notes used.
```

---

## 6. Approaches

### Approach 1: Brute Force (Recursive Enumeration)

**Idea:**
- Try all possible combinations of coins.
- Track the combination with minimum coin count.

**Steps:**
- For each denomination
  * try taking 0, 1, 2, ... coins
- Recurse on remaining amount
- Track minimum coins used

**Java Code:**
```java
static int minCoinsBrute(int[] coins, int idx, int amount) {

    if (amount == 0) {
        return 0;
    }

    if (idx == coins.length) {
        return Integer.MAX_VALUE;
    }

    int res = Integer.MAX_VALUE;

    for (int take = 0; take * coins[idx] <= amount; take++) {
        int next = minCoinsBrute(coins, idx + 1, amount - take * coins[idx]);
        if (next != Integer.MAX_VALUE) {
            res = Math.min(res, next + take);
        }
    }

    return res;
}
```

**💭 Intuition Behind the Approach:**
- This checks every possible way to form the amount.
- It guarantees correctness.

**Complexity (Time & Space):**
- This checks every possible way to form the amount.
- It guarantees correctness.

### Approach 2: Better (Dynamic Programming)

**Idea:**
- Use DP where
  * dp[x] = minimum coins needed to form amount x

**Steps:**
- Initialize dp[0] = 0
- For each amount from 1 to A
  * try all denominations
  * dp[i] = min(dp[i], dp[i - coin] + 1)

**Java Code:**
```java
static int minCoinsDP(int amount) {

    int[] coins = {1,2,5,10,20,50,100,200,500};
    int[] dp = new int[amount + 1];

    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != Integer.MAX_VALUE) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount];
}
```

**💭 Intuition Behind the Approach:**
- We build answers for smaller amounts
- and reuse them for larger amounts.

**Complexity (Time & Space):**
- Time: O(A * D) — A states and D denominations
- Space: O(A) — DP array of size A

### Approach 3: Optimal (Greedy)

**Idea:**
- Always use the largest denomination
- that does not exceed the remaining amount.

**Steps:**
- Sort denominations in descending order
- For each denomination
  * take as many coins as possible
  * reduce remaining amount

**Java Code:**
```java
public void coinChange(int amount) {

    int[] coins = {500,200,100,50,20,10,5,2,1};
    int remaining = amount;

    for (int coin : coins) {
        int count = remaining / coin;
        remaining = remaining % coin;

        System.out.println(
            "Number Of " + coin + " Rupees Notes: " + count
        );
    }
}
```

**💭 Intuition Behind the Approach:**
- Indian currency is canonical.
- Using the largest denomination first
- always leads to an optimal solution.

**Complexity (Time & Space):**
- Time: O(D) — single pass over denominations
- Space: O(1) — constant extra space

---

## 7. Justification / Proof of Optimality

- For canonical coin systems like Indian currency,
- the greedy choice property holds.
- Replacing larger coins with smaller ones
- always increases the number of coins.
- Hence, greedy is optimal.
---

## 8. Variants / Follow-Ups

- Coin change with arbitrary denominations
- Minimum coins to make amount
- Unbounded knapsack
---

## 9. Tips & Observations

- Greedy does not work for all coin systems
- But it works for canonical currencies
- Always verify greedy validity
---

## 10. Pitfalls

- Using greedy for non-canonical coin sets
- Ignoring output format requirements
- Using DP unnecessarily when greedy suffices
---

<!-- #endregion -->
