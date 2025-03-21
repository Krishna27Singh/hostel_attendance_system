name = "krishna"
name1 = 'krishna'
# name2 = "krishna #this is wrong
# shalini"
name3 = '''krishna
shalini'''      # this is a multiline string

#a string is immutable means we cannot change a characted of a string we need to make a new string if want to do so

#slicing of string

stringg = "krisha"
#          012345    this is called indexing
#    or   -6-5-4-3-2-1

#in order to slice a string we use the following sytax

# sl=name[ind_start:ind_end]
# here the first index is included and the last index is not included 

nameshort = stringg[0:3]
print(nameshort)
namenameshort = stringg[1]   #for only one characted of a string
print(namenameshort)

nameshort = stringg[:3]
print(nameshort)

nameshort = stringg[0:]
print(nameshort)

#first index m kuch nahi likha to 0 assume kiya jata hai 
#agr last index m kuch nhi likha to vaha max index assume kiya jata hai

######## NEGATIVE SLICING ##########

nameshort = stringg[-4:-1]
#                    2  5
print(nameshort)

#negative slicing m pehle negative index ko postive iindex m convert krlena

######### SLICING WITH SKIP VALUE ###########
#we can provide skip value as a part of our slicing like this 

nameshort = stringg[0:4:2]
print(nameshort)

#here pehle ke 2 se slicing kro and last vali value skip value hoti hai 
# mtlb 0:4 se pehle slicing hogi to krish ayega ab pehle k ayega phir 2-2 skip honge to pehle k ayega then i then 2 skip nhi ho skte to iteration end hojaega
# and ki print hoga

######## STRING FUNCTIONS ##########

name = "krishna"

print(len(name))
print(name.endswith("hna"))
print(name.endswith("hnaa"))
print(name.startswith("kr"))
print(name.startswith("krr"))

name = "krishna is a good boy"

print(name.capitalize())

name = '''krishna is a
          good boy '''

print(name.capitalize())

#capitalize function sirf pehle word ke first letter ko capitalize krta hai

name = "Krishna"

print(name.lower())
print(name.upper())

name = " krishna krishna is a good boy"

print(name.strip())
#Removes whitespace from the beginning and end of a string.
print(name.replace("krishna", "shalini"))
#Replaces occurrences of a substring with another substring.
print(name.split())
#Splits a string into a list of substrings based on the separator.
print("-".join(["hello", "world"]))
print(name.find("i"))
print(name.find("z"))
#Returns the index of the first occurrence of the substring, or -1 if not found.
print(name.count("is"))
print(name.count("krishna"))
#Returns the number of occurrences of a substring.
print(name.title())

# STRINGS ARE IMMUTABLE MEANS YOU CANNOT CHANGE THE ORIGINAL STRING BY RUNNING FUNCTIONS ON THEM

name = "krishna"

print(name[0])
# name[0]='s'       #we cannot do this as string is immutable
# print(name[0])
