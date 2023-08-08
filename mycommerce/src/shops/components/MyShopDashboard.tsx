import { Outlet, useParams } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { getCategories } from '../../products/helpers/getCategories';
import { getSingleShopProducts } from '../../products/helpers/getSingleShopProducts';
import { ProductCategory } from '../../products/interfaces/ProductCategory';
import { CreateButton } from './CreateButton';
import { Modal, SubmitType } from '../../ui/components/Modal';
import { MyShopProfile } from './MyShopProfile';
import { useState, useEffect, useRef, useContext } from 'react';
import { ElementRef } from 'react';
import { Product } from '../../products/interfaces/Product';
import { UserData } from '../../user/interfaces/UserData';
import { createProduct } from '../../products/helpers/createProduct';
import { AuthContext } from '../../auth/context/AuthContext';
import { Shop } from '../interfaces/Shop';
import { getSingleShop } from '../helpers/getSingleShop';
import { MyShopProductCard } from './MyShopProductCard';
import { EntryProps } from '../../ui/components/EntryProps';

interface Form {
	nombre: string;
	precio: number;
	categoria_id: string;
	descripcion: string;
	imagen: FileList | null;
}

const onSubmit: SubmitType<
	Form,
	Product[],
	UserData & { RIF: string | undefined }
> = (
	form: Form,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	{ token, RIF }: UserData & { RIF: string | undefined },
	setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>,
	formRef?: React.RefObject<ElementRef<'form'>>
) => {
	const { imagen: image, nombre: name } = form;
	const textInputsFilled = Object.values(form)
		.filter(value => typeof value === 'string')
		.every(value => value !== '');

	if (!textInputsFilled) return setError('Faltan campos por rellenar');
	if (image?.length === 0)
		return setError('Debe de subir al menos una imagen');
	if (name.length < 4)
		return setError(
			'El nombre del producto debe de tener al menos 3 caracteres'
		);

	console.log(formRef?.current);

	if (formRef?.current && RIF) {
		const formData = new FormData(formRef.current);
		formData.append('tienda_id', RIF);

		for (const entry of formData) console.log(entry);

		createProduct(formData, token)
			.then(() =>
				getSingleShopProducts(RIF).then(response =>
					setProducts(response.tiendaProducts)
				)
			)
			.catch(err => console.log(err));
	}
};

const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const { files } = e.target;
	const inputImageFile = e.target;

	if (files === null) return;

	for (const file of files) {
		const reader = new FileReader();
		reader.addEventListener('loadend', e => {
			const image = document.createElement('img');
			if (e.target?.result) image.src = e.target.result.toString(); //obtiene la imagen del file reader
			image.classList.add(
				'formModal__imagePreview--visible',
				'formModal__imagePreview'
			);
			inputImageFile.after(image);
		});

		reader.readAsDataURL(file);
	}
};

export const MyShopDashboard = () => {
	const [showModal, setShowModal] = useState(false);
	const [categories, setCategories] = useState<ProductCategory[] | []>([]);
	const [products, setProducts] = useState<Product[] | null>(null);
	const [shop, setShop] = useState<Shop | null>(null);
	const [error, setError] = useState<string | null>(null);
	const formRef = useRef<ElementRef<'form'>>(null);
	const { userData } = useContext(AuthContext);
	const { RIF } = useParams();

	useEffect(() => {
		getCategories()
			.then(response => setCategories(response.categories))
			.catch(err => console.log(err));
		if (RIF) {
			getSingleShopProducts(RIF)
				.then(response => setProducts(response.tiendaProducts))
				.catch(err => console.log(err));
			getSingleShop(RIF)
				.then(response => setShop(response.data))
				.catch(err => console.log(err));
		}
	}, [RIF]);
	const {
		categoria_id: category,
		descripcion: description,
		imagen: image,
		nombre: name,
		precio: price,
		formState,
		onInputChange,
		onSelectChange,
		onFileInputChange,
		onTextareaChange,
	} = useForm<Form>({
		categoria_id: '-1',
		descripcion: '',
		imagen: null,
		nombre: '',
		precio: 0,
	});

	console.log(formState);

	const entries: EntryProps[] = [
		{
			title: 'Nombre',
			name: 'nombre',
			htmlFor: 'name',
			handleChange: onInputChange,
			element: 'input',
			type: 'text',
			value: name,
		},
		{
			element: 'input',
			type: 'number',
			name: 'precio',
			htmlFor: 'price',
			title: 'Precio',
			value: price,
			handleChange: onInputChange,
			min: 0,
			max: 1_000_000_000,
		},
		{
			element: 'select',
			name: 'categoria_id',
			htmlFor: 'category',
			title: 'Categoría',
			value: category,
			options: categories.map(category => {
				return {
					description: category.descripcion,
					value: category.id.toString(),
				};
			}),
			handleChange: onSelectChange,
		},
		{
			element: 'textarea',
			name: 'descripcion',
			htmlFor: 'description',
			title: 'Descripción',
			value: description,
			handleChange: onTextareaChange,
			cols: 30,
			rows: 10,
		},
		{
			element: 'input',
			type: 'file',
			imagePreview: true,
			accept: ['image/png', 'image/jpeg'],
			htmlFor: 'Image',
			name: 'imagen',
			title: 'Imagen',
			handleChange: onFileInputChange,
			value: image,
			multiple: true,
			handleImagesChange,
		},
	];
	return (
		<>
			<main className="misTiendas">
				<div className="Perfil__tienda">
					<CreateButton
						buttonTitle="Agregar Producto"
						setShowModal={setShowModal}
					/>
					<aside className="menu-dashboard">
						{shop && <MyShopProfile shop={shop} />}
					</aside>

					<Outlet context={{ products, categories }} />
				</div>
				<Modal
					title="Agregar Producto"
					setShowModal={setShowModal}
					showModal={showModal}
					form={{
						entries: entries,
						setError,
						error,
						formState,
						onSubmit,
						setData: setProducts,
						userData: { ...userData, RIF },
						formRef: formRef,
					}}
				/>
			</main>
		</>
	);
};