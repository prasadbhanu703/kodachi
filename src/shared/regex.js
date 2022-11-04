
export const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,}$/
export const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/
export const zipCodeRegexMessage = 'Enter the valid zip code'
export const positiveNumRegex = /^([0-9]\d*)$/
export const floatNumRegex = /^(\d+(\.\d{0,18})?|\.?\d{1,18})$/

/*============================ Messages ================== */
export const passRegexMessage = 'Password must include at least one upper case letter, one lower case letter, and one numeric digit'

/* 
for no limit in floating point number regex --> /^\d*\.?\d*$/ or /^\d*\.?\d{0,2}$/
other /[+-]?([0-9]*[.])?[0-9]+/ or /^\d+(\.\d{1,2})?$/ or ^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$
*/
