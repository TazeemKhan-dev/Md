# Longest Increasing Subsequence

## 📘 LOG

**One-Liner Summary**  
Find the length of the longest strictly increasing subsequence using greedy + binary search.

**Pattern**  
DP on subsequences + greedy optimization

**Key Trick**  
Maintain minimal possible ending values for each subsequence length.

**Core Invariant**  
tails[i] stores the smallest ending value of an increasing subsequence of length i+1.

**Why this works**  
Smaller ending values give more room to extend in the future, so replacing larger endings is always safe.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N log N)  
Space: O(N)

**Similar Problems**  
- Longest non-decreasing subsequence  
- Russian doll envelopes  
- Maximum length chain of pairs  
- Bitonic subsequence  

**Tags**  
dp, greedy, binary-search, subsequence, optimization


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given an array of integers.  
We need the length of the longest subsequence such that:

Indices are increasing.  
Values are strictly increasing.  

Subsequence means:
We can skip elements.  
They do NOT need to be contiguous.

---

### 2. Why This Is Not a Sliding Window Problem  

Because subsequence is not contiguous.  

We are allowed to skip elements.  
So window techniques do not apply.

This is a classic DP on subsequences problem.

---

### 3. DP Baseline (Conceptual Foundation)  

Define:
dp[i] = length of LIS ending at index i.

For every i:
We check all j < i.
If a[j] < a[i],
we can extend LIS from j.

So:
dp[i] = 1 + max(dp[j]) for all j < i and a[j] < a[i]

Answer is:
max(dp[i])

This works, but takes O(N²).

---

### 4. Core Greedy Insight  

Instead of tracking full dp,
we track only the best possible endings.

We maintain an array:
tails

Meaning:
tails[len] = smallest possible ending value
of any increasing subsequence of length len+1.

This array is always sorted.

---

### 5. How the Greedy Algorithm Works  

We process elements one by one.

For each element x:

We binary search in tails:
Find first index pos where tails[pos] >= x.

Case 1:
If such pos exists:
Replace tails[pos] = x

Case 2:
If not found:
Append x to tails.

Finally:
length of tails = LIS length.

---

### 6. Why Replacing Is Correct  

We are not building the actual LIS.

We are building the best possible endings.

If we replace a larger ending with a smaller one:
The subsequence length stays same.
But future elements get more chance to extend it.

So:
Smaller ending value is always better.

This is the greedy heart of the algorithm.

---

### 7. Dry Reasoning Example  

Array = [10, 9, 2, 5, 3, 7, 101, 18]

Process:

10 → tails = [10]  
9  → [9]  
2  → [2]  
5  → [2,5]  
3  → [2,3]  
7  → [2,3,7]  
101 → [2,3,7,101]  
18  → [2,3,7,18]

Length = 4

Which matches LIS length.

---

### 8. Why This Is Optimal  

Each element is processed once.  
Each step does binary search on tails.

So:
Time = O(N log N)  
Space = O(N)

You cannot do better than this.

---

### 9. Interview Mental Model  

Think of it as:

"I don’t care about the actual subsequence.  
I only care about the best possible ending values.  
Smaller endings always dominate bigger endings."

This is a **DP + Greedy + Binary Search hybrid**  
and one of the most important advanced patterns in DSA.
