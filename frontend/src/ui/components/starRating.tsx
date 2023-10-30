import { FaStar, FaStarHalfAlt} from 'react-icons/fa'
import { AiOutlineStar } from 'react-icons/ai'

interface starProps {
    stars: number;
    reviews: number;
  }

export const Star = ({ stars, reviews }:starProps) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;

        return(
            <span key={index}>
                {stars >= index + 1
                ? <FaStar className='color_icono' size={30}/>
                :stars >= number
                ? <FaStarHalfAlt className='color_icono' size={30} color={'blue'}/>
                : <AiOutlineStar className='color_icono' size={35}color={'blue'} />}
            </span>
        );
    });

    return (
        <div>
            <div className='flex items-center w-full justify-center'>
                {ratingStar}
            </div>
                <p className='mt-2 text-md'>({reviews} usuarios han calificado)</p>
        </div>
    )


}