import { ProductList } from '../../products/components/ProductList';
import { Category } from '../../categories/components/CategoriesCard';
import { ShopList } from '../../shops/components/ShopList';
import { ExplorarParams } from '../interfaces/ExplorarParams';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryFilter } from '../../categories/components/CategoriesFilter';
import { PriceFilter } from '../../categories/components/PriceFilter';
import { SaldoButton } from '../components/createSaldoButton';
import { MdLaptop } from 'react-icons/md';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import img from '../../../../banner.jpg';
import { useForm } from '../../hooks/useForm';
import { useEffect, useState } from 'react';
import { getCategories } from '../../products/helpers/getCategories';
import { Region } from '../../shops/interfaces/ShopRegion';
import { logUserAction } from '../../user/helpers/logUserAction';

export const ExplorePage = () => {
	// const [productPageCount, setProductPageCount] = useState(0);
	// const [shopPageCount, setShopPageCount] = useState(0);
	const { productPage: productPageParam, shopPage: shopPageParam } =
		useParams() as ExplorarParams;

	const [categories, setCategories] = useState<null | Region[]>(null);

	const [categoryFilter, setCategoryFilter] = useState<string>('-1');

	useEffect(() => {
		getCategories()
			.then(response => setCategories(response.categories))
			.catch(err => console.log(err));
	}, []);

	console.log(productPageParam, shopPageParam);
	let productPage: number;
	let shopPage: number;
	const navigate = useNavigate();

	productPage =
		typeof productPageParam === 'undefined'
			? 0
			: parseInt(productPageParam);
	shopPage =
		typeof shopPageParam === 'undefined' ? 0 : parseInt(shopPageParam);

	
	const saldoString = localStorage.getItem('saldo');
	const saldo = saldoString !== null ? parseFloat(saldoString) : 0;

	


	return (
		<main>
			<SaldoButton 
				saldoValue={'Saldo disponible:  ' + saldo.toString() + '$'}
			/>

			<section className="w-[90%] mx-auto relative group cursor-pointer">
				<div>
					<img
						src={img}
						alt="Publicidad"
						className="h-auto object-cover"
					/>
				</div>
				<div className="absolute top-1/2 left-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
					<div className="bg-gris flex items-center justify-center h-12 w-9 rounded-r-full">
						<AiOutlineLeft size={20} />
					</div>
				</div>
				<div className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
					<div className="bg-gris flex items-center justify-center h-12 w-9 rounded-l-full">
						<AiOutlineRight size={20} />
					</div>
				</div>
			</section>

			{/*<CategoriesList /> */}
			<div className="w-[90%] mx-auto my-10">
				<h2 className="text-[1.3rem] font-normal md:text-3xl">
					Te podría interesar
				</h2>
				<div className="h-[5px] bg-azul w-[28%] mt-3"></div>
			</div>

			<section className="w-[90%] mx-auto">
				<div className="flex justify-center gap-8 flex-wrap md:flex-nowrap">
					{categories?.slice(0, 7)?.map(category => (
						<Category
							key={category.id}
							categoryName={category.descripcion}
							iconCategory={<MdLaptop size={50} />}
						/>
					))}
					{/* <Category
						categoryName="Electronica"
						iconCategory={<MdLaptop size={50} />}
					/>
					<Category
						categoryName="Electronica"
						iconCategory={<MdLaptop size={50} />}
					/>
					<Category
						categoryName="Electronica"
						iconCategory={<MdLaptop size={50} />}
					/>
					<Category
						categoryName="Electronica"
						iconCategory={<MdLaptop size={50} />}
					/>
					<Category
						categoryName="Electronica"
						iconCategory={<MdLaptop size={50} />}
					/>
					<Category
						categoryName="Electronica"
						iconCategory={<MdLaptop size={50} />}
					/>
					<Category
						categoryName="Electronica"
						iconCategory={<MdLaptop size={50} />}
					/> */}
				</div>
			</section>

			<div className="w-[95%] mx-auto grid-cols-3 gap-6 sm:grid">
				<aside className="col-span-1">
					<div className="w-[90%] mx-auto my-10">
						<h2 className="text-[1.3rem] font-normal md:text-3xl">
							Filtrar
						</h2>
						<div className="h-[5px] bg-azul w-[25%] mt-3"></div>
					</div>

					<p className="text-[.8rem] mb-4 font-semibold sm:text-[1rem]">
						Categorías
					</p>

					{categories?.map(category => (
						<CategoryFilter
							key={category.id}
							categoryName={category.descripcion}
							value={category.id}
							onChange={setCategoryFilter}
						/>
					))}

					<PriceFilter />
				</aside>

				<section className="col-span-2">
					<div className="w-[90%] mx-auto my-10">
						<h2 className="text-[1.3rem] font-normal md:text-3xl">
							Productos Destacados
						</h2>
						<div className="h-[5px] bg-azul w-[28%] mt-3"></div>
					</div>

					<article>
						<div className="flex">
							<button
								className="bg-dark-blue rounded-[16px] w-28 h-12 justify-center text-blanco cursor-pointer flex items-center font-semibold my-2.5 mx-auto outline-none transition-all duration-300 ease-in-out will-change-transform hover:opacity-70 hover:shadow-md hover:-translate-y-0.5 active:shadow-none active:translate-y-0"
								id="btn-pagina-productos-anterior"
								onClick={() => {
									// console.log(searchParams.get('productPage'));
									// console.log(searchParams.get('shopPage'));
									// searchParams.set(
									// 	'productPage',
									// 	(
									// 		parseInt(
									// 			searchParams.get('productPage') || '0'
									// 		) - 1
									// 	).toString()
									// );
									// searchParams.set(
									// 	'shopPage',
									// 	parseInt(
									// 		searchParams.get('shopPage') || '0'
									// 	).toString()
									// );
									// setSearchParams(searchParams);
									navigate(
										`/explorar/${
											productPage === 0
												? 0
												: --productPage
										}/${shopPage}/${categoryFilter}`
									);
								}}
							>
								Anterior
							</button>
							<button
								className="bg-dark-blue rounded-[16px] w-28 h-12 justify-center text-blanco cursor-pointer flex items-center font-semibold my-2.5 mx-auto outline-none transition-all duration-300 ease-in-out will-change-transform hover:opacity-70 hover:shadow-md hover:-translate-y-0.5 active:shadow-none active:translate-y-0"
								id="btn-pagina-productos-siguiente"
								onClick={() => {
									navigate(
										`/explorar/${++productPage}/${shopPage}/${categoryFilter}`
									);
								}}
							>
								Siguiente
							</button>
						</div>
						<ProductList />
					</article>

					<section>
						<div className="w-[90%] mx-auto my-10">
							<h2 className="text-[1.3rem] font-normal md:text-3xl">
								Tiendas Destacadas
							</h2>
							<div className="h-[5px] bg-azul w-[28%] mt-3"></div>
						</div>
						<div className="flex">
							<button
								className="bg-dark-blue rounded-[16px] w-28 h-12 justify-center text-blanco cursor-pointer flex items-center font-semibold my-2.5 mx-auto outline-none transition-all duration-300 ease-in-out will-change-transform hover:opacity-70 hover:shadow-md hover:-translate-y-0.5 active:shadow-none active:translate-y-0"
								id="btn-pagina-tiendas-anterior"
								onClick={() => {
									navigate(
										`/explorar/${productPage}/${
											shopPage === 0 ? 0 : --shopPage
										}/${categoryFilter}`
									);
								}}
							>
								Anterior
							</button>
							<button
								className="bg-dark-blue rounded-[16px] w-28 h-12 justify-center text-blanco cursor-pointer flex items-center font-semibold my-2.5 mx-auto outline-none transition-all duration-300 ease-in-out will-change-transform hover:opacity-70 hover:shadow-md hover:-translate-y-0.5 active:shadow-none active:translate-y-0"
								id="btn-pagina-tiendas-siguiente"
								onClick={() => {
									navigate(
										`/explorar/${productPage}/${++shopPage}/${categoryFilter}`
									);
								}}
							>
								Siguiente
							</button>
						</div>
						<ShopList />
					</section>
					{/* <div className="grid" id="gridPorducts"></div> */}
				</section>
			</div>
		</main>
	);
};
