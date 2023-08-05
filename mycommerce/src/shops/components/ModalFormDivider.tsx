import { ChangeEvent, ElementRef, useRef } from 'react';

type OptionProps = {
	description: string;
	value: string;
};

type SelectProps = {
	element: 'select';
	handleChange: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;

	value: string;
	options: OptionProps[];
};

type TextareaProps = {
	handleChange: ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => void;

	element: 'textarea';
	value: string;
	cols?: number;
	rows?: number;
};

type InputFileDocumentProps = {
	imagePreview: false;
};

type InputFileMultipleImagesProps = {
	multiple: true;
	handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputFileSingleImageProps = {
	handleImageChange: (
		e: ChangeEvent<HTMLInputElement>,
		imageRef: React.RefObject<ElementRef<'img'>>
	) => void;
};

type InputFileImageProps = {
	imagePreview: true;
} & (InputFileSingleImageProps | InputFileMultipleImagesProps);

type InputFileProps = {
	type: 'file';
	accept: string[];
	value: FileList | null;
	multiple?: boolean;
} & (InputFileImageProps | InputFileDocumentProps);

type InputNumberProps = {
	type: 'number';
	value: number;
	min?: number;
	max?: number;
};

type InputTextProps = {
	type: 'text';
	value: string;
};

type InputProps = {
	element: 'input';
	handleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
} & (InputNumberProps | InputTextProps | InputFileProps);

export type EntryProps = {
	title: string;
	name: string;
	htmlFor: string;
} & (InputProps | TextareaProps | SelectProps);

export const ModalFormDivider = ({
	title,
	handleChange,
	htmlFor,
	name,
	element,
	...rest
}: EntryProps) => {
	const imageRef = useRef<ElementRef<'img'>>(null);

	const determineElement = () => {
		switch (element) {
			case 'input': {
				const { type } = rest as unknown as InputProps;
				switch (type) {
					case 'text': {
						const { value } = rest as unknown as InputTextProps;
						return (
							<input
								type={type}
								id={htmlFor}
								name={name}
								onChange={handleChange}
								value={value}
								className="formModal__text"
							></input>
						);
					}
					case 'number': {
						const { value, max, min } =
							rest as unknown as InputNumberProps;
						return (
							<input
								type={type}
								id={htmlFor}
								name={name}
								value={value}
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
									name={name}
									type={type}
									accept={accept.join()}
									className="formModal__image"
									multiple={multiple}
									onChange={e => {
										handleChange(e);
									}}
								></input>
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
									multiple={multiple}
									onChange={e => {
										handleChange(e);
										if (multiple) {
											const { handleImagesChange } =
												rest as unknown as InputFileMultipleImagesProps;
											handleImagesChange(e);
										}
									}}
								></input>

								<img
									className="formModal__imagePreview"
									ref={imageRef}
									alt="Imagen de tienda"
								/>
							</>
						);
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
