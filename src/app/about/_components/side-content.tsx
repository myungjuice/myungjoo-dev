import FadeInUp from '@/components/shared/fade-in-up';

import SideContentItem from './side-content-item';

const rawCodeList = [
  `
function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk<T> = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}
`,
  `
async function fetchUserData(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  const data: User = await response.json();
  return data;
}
`,
  `
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
`,
];

const sideItems = Array.from({ length: rawCodeList.length }).map((_, i) => ({
  username: 'wkdaudwn11',
  createdAt: `${Math.floor(Math.random() * 30) + 1} days ago`,
  comments: Math.floor(Math.random() * 999),
  stars: Math.floor(Math.random() * 999),
  rawCode: rawCodeList[i],
}));

const SideContent = () => (
  <div className='flex-1 space-y-8 p-6'>
    {sideItems.map((item, idx) => (
      <FadeInUp key={item.createdAt + idx} delay={idx * 0.1}>
        <SideContentItem {...item} />
      </FadeInUp>
    ))}
  </div>
);

export default SideContent;
