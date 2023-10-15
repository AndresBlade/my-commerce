import { Link } from 'react-router-dom';
import { ReactElement, useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';

interface Props {
  url: string;
  title: string;
  icon: ReactElement;
}

export const DashboardSection = ({ url, title, icon }: Props) => {
  const { open } = useContext(SideBarContext);

  const dbSectionText = open 
  ? 'hidden sm:block overflow-hidden transition-all text-[.9rem] ml-4 font-medium uppercase text-gray-600' 
  : 'hidden';

  return (
    <div className="flex flex-col my-4">
      <Link to={url}>
        <div className='flex items-center py-2 px-4 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-gris'>
          {icon}
          <span className={dbSectionText}>{title}</span>
        </div>
      </Link>
    </div>
  );
};