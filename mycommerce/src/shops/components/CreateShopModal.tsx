import React, { useRef, ElementRef, ChangeEvent, useContext } from 'react';
import { useForm } from '../../auth/hooks/useForm';
import { useState } from 'react';
import { ErrorMessage } from '../../ui/components/ErrorMessage';
import { Shop } from '../interfaces/Shop';
import { createShop } from '../helpers/createShop';
import { AuthContext } from '../../auth/context/AuthContext';
import { UserData } from '../../user/interfaces/UserData';
import { getShopsByUser } from '../helpers/getShopsByUser';

type Props = {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setShops: React.Dispatch<React.SetStateAction<Shop[] | null>>;
};

const handleFileChange = (
	e: ChangeEvent<HTMLInputElement>,
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

interface Form {
	RIF: string;
	name: string;
	descripcion: string;
	Image: FileList | null;
	region: string;
}

const onSubmit = (
	form: Form,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	{ user: { id }, token }: UserData,
	setShops: React.Dispatch<React.SetStateAction<Shop[] | null>>
): void => {
	const { Image, RIF, descripcion, name, region } = form;
	const inputsFilled = Object.values(form)
		.filter(value => typeof value === 'string' || typeof value === 'number')
		.every(value => value !== '' && value !== 0);

	if (region === '-1') setError('Ingrese una región válida');

	if (!inputsFilled) return setError('Faltan campos por rellenar');

	if (!Image?.[0]) return setError('Debe subir una imagen');
	if (name.length < 4)
		return setError('El nombre debe de tener mínimo 4 caracteres');
	if (parseInt(form.RIF) > 2000000000)
		return setError('El RIF debe ser un número menor a 1.000.000.000');
	if (form.descripcion.trim().length < 30)
		return setError('La descripción debe tener mínimo 30 caracteres');

	const formData = new FormData();

	formData.append('RIF', RIF);
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

export const CreateShopModal = ({
	showModal,
	setShowModal,
	setShops,
}: Props) => {
	const modalRef = useRef<ElementRef<'div'>>(null);
	const imageRef = useRef<ElementRef<'img'>>(null);
	const { userData } = useContext(AuthContext);

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
		RIF: '',
		name: '',
		descripcion: '',
		Image: null,
		region: '-1',
	});

	const [error, setError] = useState<string | null>(null);

	function cerrarModal(): void {
		return setShowModal(false);
	}
	return (
		<div
			className={`modal ${showModal ? 'modal--visible' : ''}`}
			id="modal"
			ref={modalRef}
		>
			<div
				className="modal__dialog"
				onMouseEnter={() =>
					modalRef.current?.removeEventListener('click', cerrarModal)
				}
				onMouseLeave={() =>
					modalRef.current?.addEventListener('click', cerrarModal)
				}
			>
				<header className="modal__header">
					<h2 className="modal__title">Agregar Tienda</h2>
					{/* <!-- <button className="modal__close">X</button> --> */}
				</header>
				<section className="modal__content">
					<form
						action=""
						className="modal__formModal formModal"
						encType="multipart/form-data"
					>
						<div className="formModal__Divider">
							<label className="formModal__label" htmlFor="RIF">
								RIF
							</label>
							<input
								type="number"
								className="formModal__number"
								name="RIF"
								id="RIF"
								min="0"
								onChange={onInputChange}
								value={RIF}
							/>
						</div>
						<div className="formModal__Divider">
							<label className="formModal__label" htmlFor="name">
								Nombre
							</label>
							<input
								type="text"
								name="name"
								id="name"
								className="formModal__text"
								onChange={onInputChange}
								value={name}
							/>
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
								onChange={onTextareaChange}
								value={descripcion}
							></textarea>
						</div>
						<div className="formModal__Divider">
							<label className="formModal__label" htmlFor="Image">
								Imagen
							</label>
							<input
								type="file"
								name="Image"
								id="Image"
								className="formModal__image"
								accept="image/png, image/jpeg"
								onChange={e => {
									handleFileChange(e, imageRef);
									onFileInputChange(e);
								}}
							/>
							<img
								className="formModal__imagePreview"
								ref={imageRef}
								alt="Imagen de tienda"
							/>
						</div>
						<div className="formModal__Divider">
							<label
								className="formModal__label"
								htmlFor="region"
							>
								Región
							</label>
							<select
								name="region"
								id="region"
								className="formModal__select"
								onChange={onSelectChange}
								value={region}
							>
								<option className="formModal__option" value="4">
									Amazonas
								</option>
								<option className="formModal__option" value="5">
									Anzoátegui
								</option>
								<option className="formModal__option" value="6">
									Apure
								</option>
								<option className="formModal__option" value="7">
									Aragua
								</option>
								<option className="formModal__option" value="8">
									Barinas
								</option>
								<option className="formModal__option" value="9">
									Bolívar
								</option>
								<option
									className="formModal__option"
									value="10"
								>
									Carabobo
								</option>
								<option
									className="formModal__option"
									value="11"
								>
									Cojedes
								</option>
								<option
									className="formModal__option"
									value="12"
								>
									Delta Amacuro
								</option>
								<option
									className="formModal__option"
									value="13"
								>
									Dependencias Federales
								</option>
								<option
									className="formModal__option"
									value="14"
								>
									Distrito Federal
								</option>
								<option
									className="formModal__option"
									value="15"
								>
									Falcón
								</option>
								<option
									className="formModal__option"
									value="16"
								>
									Guárico
								</option>
								<option
									className="formModal__option"
									value="17"
								>
									Lara
								</option>
								<option
									className="formModal__option"
									value="18"
								>
									Mérida
								</option>
								<option
									className="formModal__option"
									value="19"
								>
									Miranda
								</option>
								<option
									className="formModal__option"
									value="20"
								>
									Monagas
								</option>
								<option
									className="formModal__option"
									value="21"
								>
									Nueva Esparta
								</option>
								<option
									className="formModal__option"
									value="22"
								>
									Portuguesa
								</option>
								<option
									className="formModal__option"
									value="23"
								>
									Sucre
								</option>
								<option
									className="formModal__option"
									value="24"
								>
									Táchira
								</option>
								<option
									className="formModal__option"
									value="25"
								>
									Trujillo
								</option>
								<option
									className="formModal__option"
									value="26"
								>
									Vargas
								</option>
								<option
									className="formModal__option"
									value="27"
								>
									Yaracuy
								</option>
								<option
									className="formModal__option"
									value="28"
								>
									Zulia
								</option>
							</select>
						</div>

						<div className="formModal__errorBox">
							{error && (
								<ErrorMessage
									setError={setError}
									message={error}
								/>
							)}
						</div>
					</form>
					<button
						type="button"
						className="formModal__submit"
						onClick={() =>
							onSubmit(formState, setError, userData, setShops)
						}
					>
						Crear Tienda
					</button>
				</section>
			</div>
		</div>
	);
};
