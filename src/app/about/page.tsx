import SectionTitle from '@/components/shared/section-title';
import Sidebar from '@/components/sidebar';

const About = () => (
  <div className='flex h-full'>
    <Sidebar>
      <Sidebar.Tab />
      <Sidebar.Content title='personal-info'>SidebarContent</Sidebar.Content>
    </Sidebar>

    <div className='flex h-full flex-1 flex-col'>
      <SectionTitle text='education' />
      <div className='flex h-full'>
        <div className='flex-1 p-6'>중앙 컨텐츠</div>
        <div className='flex h-full w-10 justify-center border-r border-l border-slate-400 py-4 dark:border-slate-700'>
          <div className='h-2 w-6 bg-slate-500' />
        </div>
        <div className='flex-1 p-6'>우측 컨텐츠</div>
      </div>
    </div>
  </div>
);

export default About;
