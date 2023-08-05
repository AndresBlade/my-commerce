import { useParams } from 'react-router';
import { useForm } from '../../auth/hooks/useForm';
import { getCategories } from '../../products/helpers/getCategories';
import { getSingleShopProducts } from '../../products/helpers/getSingleShopProducts';
import { ProductCategory } from '../../products/interfaces/ProductCategory';
import { CreateButton } from './CreateButton';
import { Modal, SubmitType } from './Modal';
import { EntryProps } from './ModalFormDivider';
import { MyShopProfile } from './MyShopProfile';
import { useState, useEffect, useRef } from 'react';
import { ElementRef } from 'react';
import { Product } from '../../products/interfaces/Product';
import { UserData } from '../../user/interfaces/UserData';
import { createProduct } from '../../products/helpers/createProduct';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

type Form = {
	name: string;
	price: number;
	category: string;
	description: string;
	image: FileList | null;
};

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
	const { image, name } = form;
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

	if (formRef?.current && RIF) {
		const formData = new FormData(formRef.current);
		formData.append('tienda_id', RIF);

		for (const entry of formData) console.log(entry);

		// createProduct(formData, token)
		// 	.then(() =>
		// 		getSingleShopProducts(RIF).then(response =>
		// 			setProducts(response.tiendaProducts)
		// 		)
		// 	)
		// 	.catch(err => console.log(err));
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
	const [error, setError] = useState<string | null>(null);
	const inputImageRef = useRef<ElementRef<'input'>>();
	const { userData } = useContext(AuthContext);
	const { RIF } = useParams();

	useEffect(() => {
		getCategories()
			.then(response => setCategories(response.categories))
			.catch(err => console.log(err));
		if (RIF)
			getSingleShopProducts(RIF)
				.then(response => setProducts(response.tiendaProducts))
				.catch(err => console.log(err));
	}, []);
	const {
		category,
		description,
		image,
		name,
		price,
		formState,
		onInputChange,
		onSelectChange,
		onFileInputChange,
		onTextareaChange,
	} = useForm<Form>({
		category: '-1',
		description: '',
		image: null,
		name: '',
		price: 0,
	});

	const entries: EntryProps[] = [
		{
			element: 'input',
			type: 'text',
			name: 'nombre',
			htmlFor: 'name',
			title: 'Nombre',
			value: name,
			handleChange: onInputChange,
		},
		{
			element: 'input',
			type: 'number',
			name: 'precio',
			htmlFor: 'price',
			title: 'Precio',
			value: price,
			handleChange: onInputChange,
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
						<MyShopProfile />
					</aside>

					<div className="misTiendas__perfilTienda perfilTienda">
						<div className="misTiendas__grid"></div>
					</div>
				</div>
			</main>
			<Modal
				title="Agregar Producto"
				setShowModal={setShowModal}
				showModal={showModal}
				form={{
					entries,
					setError,
					error,
					formState,
					onSubmit,
					setData: setProducts,
					userData: { ...userData, RIF },
				}}
			/>

			<div className="modal" id="modal">
				<div className="modal__dialog">
					<header className="modal__header">
						<h2 className="modal__title">Agregar Producto</h2>
						{/* <!-- <button className="modal__close">X</button> --> */}
					</header>
					<section className="modal__content">
						<form
							action=""
							className="modal__formModal formModal"
							encType="multipart/form-data"
						>
							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="name"
								>
									Nombre
								</label>
								<input
									type="text"
									name="nombre"
									id="name"
									className="formModal__text"
								/>
							</div>

							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="price"
								>
									Precio
								</label>
								<input
									type="number"
									step="0.01"
									min="0"
									name="precio"
									id="price"
									className="formModal__number"
								/>
							</div>

							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="category"
								>
									Categoría
								</label>
								<select
									name="categoria_id"
									id="category"
									className="formModal__select"
								></select>
							</div>

							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="description"
								>
									Descripción
								</label>

								<textarea
									name="descripcion"
									className="formModal__textarea"
									id="description"
									cols={30}
									rows={10}
								></textarea>
							</div>

							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="Image"
								>
									Imagen
								</label>
								<input
									type="file"
									name="imagen"
									id="Image"
									className="formModal__image"
									accept="image/png, image/jpeg"
									multiple
								/>
							</div>

							<div className="formModal__errorBox"></div>
						</form>
						<button type="button" className="formModal__submit">
							Crear Producto
						</button>
					</section>
				</div>
			</div>
		</>
	);
};
