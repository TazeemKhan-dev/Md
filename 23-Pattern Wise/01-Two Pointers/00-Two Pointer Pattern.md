# 🧠 Two Pointer Pattern — Intuition + Interview Master Note

---

## 📌 What is Two Pointer Pattern?

Two Pointer is a technique where **two variables (pointers)** traverse a data structure (array, string, linked list) simultaneously from different positions.

Instead of brute force (nested loops), we:
- Move pointers **intelligently**
- Eliminate unnecessary comparisons
- Reduce time complexity

---

## 🎯 Core Movement Types (FOUNDATION)

This is the most important mental model.

### 1. Toward Each Other
```
left → ← right
```
Used when:
- Comparing from both ends
- Sorted arrays
- Pair problems

Example:
- Palindrome
- Target sum (sorted array)

---

### 2. Away From Each Other
```
mid ← → expand
```
Used when:
- Expanding around a center
- Window growth type problems

---

### 3. Same Direction (Fast & Slow)
```
slow →  
fast  → →  
```
Used when:
- In-place modification
- Cycle detection
- Partitioning

Example:
- Remove duplicates
- Move zeroes
- Linked list cycle

---

## ⚡ Why Two Pointer Works

👉 Core idea: **Eliminate possibilities without checking them**

Key advantages:

1. No unnecessary iterations  
   → Avoid `O(n²)` brute force  

2. Early stopping  
   → Stop as soon as condition fails  

3. In-place processing  
   → No extra memory  

4. Efficiency improvement  
   → Time: `O(n²)` → `O(n)`  
   → Space: `O(n)` → `O(1)`  

---

## 🧠 Core Intuition (VERY IMPORTANT)

> “Every pointer movement removes a set of invalid cases.”

Instead of checking all pairs:
- We **use structure (sorted / symmetry)**
- We **move pointers based on condition**
- We **shrink the search space**

---

## 🔍 When to Use (Recognition)

Use Two Pointer when you see:

1. Comparing from both ends  
   → palindrome, reverse  

2. Pair / triplet problems  
   → sum = target  

3. Sorted array hint  
   → strong signal  

4. In-place modification  
   → remove duplicates, move elements  

5. Linked list structure  
   → cycle, middle node  

---

## 🔑 Keywords (Interview Triggers)

pair  
target sum  
sorted array  
palindrome  
reverse  
remove duplicates  
merge  
in-place  
continuous  
middle node  
cycle  

---

## 🧭 Decision Framework (HOW TO THINK)

When solving:

1. Can I avoid nested loops?  
2. Can two indices represent the state?  
3. Is there symmetry (start ↔ end)?  
4. Does moving pointer reduce search space?  

If YES → Apply Two Pointer

---

## ⚙️ Core Templates

---

### ✅ Template 1: Opposite Direction (Single Input)

```java
int left = 0;
int right = arr.length - 1;

while (left < right) {
    if (condition) {
        left++;
    } else {
        right--;
    }
}

return result;
```

👉 Use when:
- Sorted array
- Pair problems
- Comparing ends

---

### ✅ Template 2: Two Inputs (Exhaust Both)

```java
int i = 0;
int j = 0;

while (i < a.length && j < b.length) {
    if (condition) {
        i++;
    } else {
        j++;
    }
}

while (i < a.length) i++;
while (j < b.length) j++;
```

👉 Use when:
- Merging arrays
- Comparing two sequences

---

### ✅ Template 3: Fast & Slow Pointer

```java
int slow = 0;

for (int fast = 0; fast < arr.length; fast++) {
    if (condition(arr[fast])) {
        arr[slow] = arr[fast];
        slow++;
    }
}
```

👉 Use when:
- In-place modification
- Filtering / partitioning

---

## 🧠 Mental Models (Remember This)

- left = “start constraint”
- right = “end constraint”

OR

- fast = “explorer”
- slow = “builder”

---

## ⚠️ Common Mistakes

- Using two pointers without sorted data (when required)
- Wrong pointer movement → infinite loop
- Not understanding *why* pointer moves
- Mixing sliding window blindly
- Ignoring duplicates handling

---

## 💡 Key Insight (FINAL)

Two Pointer is not just a trick.

It is:
- A **search space reduction strategy**
- A **thinking pattern**
- A way to replace brute force with logic

---

## 🎤 Interview Explanation (Clean)

"Two Pointer is an optimization technique where we use two indices moving in a controlled manner to eliminate unnecessary comparisons. It is especially effective in sorted arrays, pair problems, and in-place operations, reducing time complexity from quadratic to linear."

---
