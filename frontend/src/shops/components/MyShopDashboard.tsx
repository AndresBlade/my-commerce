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
import { ModalTitle } from '../../ui/components/ModalTitle';
import { ModalContent } from '../../ui/components/ModalContent';
import { ModalForm } from '../../ui/components/ModalForm';
import { ModalFormDivider } from '../../ui/components/ModalFormDivider';
import { ModalFormSubmitButton } from '../../ui/components/ModalFormSubmitButton';

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
	setShowModal?: React.Dispatch<React.SetStateAction<boolean>>,
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
		formData.append('cantidad', '12');

		for (const entry of formData) console.log(entry);

		createProduct(formData, token)
			.then(response => {
				console.log(response);
				getSingleShopProducts(RIF)
					.then(response => {
						setProducts(response.productosTienda);
						if (typeof setShowModal !== 'undefined')
							setShowModal(false);
					})
					.catch(err => console.log(err));
			})
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
	const { user } = useContext(AuthContext);
	const { RIF } = useParams() as { RIF: string };

	useEffect(() => {
		getCategories()
			.then(response => setCategories(response.categories))
			.catch(err => console.log(err));

		getSingleShopProducts(RIF)
			.then(response => setProducts(response.productosTienda))
			.catch(err => console.log(err));
		getSingleShop(RIF)
			.then(response => setShop(response.datosTienda[0]))
			.catch(err => console.log(err));
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

					<Outlet context={{ products }} />
				</div>
				<Modal setShowModal={setShowModal} showModal={showModal}>
					<ModalTitle title="Agregar Producto" />
					<ModalContent>
						<ModalForm
							setError={setError}
							error={error}
							formRef={formRef}
						>
							<ModalFormDivider
								title={'Nombre'}
								name={'nombre'}
								htmlFor={'name'}
								handleChange={onInputChange}
								element={'input'}
								type={'text'}
								value={name}
							/>
							<ModalFormDivider
								element={'input'}
								type={'number'}
								name={'precio'}
								htmlFor={'price'}
								title={'Precio'}
								value={price}
								handleChange={onInputChange}
								min={0}
								max={1_000_000_000}
							/>
							<ModalFormDivider
								element={'select'}
								name={'categoria_id'}
								htmlFor={'category'}
								title={'Categoría'}
								value={category}
								handleChange={onSelectChange}
								options={categories.map(category => {
									return {
										description: category.descripcion,
										value: category.id.toString(),
									};
								})}
							/>
							<ModalFormDivider
								element={'textarea'}
								name={'descripcion'}
								htmlFor={'description'}
								title={'Descripción'}
								value={description}
								handleChange={onTextareaChange}
								cols={30}
								rows={10}
							/>
							<ModalFormDivider
								element={'input'}
								type={'file'}
								imagePreview={true}
								accept={['image/png', 'image/jpeg']}
								htmlFor={'Image'}
								name={'Imagenes'}
								title={'Imagen'}
								handleChange={onFileInputChange}
								value={image}
								multiple={true}
								handleImagesChange={handleImagesChange}
							/>
						</ModalForm>
						<ModalFormSubmitButton
							handleClick={() => {
								onSubmit(
									formState,
									setError,
									{ ...user, RIF },
									setProducts,
									setShowModal,
									formRef
								);
							}}
							title="Crear Producto"
						/>
					</ModalContent>
				</Modal>
			</main>
		</>
	);
};
