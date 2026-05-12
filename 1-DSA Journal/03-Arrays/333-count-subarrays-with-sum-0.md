# Count Subarrays with Sum = 0

## 📘 LOG

**One-Liner Summary**  
Count all contiguous subarrays whose sum is zero using prefix sum frequency.

**Pattern**  
Prefix sum + HashMap (frequency counting)

**Key Trick**  
Equal prefix sums imply the subarray between them has sum zero.

**Core Invariant**  
If prefix[r] == prefix[x], then subarray (x+1..r) sums to 0.

**Why this works**  
Every zero-sum subarray corresponds to a pair of equal prefix sums, and counting frequencies avoids checking all pairs.

**Status**  
Solved (Optimal)

**Complexity**  
Time: O(N)  
Space: O(N)

**Similar Problems**  
- Count subarrays with sum = K  
- Longest subarray with sum = 0  
- Subarrays with sum divisible by K  
- Count subarrays with XOR = K  

**Tags**  
array, prefix-sum, hashmap, counting, subarray


<br>


## 🎤 Interview Explanation

### 1. Problem Restatement  

We are given an integer array.  
We must count how many contiguous subarrays have sum exactly equal to 0.  

Subarray must be continuous.  
We only return the count, not the actual subarrays.  
Array can contain positive, negative, and zero values.

---

### 2. Why Brute Force Is Bad  

The brute force approach checks all subarrays.  
There are about N² such subarrays.

For each:
We compute the sum and check if it is 0.

This works but is too slow for N up to 10⁵.

So we need to avoid nested loops.

---

### 3. Core Mathematical Insight  

Define prefix sum:
prefix[i] = sum from index 0 to i  

Sum of subarray (l..r) is:
prefix[r] - prefix[l-1]

We want this sum to be 0:

prefix[r] - prefix[l-1] = 0  
=> prefix[r] = prefix[l-1]

This means:
Whenever two prefix sums are equal,
everything between them sums to zero.

So the problem becomes:
How many pairs of equal prefix sums exist?

---

### 4. Frequency Idea (The Real Trick)  

Instead of checking all pairs,
we count how many times each prefix sum appears.

If a prefix sum value appears k times,
then number of pairs is:

k * (k - 1) / 2

Each such pair corresponds to one zero-sum subarray.

Also:
If prefix[i] = 0,
then subarray (0..i) is itself zero-sum.

---

### 5. One-Pass Algorithm  

We use:
HashMap<sum, frequency>

Initialize:
sum = 0  
count = 0  
map[0] = 1   (very important)

Now for each element:
sum += a[i]

If map contains sum:
count += map.get(sum)

Then:
map[sum]++

Why this works:
Every time we see the same prefix sum again,
it creates new zero-sum subarrays
with all its previous occurrences.

---

### 6. Dry Reasoning Example  

Array = [0, 0, 0]

prefix progression:
0, 0, 0

map starts as:
{0:1}

Index 0:
sum = 0  
map has 0 with freq 1  
count += 1 → count = 1  
map[0] = 2  

Index 1:
sum = 0  
map has 0 with freq 2  
count += 2 → count = 3  
map[0] = 3  

Index 2:
sum = 0  
map has 0 with freq 3  
count += 3 → count = 6  

Answer = 6

Which matches:
All possible subarrays.

---

### 7. Why This Is Optimal  

Every element is processed once.  
Every map operation is O(1).  

So total time is O(N).  

This is optimal because:
You cannot solve this without reading the entire array.

---

### 8. Interview Mental Model  

Think of it as:

"I convert subarray sums into prefix sums.  
Zero-sum subarrays correspond to equal prefix sums.  
So I just count how many times each prefix appears."

This shows:
Mathematical transformation  
Counting instead of searching  
Strong optimization thinking  

This is the **base template for all prefix sum counting problems.**
