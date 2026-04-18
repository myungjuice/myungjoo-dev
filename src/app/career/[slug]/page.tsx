import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { careerFilterList, careerMockData } from '@/constants/career';
import { shared } from '@/constants/metadata';
import type { CareerFilterItem } from '@/types/career';

import CareerDetail from './_components/career-detail';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return careerFilterList.map(id => ({ slug: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = careerMockData.ko[slug as CareerFilterItem];

  if (!company) return {};

  const title = `${company.name} | Career | 장명주`;
  const description = company.slogan ?? company.role;
  const url = `https://myungjoo.dev/career/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [shared.ogImage],
      siteName: shared.siteName,
      type: shared.type,
    },
    twitter: {
      card: shared.twitterCard,
      title,
      description,
      images: [shared.ogImage],
    },
  };
}

const CareerDetailPage = async ({ params }: Props) => {
  const { slug } = await params;

  if (!careerFilterList.includes(slug as CareerFilterItem)) notFound();

  return <CareerDetail slug={slug as CareerFilterItem} />;
};

export default CareerDetailPage;
