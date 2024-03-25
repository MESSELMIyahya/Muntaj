import { IconType } from 'react-icons/lib';
import { LuMonitor, LuShirt, LuApple, LuCpu, LuBaby, LuRefrigerator, LuHome, LuDumbbell, LuStethoscope, LuToyBrick } from 'react-icons/lu';


export const categoriesIds = ['ct1','ct2','ct3','ct4','ct5','ct6','ct7','ct8','ct9','ct10']

const categories = {
    'ct1': 'الكمبيوتر',
    'ct2': 'موضة',
    'ct3': 'طعام',
    'ct4': 'الالكترونيات',
    'ct5': 'رعاية الطفل',
    'ct6': 'الأجهزة المنزلية',
    'ct7': 'المنزل والمطبخ',
    'ct8': 'اشياء رياضية',
    'ct9': 'طبي',
    'ct10': 'ألعاب الأطفال',
}


export function getCategoryNameById(id: string) {

    return categories[id as never] ? categories[id as never] : 'الكمبيوتر'
} 

const categoriesIcons  = {
    'ct1':LuMonitor,
    'ct2':LuShirt,
    'ct3':LuApple,
    'ct4':LuCpu,
    'ct5':LuBaby,
    'ct6':LuRefrigerator,
    'ct7':LuHome,
    'ct8':LuDumbbell,
    'ct9':LuStethoscope,
    'ct10':LuToyBrick
}

export function getCategoryIcon (categoryId:string):IconType{
    const Icon = categoriesIcons[categoryId as never] ? categoriesIcons[categoryId as never] : LuMonitor
    return Icon
}


export function doesCategoryExists(id:string):boolean{
    return categoriesIds.includes(id);
}