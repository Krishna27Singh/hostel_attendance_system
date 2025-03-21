# In Python, a tuple is an ordered, immutable collection of elements. Tuples are similar to lists but have a key 
# difference: once a tuple is created, its elements cannot be changed. This immutability makes tuples useful for data 
# that should remain constant throughout a program.

a = ()        #emtpy tuple
a = (1,)      #tuple with only one element (comma is needed)
a = (1,2,4)   #tuple with multiple elements

#functions in tuple are same as that of list

#some additional functions

#Concatenation
# Tuples can be combined to create a new tuple.

tuple1 = (1, 2)
tuple2 = (3, 4)
combined = tuple1 + tuple2

print(combined)

#repetition
# Tuples can be repeated using the * operator.

my_tuple = (1, 2)
repeated = my_tuple * 3 

print(repeated)

#unpacking
# You can unpack elements of a tuple directly into variables.

my_tuple = (1, 2, 3)
a, b, c = my_tuple

print(a,b,c)
