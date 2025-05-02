import { techIconMap } from '@/constants/projects';

type Props = {
  techs: string[];
};

const TechIcons = ({ techs }: Props) =>
  techs.map(tech => {
    const Icon = techIconMap[tech];
    return Icon ? <Icon key={tech} size={20} className='text-teal-500' /> : null;
  });

export default TechIcons;
