fruits = []

f1 = input("enter first fruit")
fruits.append(f1)
f2 = input("enter second fruit")
fruits.append(f2)
f3 = input("enter third fruit")
fruits.append(f3)
f4 = input("enter fourth fruit")
fruits.append(f4)
f5 = input("enter fifth fruit")
fruits.append(f5)
f6 = input("enter sixth fruit")
fruits.append(f6)
f7 = input("enter seventh fruit")
fruits.append(f7)

print(fruits)

marks = []

m1 = int(input("enter marks of first student: "))
marks.append(m1)
m2 = int(input("enter marks of second student: "))
marks.append(m2)
m3 = int(input("enter marks of third student: "))
marks.append(m3)
m4 = int(input("enter marks of fourth student: "))
marks.append(m4)
m6 = int(input("enter marks of fifth student: "))
marks.append(m6)
m6 = int(input("enter marks of sixth student: "))
marks.append(m6)

marks.sort()
print(marks)
print(sum(marks))