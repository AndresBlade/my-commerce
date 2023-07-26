import { ProductList } from '../../products/components/ProductList';
import { ShopList } from '../../shops/components/ShopList';
import { ExplorarParams } from '../interfaces/ExplorarParams';
import { useNavigate, useParams } from 'react-router-dom';

export const ExplorePage = () => {
	// const [productPageCount, setProductPageCount] = useState(0);
	// const [shopPageCount, setShopPageCount] = useState(0);
	const { productPage: productPageParam, shopPage: shopPageParam } =
		useParams() as ExplorarParams;

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
	return (
		<main>
			<section className="section_products">
				<div className="tiendas-destacadas">
					<h1 className="heading mover">Productos Destacados</h1>
				</div>
				<div className="flex-buttons">
					<button
						className="btnChange"
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
									productPage === 0 ? 0 : --productPage
								}/${shopPage}`
							);
						}}
					>
						Anterior
					</button>
					<button
						className="btnChange"
						id="btn-pagina-productos-siguiente"
						onClick={() => {
							navigate(`/explorar/${++productPage}/${shopPage}`);
						}}
					>
						Siguiente
					</button>
				</div>
				{/* <div className="grid" id="gridPorducts"></div> */}
				<ProductList />
			</section>

			<section>
				<div className="tiendas-destacadas">
					<h1 className="heading mover">Tiendas Destacadas</h1>
				</div>
				<div className="flex-buttons">
					<button
						className="btnChange"
						id="btn-pagina-tiendas-anterior"
						onClick={() => {
							navigate(
								`/explorar/${productPage}/${
									shopPage === 0 ? 0 : --shopPage
								}`
							);
						}}
					>
						Anterior
					</button>
					<button
						className="btnChange"
						id="btn-pagina-tiendas-siguiente"
						onClick={() => {
							navigate(`/explorar/${productPage}/${++shopPage}`);
						}}
					>
						Siguiente
					</button>
				</div>
				<ShopList />
			</section>
		</main>
	);
};
