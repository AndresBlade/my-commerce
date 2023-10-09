import React from 'react';
import { CategoriesProps } from '../interfaces/CategoriesProps';


export const Category = ({categoryName, iconCategory} :CategoriesProps) =>
{
    return( 
        <div className='flex flex-col items-center'>
            <div className="w-[5rem] h-[5rem] lg:w-32 lg:h-32 mb-2 flex flex-col rounded-full items-center justify-center cursor-pointer bg-gris ring-azul hover:ring-2">
                {iconCategory}
            </div>
            <span className='font-normal text-[1rem] mb-4'>{categoryName}</span>
        </div>
   )
}
