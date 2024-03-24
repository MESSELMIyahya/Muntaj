import { Props as PType} from 'country-flag-icons/react/3x2'
import * as Icons from 'country-flag-icons/react/3x2'

interface Props extends PType {
    country:string
}

export default function CountryFlag ({country,...props}:Props){
    const Flg = Icons[country?.toLocaleUpperCase() as never] ? Icons[country?.toLocaleUpperCase() as never] : Icons['PS'];
    return <Flg {...props}/>
}   