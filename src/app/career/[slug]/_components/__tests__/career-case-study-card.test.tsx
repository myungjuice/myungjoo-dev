import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { careerMockData } from '@/constants/career';
import type { CareerProject } from '@/types/career';

import CareerCaseStudyCard from '../career-case-study-card';

let mockLanguage = 'ko';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { title?: string }) => {
      if (key === 'detail.viewed') return 'Viewed';
      return mockLanguage === 'en'
        ? `${options?.title} viewed status`
        : `${options?.title} 읽음 상태`;
    },
    i18n: { language: mockLanguage },
  }),
}));

jest.mock('@/components/shared/career-link-copy-button', () => ({
  __esModule: true,
  default: () => <button type='button'>링크 복사</button>,
}));

const project: CareerProject = {
  id: 1,
  title: '사전과제 AI 검토 자동화',
  description: '매주 접수되는 사전과제를 자동으로 검토합니다.',
  caseStudy: {
    context: '채용 검토를 자동화해야 했습니다.',
    action: ['자동 검토 파이프라인을 구축했습니다.'],
  },
};

const props = {
  slug: 'cdri' as const,
  project,
  index: 0,
  total: 1,
  onViewedChange: jest.fn(),
  linkCopyText: {
    projectLabel: '케이스 스터디 링크 복사',
    projectSuccess: '케이스 스터디 링크를 복사했어요',
  },
};

describe('CareerCaseStudyCard', () => {
  beforeEach(() => {
    mockLanguage = 'ko';
    jest.clearAllMocks();
  });

  it('Viewed 체크 시 본문을 제거하고 해제하면 다시 표시한다', async () => {
    const user = userEvent.setup();
    const onViewedChange = jest.fn();
    const { rerender } = render(
      <CareerCaseStudyCard {...props} viewed={false} onViewedChange={onViewedChange} />
    );

    await user.click(screen.getByRole('checkbox', { name: '사전과제 AI 검토 자동화 읽음 상태' }));
    expect(onViewedChange).toHaveBeenCalledWith(1, true);

    rerender(<CareerCaseStudyCard {...props} viewed onViewedChange={onViewedChange} />);

    expect(screen.queryByText(/매주 접수되는 사전과제/)).not.toBeInTheDocument();
    expect(screen.getByText('사전과제 AI 검토 자동화')).toBeInTheDocument();

    rerender(<CareerCaseStudyCard {...props} viewed={false} onViewedChange={onViewedChange} />);

    expect(screen.getByText(/매주 접수되는 사전과제/)).toBeInTheDocument();
  });

  it('영문 checkbox 레이블을 제공한다', () => {
    mockLanguage = 'en';

    render(
      <CareerCaseStudyCard {...props} project={careerMockData.en.cdri.projects[0]} viewed={false} />
    );

    expect(
      screen.getByRole('checkbox', {
        name: 'Pre-assignment AI Review Automation viewed status',
      })
    ).toBeInTheDocument();
  });
});
