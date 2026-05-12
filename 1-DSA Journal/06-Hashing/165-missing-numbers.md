# Missing Numbers

## 🧠 Intuition

We are given two arrays:

arr → smaller array  
brr → original array

The task is to find the numbers that are **missing from arr when compared with brr**.

Important observation:

This does not necessarily mean the number is completely absent from arr.  
It means the **frequency of that number in brr is greater than its frequency in arr**.

Example:

arr = [7,2,5,3,5,3]  
brr = [7,2,5,4,6,3,5,3]

Numbers missing from arr:

4 6

So the core idea of this problem is:

Compare **frequency differences** between the two arrays.

---

## Approach 1 — HashMap Frequency

### Idea

Store the frequency of numbers from brr.

Then subtract the frequencies using arr.

Any number whose frequency remains greater than 0 means that number appears more times in brr than in arr.

---

### Pseudocode

map = empty hashmap

for num in brr:
    
    map[num]++

for num in arr:
    
    map[num]--

result = empty list

for key in map:
    
    if map[key] > 0:
        
        add key to result

return sorted result

---

### Complexity

Time: O(n) — We traverse both arrays once.

Space: O(n) — HashMap stores frequencies of numbers.

---

## Approach 2 — Frequency Array

### Idea

Instead of using a HashMap, we can store frequencies in an array.

The index represents the number and the value represents its frequency.

We store frequencies of arr and brr separately and compare them.

---

### Pseudocode

freqA = array
freqB = array

for num in arr:
    
    freqA[num]++

for num in brr:
    
    freqB[num]++

result = empty list

for i from 0 to maxValue:
    
    if freqB[i] > freqA[i]:
        
        add i to result

return result

---

### Complexity

Time: O(n) — We count frequencies once.

Space: O(maxValue) — Frequency array size depends on value range.

---

## Approach 3 — Optimal (Range Compression)

### Key Observation

The problem guarantees:

max(brr) - min(brr) ≤ 100

This means all numbers lie within a range of **at most 101 values**.

So instead of a large frequency array, we can compress the range.

---

### Idea

1. Find the minimum value in brr.
2. Create a frequency array of size 101.
3. Update frequencies using offset indexing.

Index mapping:

index = value - min

---

### Pseudocode

min = minimum value in brr

freq = array of size 101

for num in brr:
    
    freq[num - min]++

for num in arr:
    
    freq[num - min]--

result = empty list

for i from 0 to 100:
    
    if freq[i] > 0:
        
        add (i + min) to result

return result

---

### Complexity

Time: O(n) — Each element is processed once.

Space: O(1) — Frequency array size is fixed (101).

---

## Pattern Recognition

Use **frequency difference techniques** when:

• Two arrays represent the same dataset but with missing or extra elements  
• We need to compare occurrences of numbers  
• The problem asks which numbers appear more times in one array than the other

---

## Interview Summary (Crisp Version)

The problem reduces to comparing frequencies of numbers in two arrays.

A HashMap can store frequencies of brr and subtract frequencies from arr.  
Any number with remaining positive frequency is missing.

Using the constraint that the value range is small, we can optimize further by using a compressed frequency array of size 101, achieving O(n) time and O(1) space.