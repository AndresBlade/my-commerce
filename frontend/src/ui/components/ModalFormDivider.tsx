import { ElementRef, useRef } from 'react';
import {
	EntryProps,
	InputFileMultipleImagesProps,
	InputFileProps,
	InputFileSingleImageProps,
	InputNumberProps,
	InputProps,
	InputStringProps,
	SelectProps,
	TextareaProps,
} from './EntryProps';

export const ModalFormDivider = ({
	title,
	handleChange,
	htmlFor,
	name,
	element,
	disabled,
	...rest
}: EntryProps) => {
	const imageRef = useRef<ElementRef<'img'>>(null);

	const determineElement = () => {
		switch (element) {
			case 'input': {
				const { type } = rest as unknown as InputProps;
				switch (type) {
					case 'text':
					case 'password':
					case 'email': {
						const { value } = rest as unknown as InputStringProps;
						return (
							<input
								type={type}
								id={htmlFor}
								name={name}
								onChange={handleChange}
								value={value}
								className="formModal__text"
								disabled={disabled}
							></input>
						);
						break;
					}
					case 'number': {
						const { value, max, min } =
							rest as unknown as InputNumberProps;
						return (
							<input
								type={type}
								id={htmlFor}
								name={name}
								disabled={disabled}
								value={
									max !== undefined
										? value > max
											? max
											: value
										: min !== undefined
										? value < min
											? min
											: value
										: value
								}
								max={max}
								min={min}
								className="formModal__number"
								onChange={handleChange}
							></input>
						);
					}
					case 'file': {
						const { accept, imagePreview, multiple } =
							rest as unknown as InputFileProps;

						if (!imagePreview) {
							return (
								<input
									id={htmlFor}
									disabled={disabled}
									name={name}
									type={type}
									accept={accept.join()}
									className="formModal__image"
									multiple={multiple}
									onChange={e => {
										handleChange(e);
									}}
								/>
							);
						}

						if (multiple) {
							return (
								<input
									id={htmlFor}
									name={name}
									disabled={disabled}
									type={type}
									accept={accept.join()}
									className="formModal__image"
									multiple={multiple}
									onChange={e => {
										handleChange(e);
										if (multiple) {
											const { handleImagesChange } =
												rest as unknown as InputFileMultipleImagesProps;
											handleImagesChange(e);
										}
									}}
								/>
							);
						}

						return (
							<>
								<input
									id={htmlFor}
									name={name}
									type={type}
									accept={accept.join()}
									className="formModal__image"
									disabled={disabled}
									onChange={e => {
										handleChange(e);
										const { handleImageChange } =
											rest as unknown as InputFileSingleImageProps;
										handleImageChange(e, imageRef);
									}}
								/>
								{imagePreview && (
									<img
										className="formModal__imagePreview"
										ref={imageRef}
										alt="Imagen de tienda"
									/>
								)}
							</>
						);
						break;
					}
				}
				break;
			}
			case 'select': {
				const { value, options } = rest as unknown as SelectProps;
				return (
					<select
						name={name}
						value={value}
						onChange={handleChange}
						id={htmlFor}
						className="formModal__select"
						disabled={disabled}
					>
						{options.map(option => (
							<option
								className="formModal__option"
								value={option.value}
								key={option.value}
							>
								{option.description}
							</option>
						))}
					</select>
				);
				break;
			}

			case 'textarea': {
				const { cols, rows, value } = rest as unknown as TextareaProps;

				return (
					<textarea
						name={name}
						value={value}
						cols={cols}
						rows={rows}
						onChange={handleChange}
						id={htmlFor}
						className="formModal__textarea"
					></textarea>
				);
			}
		}
	};

	return (
		<div className="formModal__Divider">
			<label className="formModal__label" htmlFor={htmlFor}>
				{title}
			</label>

			{determineElement()}
		</div>
	);
};

//se puede mejorar inputfileimageprops, la idea es diferenciar los input file entre sí para aplicar distintos comportamientos, como mostrar una imagen al lado
// no estoy seguro acerca del valor never como ultimo valor de AdditionalProps
