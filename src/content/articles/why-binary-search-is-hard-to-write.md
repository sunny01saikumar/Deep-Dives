---
title: "Why binary search is harder to write than it looks"
description: "The idea fits in one sentence. Getting the code right has tripped up textbooks, professionals and the standard libraries of major languages."
pubDate: 2026-10-15
tags: ["Algorithms", "Programming"]
---

Binary search is the first clever algorithm most programmers learn, and the explanation takes one sentence: to find a value in a sorted list, look at the middle, then discard the half that cannot contain it, and repeat. A list of a million items needs about twenty looks.

And yet this is a famously easy algorithm to get wrong. The gap between "I understand it" and "my code is correct" is wide enough to teach a lot about careful programming.

## The idea, in code

Here is a version in JavaScript. It looks for `target` in the sorted array `items` and returns its position, or `-1` if it is not there.

```js
function binarySearch(items, target) {
  let low = 0;
  let high = items.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (items[mid] === target) return mid;
    if (items[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
```

Every line carries a decision that could have gone the other way. Why `<=` and not `<`? Why `mid + 1` and not `mid`? Why compute the middle in that odd way? Each answer is a small trap.

## Trap one: the boundary

The loop condition and the way the bounds move have to agree about what `low` and `high` mean. In the version above, both are **inclusive**: the target, if present, lies somewhere from `low` to `high`, counting both ends. That is why the loop runs while `low <= high`, and why after checking `mid` we can safely move past it with `mid + 1` or `mid - 1`.

Mix conventions, for example by using an exclusive `high` but still writing `high = mid - 1`, and the search can skip the one position that held the answer, or loop forever. Both bugs only show up for particular inputs, which is what makes them survive testing.

## Trap two: the overflow

The most famous bug is in the line that finds the middle. The obvious way to write it is `(low + high) / 2`. It is correct in mathematics, and wrong in languages where integers have a fixed size. If `low` and `high` are both large, their sum can exceed the largest number the type can hold and wrap around to a negative value.

This bug was found in widely used library code long after the code had been trusted, which is part of why it is so often retold. Writing `low + (high - low) / 2` gives the same result and cannot overflow, because `high - low` is never larger than `high`.

In JavaScript, numbers are not fixed-size integers in the same way, so the problem does not appear for ordinary arrays. The habit is still worth keeping, because the same code often gets translated into languages where it matters.

## Trap three: the tests you did not write

Bugs in binary search tend to hide at the edges. A good set of tests for the function above includes:

- an empty list
- a list with one item, where the target is that item
- a list with one item, where it is not
- the target at the very first position and the very last position
- a target smaller than everything, and one larger than everything
- a list with an even number of items, and one with an odd number

None of these is exotic, but a test suite that only checks "find 7 in a list of ten numbers" passes with many wrong implementations.

## Making the idea work for you

The most useful way to hold binary search in your head is not as "find a number in a list" but as **finding the boundary where a yes-or-no question flips**. If you can ask a question about position `i` whose answer is "no, no, no, yes, yes, yes", binary search finds where it flips.

That is far more general. It can find the first version of a program that introduced a bug, the smallest size that makes a function fast enough, or the point where a sorted list would insert a new item. Writing the loop once, carefully, in terms of a boundary rather than a value, lets you reuse it for all of these.

## What to take from it

A short algorithm is not a simple algorithm. When code is this compact, every character matters, and the way to get it right is to state what each variable means, check the edges, and test the cases that feel too small to bother with.
