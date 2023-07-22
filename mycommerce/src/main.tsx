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
			{ path: 'producto/:RIF', element: <div>Estas en un elemento</div> },
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
