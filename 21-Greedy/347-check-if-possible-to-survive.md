<!-- #region 347-Check if Possible to Survive -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q347: Check if Possible to Survive</h1>

## 1. Problem Statement

- You live on an island with only one grocery shop.
- The shop is open six days a week and closed on Sundays.
- Each day, you can buy n units of food.
- Each day, you consume x units of food to survive.
- You are building a boat that will take d days to complete.
- You must survive for at least d days.
- Given n, x, and d, determine whether it is possible to survive
- for d days on the island.
---

## 2. Problem Understanding

- Food can only be bought on days when the shop is open.
- The shop is closed every Sunday.
- Each open day
  * you can buy n units of food
- Each day
  * you must consume x units of food
- Goal
  * survive continuously for d days
  * including Sundays when buying is not allowed
- We must check if total food that can be bought
- is sufficient to cover total food consumption.
---

## 3. Constraints

- 1 <= n <= 10^8
- 1 <= x <= 10^8
- 1 <= d <= 10^8
---

## 4. Edge Cases

- Daily food bought is less than daily consumption
- Long duration with many Sundays
- Exact boundary cases where food just matches requirement
---

## 5. Examples

```text
Example 1
Input
16 2 10

Output
YES

Explanation
Food bought on Monday is enough till next Monday.
Food is repurchased and survival continues.


Example 2
Input
2 4 20

Output
NO

Explanation
Daily food earned is less than daily consumption.
Survival is impossible.
```

---

## 6. Approaches

### Approach 1: Brute Force (Simulation)

**Idea:**
- Simulate survival day by day.
- Buy food on open days.
- Consume food every day.
- Track remaining food.

**Steps:**
- Initialize food stock to 0
- For each day from 1 to d
  * If day is not Sunday
    * buy n units of food
  * Consume x units of food
  * If food becomes negative
    * return NO
- If all days completed
  * return YES

**Java Code:**
```java
static boolean isPossibleToSurvive(int n, int x, int d) {

    int food = 0;

    for (int day = 1; day <= d; day++) {

        if (day % 7 != 0) {
            food += n;
        }

        food -= x;

        if (food < 0) {
            return false;
        }
    }

    return true;
}
```

**💭 Intuition Behind the Approach:**
- This directly mirrors the real-life process.
- Each day is handled explicitly.

**Complexity (Time & Space):**
- Time: O(d) — simulation for each day
- Space: O(1) — constant storage

### Approach 2: Better (Counting Days)

**Idea:**
- Instead of simulating every day,
- count how many days food can be bought
- and compare total food with total requirement.

**Steps:**
- If n < x
  * return NO immediately
- Count number of Sundays within d days
- Buying days = d − number of Sundays
- Maximum food = buying days * n
- Required food = d * x
- If maximum food >= required food
  * return YES
- Else
  * return NO

**Java Code:**
```java
static boolean isPossibleToSurvive(int n, int x, int d) {

    if (n < x) {
        return false;
    }

    int sundays = d / 7;
    int buyingDays = d - sundays;

    long maxFood = (long) buyingDays * n;
    long requiredFood = (long) d * x;

    return maxFood >= requiredFood;
}
```

**💭 Intuition Behind the Approach:**
- Buying happens only on non-Sundays.
- Consumption happens every day.
- Only total capacity versus total demand matters.

**Complexity (Time & Space):**
- Time: O(1) — constant calculations
- Space: O(1) — no extra space

### Approach 3: Optimal (Greedy Invariant)

**Idea:**
- Survival is possible if and only if
- total obtainable food is at least total required food.
- This condition is necessary and sufficient.

**Steps:**
- Compute buyingDays = d − floor(d / 7)
- Check inequality
  * buyingDays * n >= d * x
- Return result of the inequality

**Java Code:**
```java
static boolean isPossibleToSurvive(int n, int x, int d) {

    if (n < x) {
        return false;
    }

    long buyingDays = d - (d / 7);
    return buyingDays * n >= (long) d * x;
}
```

**💭 Intuition Behind the Approach:**
- Food accumulation and consumption are linear.
- There is no benefit to delaying or reordering purchases.
- The inequality fully captures feasibility.

**Complexity (Time & Space):**
- Time: O(1) — direct condition check
- Space: O(1) — constant space

---

## 7. Justification / Proof of Optimality

- Food availability depends only on the number of buying days.
- Consumption depends only on the number of survival days.
- If total supply meets total demand, survival is guaranteed.
- Otherwise, it is impossible.
---

## 8. Variants / Follow-Ups

- Survival with multiple closed days
- Survival with variable daily consumption
- Resource feasibility problems
---

## 9. Tips & Observations

- Always check immediate impossibility first
- Convert simulation problems into count-based problems
- Greedy works when decisions do not affect future options
---

## 10. Pitfalls

- Ignoring Sundays
- Simulating day by day for large d
- Using int instead of long for large multiplication
---

<!-- #endregion -->
