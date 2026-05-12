# Q49 — Majority Element I / II / n/k

## 📘 LOG

**One-Liner Summary**  
Use elimination (Boyer–Moore voting) to cancel out non-majority elements and keep only possible majority candidates.

**Pattern**  
Voting / Elimination / Frequency threshold

**Key Trick**  
For threshold n/k, maintain only (k - 1) candidates.

**Core Invariant**  
True majority elements cannot be completely canceled.

**Why this works**  
Majority elements appear more times than all others combined.

**Status**  
Solved (Optimal)

**Complexity**  
Majority I: O(n), Space O(1)  
Majority II: O(n), Space O(1)  
Majority n/k: O(nk), Space O(k)

**Similar Problems**  
- Top K frequent elements  
- Find duplicates in stream  
- Heavy hitters  
- Sliding window majority  

**Tags**  
array, voting, frequency, elimination, greedy


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  
We are given an array.

We need to find:
Elements that appear more than:
n/2 times,
n/3 times,
or n/k times.

This is not about sorting or exact counting.
It is about **frequency dominance**.

---

### 2. Key Mathematical Insight  

For threshold n/x:
There can be at most (x - 1) valid elements.

So:
n/2 → at most 1  
n/3 → at most 2  
n/k → at most (k - 1)

This limits how many candidates
we ever need to track.

---

### 3. Why Brute Force Is Wasteful  

HashMap counts everything.

But we don’t need exact frequencies for all elements.

We only care about:
elements that dominate.

So instead of counting,
we **eliminate losers early**.

---

### 4. Core Idea (Boyer–Moore Intuition)  

Think of it like voting.

Every time two different elements meet,
they cancel each other.

If an element is truly majority,
it cannot be fully canceled,
because it appears more than all others combined.

So it will survive elimination.

---

### 5. Majority I (n/2) Logic  

We keep:
one candidate and one count.

If count becomes zero:
we switch candidate.

Different elements cancel each other.

At the end:
the remaining candidate must be the majority.

No verification needed,
because problem guarantees existence.

---

### 6. Majority II (n/3) Logic  

At most 2 elements can exceed n/3.

So we track:
two candidates and two counts.

When a third distinct element appears:
we decrement both counts.

This simulates canceling three different elements.

After one pass:
we verify the two candidates.

---

### 7. Majority n/k (General Case)  

We track:
(k - 1) candidates.

When a new element comes:
If it matches → increment.
Else if space → insert.
Else → decrement all.

This cancels k different elements at once.

At the end:
only possible majority elements remain.

We must verify them.

---

### 8. Why Verification Is Required  

Elimination guarantees:
Only possible candidates survive.

But not all survivors are guaranteed majority.

So final frequency check is mandatory
(except for n/2 case with guarantee).

---

### 9. Mental Model (Very Important)  

This is not counting.
This is **global elimination**.

We are repeatedly removing:
groups of k distinct elements.

Only elements that appear more than n/k times
can survive this process.

---

### How you explain this in interviews (perfect line)

> "I use Boyer–Moore voting.  
> For threshold n/k, I maintain k−1 candidates.  
> Different elements cancel each other.  
> Only true majority elements can survive elimination."

This shows:
- mathematical reasoning  
- greedy elimination  
- space optimization  
- algorithmic maturity  

This is a **core frequency dominance pattern**.
