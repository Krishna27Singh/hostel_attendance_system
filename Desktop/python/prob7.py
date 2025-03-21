#print table

# a = int(input("enter the number whose table you want to find"))

# for i in range(11):
#     if (i==0):
#         continue
#     print(a, " times ", i, " is equal to ", (a*i))

#greet people whose name starts with s 

# l = ["krishna", "shalini", "krisha", "soham"]

# for i in l:
#     if (i.startswith("s")):
#         print("hello", i)

# PRIME OR NOT PROBLEM

# a = int(input("enter the number which you want to find out is prime or not"))
# is_prime = True
# for i in range (2,a):
#     if (a%i == 0 ):
#         is_prime=False
#         break
    
# if (is_prime==0):
#     print("the given number is not prime")
# else:
#     print("the given number is prime")

#or

# n = int(input("Enter a number: "))

# for i in range(2, n):
#     if(n%i) == 0:
#         print("Number is not prime")
#         break
# else:
#     print("Number is prime")

# PROGRAM TO FIND SUM OF N NATURAL NUMBERS

# a = int(input("enter the number upto whose sum you want to find"))
# sum=0

# for i in range (1, a+1):
#     sum += i
# print(sum)

# PROGRAM TO FIND FACTORIAL

a = int(input("enter the number upto whose factorial you want to find"))

fact = 1
for i in range (1,a+1):
    fact = fact*i
print(fact)




    