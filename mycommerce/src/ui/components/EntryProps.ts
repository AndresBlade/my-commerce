import { ChangeEvent, ElementRef } from 'react';

export type OptionProps = {
	description: string;
	value: string;
};

export type SelectProps = {
	element: 'select';
	handleChange: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;

	value: string;
	options: OptionProps[];
};

export type TextareaProps = {
	handleChange: ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => void;

	element: 'textarea';
	value: string;
	cols?: number;
	rows?: number;
};

export type InputFileDocumentProps = {
	imagePreview: false;
};

export type InputFileMultipleImagesProps = {
	multiple: true;
	handleImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type InputFileSingleImageProps = {
	handleImageChange: (
		e: ChangeEvent<HTMLInputElement>,
		imageRef: React.RefObject<ElementRef<'img'>>
	) => void;
};

export type InputFileImageProps = {
	imagePreview: true;
} & (InputFileSingleImageProps | InputFileMultipleImagesProps);

export type InputFileProps = {
	type: 'file';
	accept: string[];
	value: FileList | null;
	multiple?: boolean;
} & (InputFileImageProps | InputFileDocumentProps);

export type InputNumberProps = {
	type: 'number';
	value: number;
	min?: number;
	max?: number;
};

export type InputTextProps = {
	type: 'text';
	value: string;
};

export type InputProps = {
	element: 'input';
	handleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
} & (InputNumberProps | InputTextProps | InputFileProps);

export type EntryProps = {
	title: string;
	name: string;
	htmlFor: string;
} & (InputProps | TextareaProps | SelectProps);
