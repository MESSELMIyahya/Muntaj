
type CountriesType = "DZ" |"MA" |"TN" |"EG" |"SA" |"JO" |"SY" |"IQ" |"QA" |"PS" ;

export const ArabCountries = ["DZ","MA","TN","EG","SA","JO","SY","IQ","QA","PS"]

const countries = {
    "DZ":"الجزائر",
    "MA":"المغرب",
    "TN":"تونس",
    "EG":'مصر',
    "SA":"السعودية",
    "JO":"الاردن",
    "SY":"سوريا",
    "IQ":"العراق",
    "QA":"قطر",
    "PS":"فلسطين",

}

export default function GetCountryName(name:string){
    return countries[name.toLocaleUpperCase() as CountriesType] ? countries[name.toLocaleUpperCase() as CountriesType] : 'فلسطين' 
}