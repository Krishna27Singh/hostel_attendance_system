# words = {
#     "madad": "Help",
#     "kursi": "Chair",
#     "billi": "Cat"
# }

# word = input("Enter the word you want meaning of: ")

# print(words[word])

s = set()

s1 = int(input("enter first number: "))
s.add(s1)
s2 = int(input("enter second number: "))
s.add(s2)
s3 = int(input("enter third number: "))
s.add(s3)
s4 = int(input("enter fourth number: "))
s.add(s4)
s5 = int(input("enter fift number: "))
s.add(s5)
s6 = int(input("enter sixth number: "))
s.add(s6)
s7 = int(input("enter seventh number: "))
s.add(s7)
s8 = int(input("enter 8th number: "))
s.add(s8)

print(s)

# importantttt

print(1==1.0)

#When using ==, Python will automatically convert the integer to a float and 
# then compare the values.
#Since 1 and 1.0 represent the same value, the comparison evaluates to True.

d = {}

name = input("Enter friends name: ")
lang = input("Enter Language name: ")
d.update({name: lang})

name = input("Enter friends name: ")
lang = input("Enter Language name: ")
d.update({name: lang})

name = input("Enter friends name: ")
lang = input("Enter Language name: ")
d.update({name: lang})

name = input("Enter friends name: ")
lang = input("Enter Language name: ")
d.update({name: lang})


print(d)

#can you change the values inside a list which is containes in a set s? s={8, 7, 12, "harry", [1,2]}


#No, you cannot include a list within a set in Python. This is because sets can only contain 
# immutable (hashable) elements, and lists are mutable (they can be modified after creation).
#  If you try to add a list to a set, Python will raise a TypeError.

#If you need to store a collection of values within a set, consider using a tuple instead of a list, 
#as tuples are immutable and can be added to a set:

s = {8, 7, 12, "harry", (1, 2)}

#With this, the set s will contain a tuple (1, 2), and you can access or replace the tuple as 
# a whole, but you still won’t be able to modify it directly within the set because sets are
# meant to hold immutable objects.