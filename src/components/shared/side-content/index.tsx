import FadeInUp from '@/components/shared/fade-in-up';

import SideContentItem from './side-content-item';

const rawCodeList = [
  `function Greeting({ name }: { name: string }) {
  return <h1 className="text-xl font-bold">Hello, {name}!</h1>;
}
`,
  `import { useEffect, useState } from 'react';

function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(\`/api/users/\${id}\`)
      .then(res => res.json())
      .then(setUser);
  }, [id]);

  return user;
}
`,
  `export async function GET(request: Request) {
  const users = await fetchUsersFromDB();
  return Response.json(users);
}
`,
  `export const metadata = {
  title: 'My Portfolio',
  description: 'A showcase of my work and skills',
};
`,
  `import { useState } from 'react';

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(v => !v);
  return [value, toggle] as const;
}
`,
  `import Link from 'next/link';

function Nav() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
`,
  `async function Product({ id }: { id: string }) {
  const res = await fetch(\`https://api.com/products/\${id}\`);
  const product = await res.json();

  return <div>{product.name}</div>;
}
`,
  `import { Suspense } from 'react';

function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserProfile />
    </Suspense>
  );
}
`,
  `export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page not found</p>
    </div>
  );
}
`,
  `import { create } from 'zustand';

const useStore = create(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));
`,
];

const generateUniqueSideItems = (count: number) => {
  const usedCreatedAt = new Set<number>();
  const usedIndexes = new Set<number>();
  const items = [];

  while (items.length < count) {
    const createdAt = Math.floor(Math.random() * 30) + 1;
    const rawIndex = Math.floor(Math.random() * rawCodeList.length);

    if (usedCreatedAt.has(createdAt) || usedIndexes.has(rawIndex)) continue;

    usedCreatedAt.add(createdAt);
    usedIndexes.add(rawIndex);

    items.push({
      username: 'myungjuice',
      createdAt,
      comments: Math.floor(Math.random() * 999),
      stars: Math.floor(Math.random() * 999),
      rawCode: rawCodeList[rawIndex],
    });
  }

  return items.sort((a, b) => a.createdAt - b.createdAt);
};

const sideItems = generateUniqueSideItems(2);

const SideContent = () => (
  <div className='w-full flex-1 space-y-8 p-6 lg:sticky lg:top-28 lg:self-start'>
    {sideItems.map((item, idx) => (
      <FadeInUp key={item.createdAt + idx} delay={idx * 0.1}>
        <SideContentItem {...item} />
      </FadeInUp>
    ))}
  </div>
);

export default SideContent;
