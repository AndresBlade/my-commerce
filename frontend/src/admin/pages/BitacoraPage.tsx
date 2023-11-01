import { useEffect, useState, useContext } from 'react';
import { getAllUserLogFiles } from '../helpers/getAllUserLogs';
import { AuthContext } from '../../auth/context/AuthContext';
import { getLogBody } from '../helpers/getLogBody';

const downloadLog = async (token: string, logName: string) => {
	const logBody = await getLogBody(token, logName);

	const url = window.URL.createObjectURL(logBody);

	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${logName}.txt`);

	document.body.append(link);

	link.click();

	link.remove();
};

export const BitacoraPage = () => {
	const [bitacoras, setBitacoras] = useState<string[] | null>(null);

	const {
		user: { token },
	} = useContext(AuthContext);

	useEffect(() => {
		getAllUserLogFiles(token)
			.then(response => {
				setBitacoras(response);
			})
			.catch(err => console.log(err));
	}, [token]);

	return (
		<div>
			<h1>Bitácora de Actividades</h1>
			<ul>
				{bitacoras?.map((unprocessedLogName, index) => {
					const logName = unprocessedLogName.substring(
						0,
						unprocessedLogName.lastIndexOf('.')
					);
					console.log(logName);
					if (logName !== '.gitkeep')
						return (
							<li key={index}>
								<button
									onClick={() => {
										downloadLog(token, logName)
											.then(response =>
												console.log(response)
											)
											.catch(err => console.log(err));
									}}
								>
									{logName}
								</button>
							</li>
						);
				})}
			</ul>
		</div>
	);
};
