<!-- #region 290- Car Pooling -->

<h1 style="text-align:center; font-size:2.5em; font-weight:bold;">Q290: Car Pooling</h1>

## 1. Problem Statement

- You are given multiple trip descriptions and a car capacity.
- Each trip specifies how many passengers enter the car at a starting point
- and leave the car at an ending point.
- The car moves only in one direction.
- Determine whether the car can successfully complete all trips
- without exceeding its passenger capacity at any point.
---

## 2. Problem Understanding

- At any location, some passengers get in and some get out.
- While moving east, the number of passengers inside the car changes over time.
- For every point on the route, we must ensure:
    * currentPassengers <= capacity
- If at any moment the number of passengers exceeds the car capacity,
- the schedule is impossible.
---

## 3. Constraints

- 1 <= n <= 1000
- 1 <= numPassengers <= 100
- 0 <= from < to <= 1000
- 1 <= capacity <= 10^5
---

## 4. Edge Cases

- Only one trip.
- All trips start after others end.
- Multiple overlapping trips.
- Exact capacity filled.
- Trips with same start and end points.
---

## 5. Examples

```text
Trips:
[2, 1, 5]
[3, 3, 7]
Capacity = 5

At location 1:
Passengers = 2

At location 3:
Passengers = 5

At location 5:
Passengers = 3

At location 7:
Passengers = 0

Result = true


Trips:
[2, 1, 5]
[3, 3, 7]
Capacity = 4

At location 3:
Passengers = 5

Result = false
```

---

## 6. Approaches

### Approach 1: Brute Force Simulation

**Idea:**
- Simulate every kilometer and track how many passengers are inside the car.

**Steps:**
- Find the maximum location among all trips.
- Create an array load[] initialized with 0.
- For each trip:
    * For i from from to to - 1:
        * load[i] += numPassengers.
- For each i:
    * If load[i] > capacity:
        * return false.
- Return true.

**Java Code:**
```java
public static boolean carPoolingBrute(int[][] trips, int capacity) {
    int maxPos = 0;
    for (int[] t : trips) {
        maxPos = Math.max(maxPos, t[2]);
    }

    int[] load = new int[maxPos + 1];

    for (int[] t : trips) {
        int p = t[0], from = t[1], to = t[2];
        for (int i = from; i < to; i++) {
            load[i] += p;
        }
    }

    for (int x : load) {
        if (x > capacity) return false;
    }
    return true;
}
```

**💭 Intuition Behind the Approach:**
- We explicitly count how many passengers are in the car at each point.
- This guarantees correctness but repeats many additions.

**Complexity (Time & Space):**
- Time: O(N * D) — D is the distance range, up to 1000.
- Space: O(D) — array for each location.

### Approach 2: Difference Array (Better)

**Idea:**
- Use a difference array to mark only change points instead of all positions.

**Steps:**
- Create diff array initialized with 0.
- For each trip [p, from, to]:
    * diff[from] += p
    * diff[to] -= p
- Compute prefix sum over diff:
    * current += diff[i]
- At any point:
    * If current > capacity:
        * return false.

**Java Code:**
```java
public static boolean carPoolingDiff(int[][] trips, int capacity) {
    int maxPos = 0;
    for (int[] t : trips) {
        maxPos = Math.max(maxPos, t[2]);
    }

    int[] diff = new int[maxPos + 1];

    for (int[] t : trips) {
        diff[t[1]] += t[0];
        diff[t[2]] -= t[0];
    }

    int current = 0;
    for (int i = 0; i <= maxPos; i++) {
        current += diff[i];
        if (current > capacity) return false;
    }
    return true;
}
```

**💭 Intuition Behind the Approach:**
- Instead of tracking every segment, we track only where changes happen.
- Prefix sum reconstructs actual passenger counts.

**Complexity (Time & Space):**
- Time: O(N + D) — marking changes and scanning once.
- Space: O(D) — difference array.

### Approach 3: Event Sorting (Optimal)

**Idea:**
- Treat every pickup and drop as an event and process in sorted order.

**Steps:**
- Create event list.
- For each trip:
    * Add event (from, +passengers)
    * Add event (to, -passengers)
- Sort events by location.
- If same location, process drop (-) before pickup (+).
- Traverse events:
    * current += eventChange
    * If current > capacity:
        * return false.

**Java Code:**
```java
public static boolean carPoolingOptimal(int[][] trips, int capacity) {
    List<int[]> events = new ArrayList<>();

    for (int[] t : trips) {
        events.add(new int[]{t[1], t[0]});
        events.add(new int[]{t[2], -t[0]});
    }

    events.sort((a, b) -> {
        if (a[0] == b[0]) return a[1] - b[1];
        return a[0] - b[0];
    });

    int current = 0;
    for (int[] e : events) {
        current += e[1];
        if (current > capacity) return false;
    }
    return true;
}
```

**💭 Intuition Behind the Approach:**
- We only care about changes in passenger count, not continuous positions.
- Sorting events ensures correct chronological processing.

**Complexity (Time & Space):**
- Time: O(N log N) — sorting pickup and drop events.
- Space: O(N) — storing events.

---

## 7. Justification / Proof of Optimality

- Difference array and event-based methods avoid unnecessary simulation
- and efficiently track passenger changes.
- They guarantee capacity is never exceeded while minimizing computation.
---

## 8. Variants / Follow-Ups

- Car pooling with multiple vehicles.
- Capacity scheduling with time intervals.
- Meeting room allocation problems.
---

## 9. Tips & Observations

- This problem is a classic interval overlap with capacity constraint.
- Difference array and sweep line are key techniques.
---

## 10. Pitfalls

- Forgetting that drop happens before pickup at the same location.
- Simulating every unit unnecessarily.
- Not handling overlapping trips correctly.
---

<!-- #endregion -->
