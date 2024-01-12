//checks if email is valid
export function validationOfEmail(input){
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(input)
}

//check if name and surname are valid
export function validationOfNameSurname(input){
    const regex = /^[a-zA-Z]+$/; 
    return regex.test(input);
}

//check if password is valid
export function validationOfPassword(input){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(input);
}