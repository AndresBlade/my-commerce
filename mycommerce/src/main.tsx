import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PaginaError } from './PaginaError';
import { ProtectedRoutes } from './router/ProtectedRoutes';
import { LoginPage } from './auth/pages/LoginPage';
import { AuthProvider } from './auth/context/AuthProvider';
import { Layout } from './ui/pages/Layout';
import LandingPage from './landing/pages/LandingPage';
import { getShops } from './shops/helpers/getShops';
import { getProducts } from './products/helpers/getProducts';
import { LandingLoader } from './landing/interfaces/LandingLoader';
import { getSingleShop } from './shops/helpers/getSingleShop';
import { getSingleShopProducts } from './products/helpers/getSingleShopProducts';
import { ShopLoader } from './shops/interfaces/ShopLoader';
import { ShopPage } from './shops/pages/ShopPage';
import { getSingleProduct } from './products/helpers/getSingleProduct';
import { ProductPage } from './products/pages/ProductPage';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/',
		element: <Layout />,

		children: [
			{
				element: <ProtectedRoutes />,

				children: [
					{ path: 'perfil', element: <div>Eres hombre muerto</div> },
					{ path: 'locas' },
				],
			},
			{
				index: true,
				element: <LandingPage />,
				loader: async () => {
					const data: LandingLoader = {
						ShopsData: await getShops(),
						ProductsData: await getProducts(),
					};

					return data;
				},
			},
			{
				path: 'tienda/:RIF',
				element: <ShopPage />,

				loader: async ({ params }) => {
					const RIF = params.RIF as string;

					const data: ShopLoader = {
						shopData: await getSingleShop(RIF),
						shopProducts: await getSingleShopProducts(RIF),
					};

					return data;
				},
			},
			{
				path: 'producto/:id',
				element: <ProductPage />,
				loader: async ({ params }) => {
					const id = params.id as string;

					return await getSingleProduct(id);
				},
			},
			{ path: 'explorar', element: <div>Estas en el explorar</div> },
			{ path: 'ayuda', element: <div>Estas en ayuda</div> },
			{ path: 'contactanos', element: <div>Estas en contactanos</div> },
			{ path: 'register', element: <div>Estas en el register</div> },
		],

		errorElement: <PaginaError />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
