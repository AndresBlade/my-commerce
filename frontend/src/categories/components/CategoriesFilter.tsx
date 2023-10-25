import { useNavigate, useParams } from 'react-router';
import { CategoriesProps } from '../interfaces/CategoriesProps';
import { LandingLoader } from '../../landing/interfaces/LandingLoader';
import { ExplorarParams } from '../../explore/interfaces/ExplorarParams';

export const CategoryFilter = ({
	categoryName,
	value,
	onChange,
}: CategoriesProps & {
	value: string | number;
	onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const { category, productPage, shopPage } = useParams() as ExplorarParams;
	const navigate = useNavigate();
	return (
		<div className="flex mb-2 gap-5 items-center">
			<input
				type="radio"
				name="categoryFilter"
				value={value}
				onChange={e => {
					onChange(e.target.value);
					navigate(
						`/explorar/${productPage ? productPage : 0}/${
							shopPage ? shopPage : 0
						}/${value}`
					);
				}}
			/>
			<span className="text-[.7rem] sm:text-[1rem]">{categoryName}</span>
		</div>
	);
};
