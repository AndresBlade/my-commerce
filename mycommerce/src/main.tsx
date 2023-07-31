import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PaginaError } from './PaginaError';
import { ProtectedRoutes } from './router/ProtectedRoutes';
import { AuthPage } from './auth/pages/AuthPage';
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
import { ExplorePage } from './explore/pages/ExplorePage';
import { ExplorarParams } from './explore/interfaces/ExplorarParams';
import { ProductWrapper } from './products/interfaces/ProductWrapper';
import { ShopWrapper } from './shops/interfaces/ShopWrapper';
import { HelpPage } from './help/pages/HelpPage';
import { helpLists } from './help/data/helpListsInfo';
import { SideContactInfoPage } from './ui/pages/SideContactInfoPage';
import { ContactUsPage } from './contactUs/pages/ContactUsPage';
import { AuthLayout } from './ui/pages/AuthLayout';
import { ProfilePage } from './user/pages/ProfilePage';
import { Dashboard } from './ui/components/Dashboard';
import { SesionModal } from './ui/components/SesionModal';
import { SesionModalProvider } from './ui/context/SesionModalProvider';
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			[elemName: string]: unknown;
		}
	}
}

const exploreContext: {
	products: ProductWrapper;
	shops: ShopWrapper;
	productPage: number;
	shopPage: number;
} = {
	productPage: 0,
	shopPage: 0,
	products: await getProducts(),
	shops: await getShops(),
};

const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{ path: 'login', element: <AuthPage /> },
			{ path: 'register', element: <AuthPage register /> },
		],
	},
	{
		element: <SesionModal />,
		children: [
			{
				path: '/',
				element: <Layout />,

				children: [
					{
						path: `:username`,
						element: <ProtectedRoutes />,

						children: [
							{
								element: <Dashboard />,
								children: [
									{ index: true, element: <ProfilePage /> },
									{ path: 'compras' },
									{ path: 'tiendas' },
									{ path: 'ventas' },
								],
							},
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
					{
						path: 'explorar/:productPage?/:shopPage?',
						element: <ExplorePage />,
						loader: async ({ params }) => {
							const explorarParams: ExplorarParams =
								params as ExplorarParams;

							let productPage = 0;
							let shopPage = 0;

							console.log({ productPage, shopPage, params });

							if (
								explorarParams.productPage !== undefined &&
								explorarParams.shopPage !== undefined
							) {
								productPage = parseInt(
									explorarParams.productPage
								);
								shopPage = parseInt(explorarParams.shopPage);
							}

							console.log({ productPage, shopPage });

							const data: LandingLoader = {
								ShopsData:
									exploreContext.shopPage !== shopPage
										? await getShops(shopPage)
										: exploreContext.shops,
								ProductsData:
									exploreContext.productPage !== productPage
										? await getProducts(productPage)
										: exploreContext.products,
							};

							exploreContext.productPage = productPage;
							exploreContext.products = data.ProductsData;
							exploreContext.shopPage = shopPage;
							exploreContext.shops = data.ShopsData;

							return data;
						},
					},
					{
						element: <SideContactInfoPage />,
						children: [
							{
								path: 'ayuda',
								element: <HelpPage helpLists={helpLists} />,
							},
							{
								path: 'contactanos',
								element: <ContactUsPage />,
							},
						],
					},
				],

				errorElement: <PaginaError />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SesionModalProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</SesionModalProvider>
	</React.StrictMode>
);
