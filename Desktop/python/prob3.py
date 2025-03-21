name = input("enter your name: ")
print("good morning ", name)

#f string

print(f"good morning {name}")
#"f" specifies that it is a f string and f string ke andr hum variable use kr skte h 

letter = letter = '''Dear <|Name|>, 
You are selected! 
<|Date|> '''

print(letter.replace("<|Name|>", "krishna").replace("<|Date|>", "5 july 2024"))

#"letter.replace("<|Name|>", "krishna")" ye puri ek string dega and usme date replace hogi