s = set() #this is an emtpy set
print(type(s))
s = {1,2,3}
#set is a collection of well defines and non repetative objects
s = {1,2,2,3,3,3}
print(s)
#we can use any tupe of data type in sets
#A set is unordered
#A set is unindexed
#there is no way to change items in set (we can remove that item and add another item)
#sets cannot contain duplicate values

# METHODS IN SETS

s.add("krishna")
s.add(57)
print(s)

print(len(s))

s.remove(1)
print(s)

print(s.pop())
#removes a random element in the set and returns it

s1 = {1,2,3,4}
s2 = {3,4,5,6}

print(s1.union(s2))
print(s1.intersection(s2))
print(s1.union({7,8}))
print(s1.intersection({7,8}))
print(s1-s2)

my_set = {1, 2, 3}
my_set.update([4, 5, 6])
print(my_set)  # Output: {1, 2, 3, 4, 5, 6}

#Removes a specified element from the set if it is present. If the element is not found,
#  it does nothing (no error raised).
my_set = {1, 2, 3}
my_set.discard(2)
my_set.discard(4)  # No error, does nothing
print(my_set)  # Output: {1, 3}

set1 = {1, 2, 3}
set2 = {2, 3, 4}
sym_diff_set = set1.symmetric_difference(set2)
# Or using the `^` operator: sym_diff_set = set1 ^ set2
print(sym_diff_set)  # Output: {1, 4}
print(set1^set2)

set1 = {1, 2,3,4}
set2 = {1, 2, 3}
print(set1.issubset(set2))  # Output: false

set1 = {1, 2,3,4}
set2 = {1, 2, 3}
print(set1.issuperset(set2))  # Output: true

set1 = {1, 2}
set2 = {3, 4}
print(set1.isdisjoint(set2))  # Output: True
