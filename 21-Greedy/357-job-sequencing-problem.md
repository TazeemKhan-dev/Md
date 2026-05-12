<!-- #region 357-Job Sequencing Problem -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q357: Job Sequencing Problem</h1>

## 1. Problem Statement

- You are given N jobs.
- Each job has:
- id
- deadline
- profit
- Each job takes 1 unit of time.
- Only one job can be done at a time.
- A job gives profit only if completed on or before its deadline.
- Return:
- 1) Number of jobs done
- 2) Maximum profit earned
---

## 2. Problem Understanding

- We need to schedule jobs in time slots.
- Each job needs exactly 1 slot.
- If deadline = 4,
- it means job can be scheduled in slots:
- 1, 2, 3, or 4.
- Goal:
- Maximize total profit.
- Important:
- We cannot do more than 1 job in a single time slot.
---

## 3. Constraints

- 1 <= N <= 5000
- 1 <= deadline <= N
- 1 <= profit <= 500
---

## 4. Edge Cases

- All jobs have same deadline
- All jobs have same profit
- Only 1 job
- Deadlines larger than number of jobs
---

## 5. Examples

```text
Example 1

Input:
4
(1,4,20) (2,1,10) (3,1,40) (4,1,30)

After sorting by profit (descending):
(3,1,40)
(4,1,30)
(1,4,20)
(2,1,10)

Slots available: 1 2 3 4

Schedule:
Job 3 → slot 1 → profit = 40
Job 4 → slot 1 already taken → skip
Job 1 → slot 4 → profit = 20
Job 2 → slot 1 taken → skip

Total jobs = 2
Total profit = 60


Example 2

Input:
5
(1,2,100) (2,1,19) (3,2,27) (4,1,25) (5,1,15)

Sorted by profit:
(1,2,100)
(3,2,27)
(4,1,25)
(2,1,19)
(5,1,15)

Schedule:
Job1 → slot2 → profit=100
Job3 → slot1 → profit=27

Total jobs=2
Total profit=127
```

---

## 6. Approaches

### Approach 1: Brute Force (Try All Subsets)

**Idea:**
- Try every subset of jobs.
- For each subset:
    * Try to schedule jobs within deadlines.
- Keep track of maximum profit.

**Steps:**
- 1. Generate all subsets using bitmask.
- 2. For each subset:
    * Collect selected jobs.
    * Sort them by deadline.
    * Try to assign one by one in time slots.
    * If valid schedule:
        * Compute total profit.
- 3. Track maximum.

**Java Code:**
```java
int[] solve(Job arr[], int n) {

    int maxProfit = 0;
    int maxCount = 0;

    int totalSubsets = 1 << n;

    for (int mask = 0; mask < totalSubsets; mask++) {

        List<Job> selected = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) {
                selected.add(arr[i]);
            }
        }

        // Sort selected jobs by deadline
        selected.sort((a, b) -> a.deadline - b.deadline);

        boolean valid = true;
        int time = 0;
        int profit = 0;

        for (Job job : selected) {
            time++;
            if (time > job.deadline) {
                valid = false;
                break;
            }
            profit += job.profit;
        }

        if (valid) {
            if (profit > maxProfit) {
                maxProfit = profit;
                maxCount = selected.size();
            }
        }
    }

    return new int[]{maxCount, maxProfit};
}
```

**💭 Intuition Behind the Approach:**
- We try every possible job combination.
- Then check feasibility.

**Complexity (Time & Space):**
- Time: O(2^N * N log N)
- Space: O(N)

### Approach 2: Greedy + Sorting + Linear Slot Scan (Standard)

**Idea:**
- 1. Sort jobs in descending order of profit.
- 2. For each job:
   * Try to assign it to the latest available slot
   * before its deadline.
- Why latest slot?
  * To leave earlier slots free
  * for jobs with smaller deadlines.

**Steps:**
- 1. Sort jobs by profit descending.
- 2. Find max deadline.
- 3. Create boolean array slot[maxDeadline+1]
- 4. For each job:
   * For j = deadline down to 1:
       * if slot[j] empty:
           * assign job
           * break

**Java Code:**
```java
int[] solve(Job arr[], int n) {

    Arrays.sort(arr, (a, b) -> b.profit - a.profit);

    int maxDeadline = 0;
    for (Job job : arr) {
        maxDeadline = Math.max(maxDeadline, job.deadline);
    }

    boolean[] slot = new boolean[maxDeadline + 1];

    int count = 0;
    int totalProfit = 0;

    for (int i = 0; i < n; i++) {

        for (int j = arr[i].deadline; j > 0; j--) {

            if (!slot[j]) {
                slot[j] = true;
                count++;
                totalProfit += arr[i].profit;
                break;
            }
        }
    }

    return new int[]{count, totalProfit};
}
```

**💭 Intuition Behind the Approach:**
- Greedy choice:
- Take highest profit first.
- Scheduling it as late as possible
- keeps earlier slots open
- for tighter deadlines.

**Complexity (Time & Space):**
- Time: O(N log N + N * D)
- Worst case D ≈ N → O(N^2)
- Space: O(N)

### Approach 3: Optimized Using Disjoint Set (Union-Find)

**Idea:**
- Instead of scanning backward for free slot,
- use DSU to quickly find latest available slot.
- Concept
  * If slot x is filled,
  * union(x, x-1)
  * Find(deadline) gives next available slot.

**Java Code:**
```java
int[] solve(Job arr[], int n) {

    Arrays.sort(arr, (a, b) -> b.profit - a.profit);

    int maxDeadline = 0;
    for (Job job : arr) {
        maxDeadline = Math.max(maxDeadline, job.deadline);
    }

    int[] parent = new int[maxDeadline + 1];
    for (int i = 0; i <= maxDeadline; i++)
        parent[i] = i;

    int count = 0;
    int totalProfit = 0;

    for (Job job : arr) {

        int available = find(parent, job.deadline);

        if (available > 0) {

            count++;
            totalProfit += job.profit;

            union(parent, available, available - 1);
        }
    }

    return new int[]{count, totalProfit};
}

int find(int[] parent, int x) {
    if (parent[x] == x)
        return x;
    return parent[x] = find(parent, parent[x]);
}

void union(int[] parent, int u, int v) {
    parent[u] = v;
}
```

**💭 Intuition Behind the Approach:**
- Each slot points to next free slot on left.
- Once slot 5 is taken,
- it merges with slot 4.
- So next time,
- find(5) directly returns next free slot.

**Complexity (Time & Space):**
- Time: O(N log N + N α(N))
- ≈ O(N log N)
- Space: O(N)

---

## 7. Justification / Proof of Optimality

- Greedy works because:
- If we skip a higher profit job
- and choose lower profit,
- we lose guaranteed profit.
- Exchange argument proves correctness:
- Replacing lower profit with higher profit
- never reduces optimal solution.
---

## 8. Variants / Follow-Ups

- Activity Selection
- Weighted Interval Scheduling
- Task Scheduling with Deadlines
---

## 9. Tips & Observations

- Whenever:
  * You must schedule tasks with deadlines
  * and maximize profit
- Think:
  * Sort by profit descending
  * Schedule as late as possible
---

## 10. Pitfalls

- Do not schedule in earliest slot
- Always try latest possible slot
- Sort by profit descending
- Handle deadlines correctly
---

<!-- #endregion -->
