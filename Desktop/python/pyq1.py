def password_input():
    password = input("Enter the password: ")
    check_password(password)

def check_password(password):

    if(len(password)!=8):
        password_input() 
    
    has_one_uppercase = False
    has_one_lowercase = False
    has_one_number = False
    has_one_special_character = False

    for place in password:
        if(place>'a' and place<'z'):
            has_one_lowercase = True
        elif(place>'A' and place<'Z'):
            has_one_uppercase = True
        elif(place>='0' and place<='9'):
            has_one_number = True
        else:
            has_one_special_character = True

    if(has_one_uppercase and has_one_lowercase and has_one_number and has_one_special_character):
        print("Login Successfull!")
    else:
        password_input()



password_input()