d = {}         #this is an empty dictionary
print(type(d))

#In Python, dictionaries are data structures that store data as key-value pairs, similar to a real-life dictionary where 
# each word (key) is associated with a definition (value). They are defined by curly braces {} and allow for fast data 
# retrieval based on keys. Here’s an overview:

dicti = {
    "key": "value",
    "krishna": 100,
    "krisha": 57,
    "list": [1,2,3],
    5:"krini",
}

#we can do this using list also but..

l = [["key", "value"], ["krishna", 100], ["list", [1,2,3]]]
#but here hum directly "krishna" bolkr 100 nahi le skte and agr koi complex logic likhenge to vo computationally 
#expensive hoga.

print(dicti)
print(dicti["krishna"], dicti["list"])
#krishna ki value bht fast retrive hogi dict m bcoz it doesn't search every key for krishna, it already knows krishna names key
#exists and prodcues the output

#A ditionary is unordered
#A dictionary is mutable
#A dictionary is indexed
#A dictionary cannot contain duplicate key

dicti["krishna"] = 99
dicti["shalini"]=98    #we can add a new key value pair too
print(dicti)

# METHODS IN DICTIONARY

#1) dicti.items(): returns a list of tuples
print(dicti.items())

#2) dicti.keys(): return keys of dictionary
print(dicti.keys())

#3) dicti.values(): return values of dictionary
print(dicti.values())

#4) dicti.update()
dicti.update({"krishna": 97, "shakri":101})
print(dicti)

#5) dicti.get()
print(dicti.get("krishna"))

#difference between dicti.get("krishna") and dicti["krishna"]
#if we change krishna by krishna2 they first one will give "none" as output but the 2nd one will produce an error

#6) dicti.pop()
#Removes a specified key and returns the associated value. If the key doesn’t exist, it can return a default value.
print(dicti.pop("shakri"))
print(dicti)

#7) dicti.popitem()
#Removes and returns the last key-value pair added to the dictionary. In Python 3.7+, dictionaries maintain insertion order, 
# so popitem() removes the most recently added item.
my_dict = {"name": "Alice", "age": 25}
item = my_dict.popitem()  # Output: ('age', 25) 
print(my_dict)  # Output: {'name': 'Alice'}

#8) dicti.clear()

my_dict.clear()
print(my_dict)

#9) dicti.setdefault()

#If the key exists in the dictionary: It returns the current value associated with the key.
#If the key doesn’t exist: It inserts the key with a specified default value and then returns that default value.

#This method is especially helpful when you want to avoid checking if a key exists before assigning a value to it.

# Original dictionary
my_dict = {"name": "Alice", "age": 25}

# Using setdefault() on an existing key
result = my_dict.setdefault("age", 30)

# Outputs
print(result)       # Output: 25 (existing value)
print(my_dict)      # Output: {'name': 'Alice', 'age': 25} (no change made)

# Original dictionary
my_dict = {"name": "Alice"}

# Using setdefault() on a non-existing key
result = my_dict.setdefault("age", 30)

# Outputs
print(result)       # Output: 30 (newly added default value)
print(my_dict)      # Output: {'name': 'Alice', 'age': 30} (key added)

# Original dictionary
my_dict = {"name": "Alice"}

# Using setdefault() without a specified default value
result = my_dict.setdefault("age")

# Outputs
print(result)       # Output: None (default if not provided)
print(my_dict)      # Output: {'name': 'Alice', 'age': None} (key added with None as value)

#The setdefault() method is handy in cases where you need to:
#Ensure a key exists in a dictionary.
#Set a default value if the key is missing, especially in cases like counting or grouping items.

print(len(dicti))