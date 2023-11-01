import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { getCategories } from "../../products/helpers/getCategories";
import { createCategory } from "../../categories/helpers/createCategories";
import { updateCategory } from "../../categories/helpers/updateCategories";
import { Region } from '../../shops/interfaces/ShopRegion';
import { Category } from '../../categories/components/CategoriesCard';
import { AiFillFilter } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/Bs';


export const CrearCategoriasPage = () => {
	const {
		user: { token },
	} = useContext(AuthContext);
	
	const [categories, setCategories] = useState<null | Region[]>(null);
	const [showModal, setShowModal] = useState(false);
	const [categoryName, setCategoryName] = useState('');

	const modalClick = () => {
		setShowModal(!showModal);
	};
	
	const bg_dark = showModal ? 'bg-modal' : 'bg-modal hidden';
	const modal = showModal ? 'fixed left-0 right-0 top-0 bottom-0 m-auto bg-white w-[40%] h-[35%] rounded-lg' : 'hidden';
	
	useEffect(() => {
		getCategories()
			.then(response => setCategories(response.categories))
			.catch(err => console.log(err));
	}, []);
	
	const handleCreateCategory = () => {
		createCategory(categoryName, token)
			.then(data => {
				console.log('Categoría creada con éxito:', data);
				setCategoryName(''); 
				modalClick(); 
				/*Añadir refresco de pagina*/
			})
			.catch(error => {
				console.error('Hubo un error al crear la categoría:', error);
			});
	};
	
	return (
		<div>
			<section className="w-full p-6 mx-auto ">
				<div className="grid  grid-cols-1 smm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-center items-center gap-8">
					{categories?.map(category => (
						<Category
							key={category.id}
							categoryName={category.descripcion}
							iconCategory={<AiFillFilter size={50} />}
						/>
					))}
					<div className='block mx-auto mb-auto' onClick={modalClick}>
						<div className="w-[5rem] h-[5rem] lg:w-32 lg:h-32 mb-2 flex flex-col rounded-full items-center justify-center cursor-pointer bg-gris ring-azul hover:ring-2">
							<BsFillPlusCircleFill size={50} />
						</div>
					</div>
				</div>
			</section>

		<div className={bg_dark} onClick={modalClick}></div>			
			<div className={modal}>
				<div className='relative m-6'>
					<h1 className='text-xl font-normal mt-5'>Agregar Categoría</h1>
					<div className='h-[.2rem] bg-azul mr-auto mt-2 w-[20%] mb-3'></div>
					
					<div className='flex flex-col w-[90%] mx-auto'>
						<input
							type="text"
							value={categoryName}
							onChange={e => setCategoryName(e.target.value)}
							placeholder="Nombre de la nueva categoría"
							className='bg-gris p-4 rounded-full'
						/>
						<button  
						className='w-[70%] mx-auto mt-5 rounded-lg text-lg text-white p-4 bg-azul hover:opacity-90'
						onClick={handleCreateCategory}>Crear categoría</button>
					</div>
				</div>
			</div>
		</div>
	);
};
