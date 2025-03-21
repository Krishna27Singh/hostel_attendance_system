# a = int(input("enter your first number: "))
# b = int(input("enter your second number: "))
# c = int(input("enter your third number: "))
# d = int(input("enter your fourth number: "))

# if ((a>b) and (a>c) and (a>d)):
#     print("the greatest number is: ", a)

# elif((b>a) and (b>c) and (b>d)):
#     print("the greatest number is: ", b)

# elif((c>a) and (c>b) and (c>d)):
#     print("the greatest number is: ", c)

# elif((d>a) and (d>c) and (d>b)):
#     print("the greatest number is: ", d)

# USE OF "in" STATEMENT 

# p1 = "Make a lot of money"
# p2 = "buy now"  
# p3 = "subscribe this"  
# p4 = "click this"

# message = input("Enter your comment: ")

# if((p1 in message) or (p2 in message )or (p3 in message) or (p4 in message)):
#     print("This comment is a spam")

# else:
#     print("This comment is not a spam")

#write a program to check whether a given username contains less than 10 characters or not

a = input("enter your name: ")

if(len(a)>10):
    print("you are entering an invalid username")

else: 
    print("the username is correct")

#write a program which finds out whether a name is contained in list or not

l = ["krishna", "shalini", "krisha", "krini"]

inputt = input("enter the name which you want to check is in list or not:")

if(inputt in l):
    print("the given name is present in the list")

else:
    print("the given name is not present in the list")
