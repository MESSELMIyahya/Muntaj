import { getCategoryIcon } from '@/lib/category';
import { IconBaseProps } from 'react-icons/lib';

interface Props extends IconBaseProps {
    categoryId:string
}

export default function CategoryIcon ({categoryId,...props}:Props){
    const Icon = getCategoryIcon(categoryId);
    return <Icon {...props}/>
}   