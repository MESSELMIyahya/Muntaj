
type CountriesType = 'DZ' | 'MA' | 'EG' | 'SA'

const countries = {
    "DZ":"الجزائر",
    "MA":"المغرب",
    "EG":'مصر',
    "SA":"السعودية"
}

export default function GetCountryName(name:string){
    return countries[name.toLocaleUpperCase() as CountriesType] ? countries[name.toLocaleUpperCase() as CountriesType] : 'فلسطين' 
}