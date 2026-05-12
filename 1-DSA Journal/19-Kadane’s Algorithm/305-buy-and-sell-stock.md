<!-- #region 305-Buy and Sell Stock -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q305: Buy and Sell Stock</h1>

## 1. Problem Statement

- You are given an integer array prices where prices[i] represents
- the stock price on the ith day.
- You must choose exactly one day to buy one stock
- and choose a later day to sell that stock.
- Your goal is to maximize the profit:
    * sellPrice − buyPrice
- If no profitable transaction is possible,
- you must return 0.
---

## 2. Problem Understanding

- You must buy before you sell.
- You cannot sell before buying.
- You are allowed to make at most one transaction.
- You need to find two indices i and j such that:
    * i < j
    * prices[j] − prices[i] is maximized
- If all prices are decreasing,
- then no profit is possible and the answer is 0.
---

## 3. Constraints

- 1 <= prices.length <= 100000
- 0 <= prices[i] <= 10000
- A brute force O(N^2) solution will be too slow.
---

## 4. Edge Cases

- Prices always decreasing
- Only one day
- Prices all equal
- Best profit is zero
- Large input size
---

## 5. Examples

```text
Example 1
Input
6
7 1 5 3 6 4

Best choice
Buy at 1
Sell at 6

Profit = 6 - 1 = 5


Example 2
Input
5
7 6 4 3 1

Prices always go down

Profit = 0
```

---

## 6. Approaches

### Approach 1: Brute Force

**Idea:**
- Try every possible buy day and every possible sell day.
- Compute profit for each valid pair.
- Take the maximum.

**Steps:**
- For each day i
    * For each day j > i
        * profit = prices[j] - prices[i]
        * update max

**Java Code:**
```java
int maxProfit(int[] prices) {
    int n = prices.length;
    int max = 0;

    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int profit = prices[j] - prices[i];
            if (profit > max) {
                max = profit;
            }
        }
    }
    return max;
}
```

**💭 Intuition Behind the Approach:**
- We directly try all valid buy–sell pairs
- and pick the one with the highest profit.

**Complexity (Time & Space):**
- Time: O(N^2) — all pairs of days
- Space: O(1) — no extra memory

### Approach 2: Optimal One-Pass Method

**Idea:**
- Keep track of the minimum price seen so far.
- At each day, try selling on that day.

**Steps:**
- minPrice = prices[0]
- maxProfit = 0
- For each day i from 1 to N-1
    * profit = prices[i] - minPrice
    * update maxProfit
    * update minPrice

**Java Code:**
```java
int maxProfit(int[] prices) {
    int minPrice = prices[0];
    int maxProfit = 0;

    for (int i = 1; i < prices.length; i++) {
        int profit = prices[i] - minPrice;
        maxProfit = Math.max(maxProfit, profit);
        minPrice = Math.min(minPrice, prices[i]);
    }

    return maxProfit;
}
```

**💭 Intuition Behind the Approach:**
- To get the best profit when selling today,
- we must have bought at the lowest price before today.
- So we continuously track the cheapest buy day so far.

**Complexity (Time & Space):**
- Time: O(N) — single scan
- Space: O(1) — only two variables

---

## 7. Justification / Proof of Optimality

- The best selling day only depends on the lowest buy price before it.
- So scanning once while tracking the minimum is enough.
---

## 8. Variants / Follow-Ups

- Buy and sell with multiple transactions
- Buy and sell with cooldown
- Buy and sell with transaction fee
- Two transactions allowed
---

## 9. Tips & Observations

- This is not a sliding window problem.
- This is a prefix minimum problem.
- Profit is always sell − buy,
- never the other way around.
---

## 10. Pitfalls

- Allowing sell before buy
- Resetting profit incorrectly
- Using Kadane’s algorithm here
- Forgetting to return 0 when no profit exists
---

<!-- #endregion -->
