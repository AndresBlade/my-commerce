import React from 'react';
import { CategoriesProps } from '../interfaces/CategoriesProps';


export const CategoryFilter = ({categoryName} :CategoriesProps) =>
{
    return( 
        <div className='flex mb-2 gap-5 items-center'>
        	<input type="checkbox"/><span className='text-[.7rem] sm:text-[1rem]'>{categoryName}</span>
        </div>
   )
}
