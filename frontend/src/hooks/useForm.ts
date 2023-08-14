import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initialForm: T) => {
	const [formState, setFormState] = useState(initialForm);

	function onInputChange({ target }: ChangeEvent<HTMLInputElement>) {
		const { name, value } = target;

		setFormState({ ...formState, [name]: value });
	}

	function onFileInputChange({ target }: ChangeEvent<HTMLInputElement>) {
		const { name, files } = target;

		setFormState({ ...formState, [name]: files });
	}

	function onTextareaChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
		const { name, value } = target;

		setFormState({ ...formState, [name]: value });
	}

	function onSelectChange({ target }: ChangeEvent<HTMLSelectElement>) {
		const { name, selectedOptions } = target;

		setFormState({ ...formState, [name]: selectedOptions[0].value });
	}

	function onCheckboxChange({ target }: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = target;

		setFormState({ ...formState, [name]: checked });
	}

	return {
		...formState,
		formState,
		onInputChange,
		onCheckboxChange,
		onSelectChange,
		onTextareaChange,
		onFileInputChange,
	};
};
