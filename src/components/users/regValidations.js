export function validationOfEmail(input){
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(input)
}

export function validationOfNameSurname(input){
    const regex = /^[a-zA-Z]+$/; 
    return regex.test(input);
}

export function validationOfPassword(input){
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(input);
}