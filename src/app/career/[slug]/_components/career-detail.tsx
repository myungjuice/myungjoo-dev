'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiImage } from 'react-icons/fi';

import CareerLinkCopyButton from '@/components/shared/career-link-copy-button';
import FadeInUp from '@/components/shared/fade-in-up';
import { careerMockData } from '@/constants/career';
import { cn } from '@/lib/utils';
import type { CareerFilterItem } from '@/types/career';

import CareerCaseStudyCard from './career-case-study-card';
import CompanyOverview from './company-overview';

type Props = {
  slug: CareerFilterItem;
};

const CareerDetail = ({ slug }: Props) => {
  const [viewedProjectIds, setViewedProjectIds] = useState<Set<number>>(() => new Set());
  const {
    i18n: { language },
  } = useTranslation();

  const company = careerMockData[language === 'en' ? 'en' : 'ko'][slug];

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const timer = setTimeout(() => {
      try {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {
        // invalid CSS selector in hash — ignore
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setViewedProjectIds(new Set());
  }, [slug]);

  const handleViewedChange = (projectId: number, viewed: boolean) => {
    setViewedProjectIds(current => {
      const next = new Set(current);
      if (viewed) next.add(projectId);
      else next.delete(projectId);
      return next;
    });
  };

  if (!company) return null;

  const backLabel = language === 'ko' ? '경력으로 돌아가기' : 'Back to Career';
  const linkCopyText =
    language === 'en'
      ? {
          companyLabel: 'Copy company link',
          projectLabel: 'Copy case study link',
          companySuccess: 'Company page link copied',
          projectSuccess: 'Case study link copied',
        }
      : {
          companyLabel: '회사 링크 복사',
          projectLabel: '케이스 스터디 링크 복사',
          companySuccess: '회사 페이지 링크를 복사했어요',
          projectSuccess: '케이스 스터디 링크를 복사했어요',
        };

  return (
    <div className='flex min-h-full w-full flex-col'>
      <div className='flex flex-col px-6 py-6 sm:px-10 sm:py-8'>
        <FadeInUp>
          <Link
            href='/career'
            className='mb-6 inline-flex items-center gap-2 text-body-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          >
            <FiArrowLeft />
            <span>{backLabel}</span>
          </Link>
        </FadeInUp>

        <FadeInUp delay={0.05}>
          <div className='mb-2 flex flex-col rounded-lg bg-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5 dark:bg-slate-700'>
            <div className='relative hidden h-28 w-28 items-center justify-center sm:flex'>
              {company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  fill
                  sizes='100px'
                  priority
                  className={cn('object-contain p-[25%]', company.imageClassName)}
                />
              ) : (
                <FiImage className='h-14 w-14 text-slate-500 dark:text-slate-400' />
              )}
            </div>
            <div className='flex flex-1 items-start justify-between gap-2'>
              <div className='space-y-1'>
                <p className='text-heading-h6 xl:text-heading-h5'>{company.name}</p>
                <p className='text-body-sm xl:text-body-md'>{company.period}</p>
                <p className='text-body-sm xl:text-body-md'>{company.slogan}</p>
                <p className='inline-block rounded text-body-sm-bold text-teal-500'>
                  {company.role}
                </p>
              </div>
              <CareerLinkCopyButton
                slug={slug}
                label={linkCopyText.companyLabel}
                successMessage={linkCopyText.companySuccess}
              />
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.08}>
          <CompanyOverview
            role={company.role}
            overview={company.overview}
            language={language === 'en' ? 'en' : 'ko'}
          />
        </FadeInUp>

        <div className='flex flex-col gap-5'>
          {company.projects.map((project, idx) => (
            <FadeInUp key={project.id} delay={0.1 + idx * 0.05} className='w-full'>
              <CareerCaseStudyCard
                slug={slug}
                project={project}
                index={idx}
                total={company.projects.length}
                viewed={viewedProjectIds.has(project.id)}
                onViewedChange={handleViewedChange}
                linkCopyText={linkCopyText}
              />
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
