import { MyShopList } from '../../shops/components/MyShopList';
import { CreateButton } from '../../shops/components/CreateButton';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { Shop } from '../../shops/interfaces/Shop';
import { getShopsByUser } from '../../shops/helpers/getShopsByUser';
import { useForm } from '../../hooks/useForm';
import { ElementRef } from 'react';
import { UserData } from '../interfaces/UserData';
import { createShop } from '../../shops/helpers/createShop';
import { getRegions } from '../../shops/helpers/getRegions';
import { Region } from '../../shops/interfaces/ShopRegion';
import { Modal, SubmitType } from '../../ui/components/Modal';
import { ModalForm } from '../../ui/components/ModalForm';
import { ModalTitle } from '../../ui/components/ModalTitle';
import { ModalContent } from '../../ui/components/ModalContent';
import { ModalFormDivider } from '../../ui/components/ModalFormDivider';
import { ModalFormSubmitButton } from '../../ui/components/ModalFormSubmitButton';

const onSubmit: SubmitType<Form, Shop[], UserData> = (
	form: Form,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	{ user: { id }, token }: UserData,
	setShops: React.Dispatch<React.SetStateAction<Shop[] | null>>
): void => {
	const { Image, RIF, descripcion, name, region } = form;
	const inputsFilled = Object.values(form)
		.filter(value => typeof value === 'string' || typeof value === 'number')
		.every(value => value !== '' && value !== 0);

	if (region === '-1') return setError('Ingrese una región válida');

	if (!inputsFilled) return setError('Faltan campos por rellenar');

	if (!Image?.[0]) return setError('Debe subir una imagen');
	if (name.length < 4)
		return setError('El nombre debe de tener mínimo 4 caracteres');
	if (form.RIF > 2000000000)
		return setError('El RIF debe ser un número menor a 1.000.000.000');
	if (form.descripcion.trim().length < 30)
		return setError('La descripción debe tener mínimo 30 caracteres');

	const formData = new FormData();

	formData.append('RIF', RIF.toString());
	formData.append('nombre', name);
	formData.append('descripcion', descripcion);
	formData.append('regionId', region);
	formData.append('cliente_id', id.toString());
	formData.append('imagen', Image[0]);

	createShop(formData, token)
		.then(() =>
			getShopsByUser(id, token).then(response => setShops(response.data))
		)
		.catch(err => console.log(err));
};

interface Form {
	RIF: number;
	name: string;
	descripcion: string;
	Image: FileList | null;
	region: string;
}

const handleFileChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	imageRef: React.RefObject<ElementRef<'img'>>
) => {
	const file = e.target.files?.[0];
	const reader = new FileReader();
	console.log('change');
	reader.addEventListener('loadend', e => {
		console.log(imageRef.current);
		if (imageRef.current) {
			imageRef.current.src = e.target?.result
				? e.target.result.toString()
				: '';
			imageRef.current.classList.add('formModal__imagePreview--visible');
		}
	});

	if (file) reader.readAsDataURL(file);
};

export const MyShopsPage = () => {
	const [showModal, setShowModal] = useState(false);
	const [regions, setRegions] = useState<Region[] | []>([]);
	const { userData } = useContext(AuthContext);
	const {
		user: { id },
		token,
	} = userData;
	const [shops, setShops] = useState<Shop[] | null>(null);
	useEffect(() => {
		getShopsByUser(id, token)
			.then(response => setShops(response.data))
			.catch(err => console.log(err));
		getRegions()
			.then(response => {
				console.log(response.regiones);
				setRegions(response.regiones);
			})
			.catch(err => console.log(err));
	}, [id, token]);

	const {
		RIF,
		descripcion,
		name,
		region,
		onInputChange,
		onSelectChange,
		onTextareaChange,
		formState,
		onFileInputChange,
	} = useForm<Form>({
		RIF: 0,
		name: '',
		descripcion: '',
		Image: null,
		region: '-1',
	});

	const [error, setError] = useState<string | null>(null);
	return (
		<>
			<CreateButton
				setShowModal={setShowModal}
				buttonTitle="Agregar Tienda"
			/>
			<MyShopList shops={shops} />
			<Modal setShowModal={setShowModal} showModal={showModal}>
				<ModalContent>
					<ModalTitle title="Agregar Tienda" />
					<ModalForm setError={setError} error={error}>
						<ModalFormDivider
							title={'RIF'}
							name={'RIF'}
							htmlFor={'RIF'}
							handleChange={onInputChange}
							element={'input'}
							type={'number'}
							value={RIF}
							min={0}
						/>
						<ModalFormDivider
							element={'input'}
							type={'text'}
							name={'name'}
							htmlFor={'name'}
							title={'Nombre'}
							handleChange={onInputChange}
							value={name}
						/>
						<ModalFormDivider
							element={'textarea'}
							handleChange={onTextareaChange}
							htmlFor={'description'}
							name={'descripcion'}
							title={'Descripción'}
							value={descripcion}
							cols={30}
							rows={10}
						/>
						<ModalFormDivider
							element={'input'}
							type={'file'}
							imagePreview={true}
							accept={['image/png', 'image/jpeg']}
							handleChange={onFileInputChange}
							handleImageChange={handleFileChange}
							htmlFor={'Image'}
							name={'Image'}
							title={'Imagen'}
							value={formState.Image}
						/>
						<ModalFormDivider
							element={'select'}
							handleChange={onSelectChange}
							htmlFor={'region'}
							name={'region'}
							title={'Región'}
							value={region}
							options={regions.map(region => {
								return {
									description: region.descripcion,
									value: region.id.toString(),
								};
							})}
						/>
					</ModalForm>
					<ModalFormSubmitButton
						title="Crear Tienda"
						handleClick={() => {
							onSubmit(
								formState,
								setError,
								userData,
								setShops,
								setShowModal
							);
						}}
					/>
				</ModalContent>
			</Modal>
		</>
	);
};
