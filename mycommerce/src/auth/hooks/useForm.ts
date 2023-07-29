import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initialForm: T) => {
	const [formState, setFormState] = useState(initialForm);

	function onInputChange({ target }: ChangeEvent<HTMLInputElement>) {
		const { name, value } = target;

		console.log({ [name]: value });

		setFormState({ ...formState, [name]: value });
	}

	function onCheckboxChange({ target }: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = target;

		console.log({ [name]: checked });

		setFormState({ ...formState, [name]: checked });
	}

	return { ...formState, formState, onInputChange, onCheckboxChange };
};
