def check_anagrams(string1, string2):
    if(len(string1) != len(string2)):
        return False

    for i in string1:
        count = string1.count(i)
        if i in string2 and string2.count(i)==count:
            pass
        else:
            return False
        
    return True



string1 = input("Enter string 1:")
string2 = input("Enter string 2:")

check = check_anagrams(string1, string2)
if(check):
    print("String 1 and String 2 are indeed anagrams")
else:
    print("String 1 and String 2 are not anagrams")