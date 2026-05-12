# Count Subarrays With Given XOR K

## 🧠 Intuition

We are given an array and an integer k.
We must count the number of contiguous subarrays whose XOR equals k.

Important:

This is a subarray problem, so the elements must be contiguous.

The key idea is similar to Count Subarrays With Sum K, but instead of addition we use the XOR operation.

---

## Approach 1 — Brute Force

### Idea

Fix each index as the starting point of the subarray.
Extend the subarray to the right while maintaining the running XOR.

Whenever the XOR becomes equal to k, increment the count.

---

### Pseudocode

count = 0

for i from 0 to n-1:
    xor = 0
    for j from i to n-1:
        xor ^= nums[j]

        if xor == k:
            count++

return count

---

### Complexity

Time: O(n²) — For every starting index we explore all elements to its right.
Space: O(1) — No extra data structures required.

---

## Approach 2 — Optimal (Prefix XOR + HashMap)

### Key XOR Identity

For prefix XOR:

prefix[i] = nums[0] ^ nums[1] ^ ... ^ nums[i]

XOR of subarray (j+1 → i):

prefix[i] ^ prefix[j]

If this equals k:

prefix[i] ^ prefix[j] = k

Rearranging:

prefix[j] = prefix[i] ^ k

So while iterating, if we know prefix[i], we just need to check whether
prefix[i] ^ k appeared earlier.

---

### Idea

1. Maintain running prefix XOR.
2. For each index, compute xor ^ k.
3. If that value exists in the map, add its frequency to the count.
4. Store the current prefix XOR frequency in the map.

The HashMap stores:

prefixXor → frequency

Initialize:

map.put(0, 1)

This handles subarrays starting from index 0.

---

### Pseudocode

map = empty hashmap
map.put(0,1)

xor = 0
count = 0

for num in nums:
    xor ^= num

    count += map.getOrDefault(xor ^ k, 0)

    map.put(xor, map.getOrDefault(xor, 0) + 1)

return count

---

### Complexity

Time: O(n) — Each element is processed once.
Space: O(n) — HashMap stores prefix XOR frequencies.

---

## Why Frequency Matters

If xor ^ k appeared earlier f times, then there are f different starting points for subarrays ending at the current index.

Each occurrence produces a valid subarray.

So we add:

count += f

Instead of just:

count++

---

## Pattern Recognition

Use Prefix XOR + HashMap when:

• The problem asks for subarray XOR equals k
• We need to count total subarrays
• Negative numbers or any integers are present

---

## Interview Summary (Crisp Version)

Brute force checks all subarrays in O(n²) by computing XOR for every range.

The optimal solution uses prefix XOR and a HashMap storing frequencies of prefix XOR values.
Using the identity prefix[i] ^ prefix[j] = k, we search for prefix[i] ^ k in the map and count how many times it appeared earlier, giving an O(n) solution.