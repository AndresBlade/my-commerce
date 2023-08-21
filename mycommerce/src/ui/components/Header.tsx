import { MenuProvider } from '../context/MenuProvider';
import { Link } from 'react-router-dom';
import { Nav } from './Nav';

interface Props {
	authPage: boolean;
}

export const Header = ({ authPage }: Props) => {
	return (
		<MenuProvider>
			<header
				className={authPage ? 'bg-bg-degradado top-0 sticky' : 'bg-bg-degradado top-0 sticky'}
				style={
					authPage ? undefined : { paddingLeft: `${3}rem`, marginLeft: 0 }
				}
				>
				<div className='w-[95%] mx-auto'>
					<nav className='flex justify-between items-center'>
						<Link to="/" className='flex text-[2rem] ml-4 my-8 md:text-[1.5rem] md:mr-8 lg:text-[2.1rem]'>
							<span className='hidden text-white tracking-[0.2rem] font-medium md:block'>MY</span> <span className='hidden text-amarillo font-semibold md:block'>COMMERCE</span> <span className='text-blanco font-bold md:hidden'>M</span> <span className='text-amarillo font-bold md:hidden'>C</span>
						</Link>

						{authPage && <Nav />}
					</nav>
				</div>
				{/* >>>>>>> main */}
			</header>
		</MenuProvider>
	);
};
