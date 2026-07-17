import { render, screen } from '@testing-library/react';

import CompanyOverview from '../company-overview';

const overview = {
  contribution: '채용과 개발 운영을 자동화했습니다.',
  achievements: ['검토 시간을 30% 단축', 'AI 리뷰를 월 60회 적용'],
};

it('역할, 전반적 기여, 주요 성과를 구조화된 패널로 표시한다', () => {
  render(<CompanyOverview role='Frontend Developer' overview={overview} language='ko' />);

  expect(screen.getByText('// 회사 개요')).toBeInTheDocument();
  expect(screen.getByText('역할')).toBeInTheDocument();
  expect(screen.getByText('전반적 기여')).toBeInTheDocument();
  expect(screen.getByText('주요 성과')).toBeInTheDocument();
  expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  expect(screen.getByText('검토 시간을 30% 단축')).toBeInTheDocument();
});

it('개요가 없으면 아무것도 렌더링하지 않는다', () => {
  const { container } = render(
    <CompanyOverview role='Frontend Developer' overview={undefined} language='en' />
  );

  expect(container).toBeEmptyDOMElement();
});

it('영문 라벨을 표시한다', () => {
  render(<CompanyOverview role='Frontend Developer' overview={overview} language='en' />);

  expect(screen.getByText('// Company Overview')).toBeInTheDocument();
  expect(screen.getByText('Contribution')).toBeInTheDocument();
  expect(screen.getByText('Key Achievements')).toBeInTheDocument();
});

it('전반적 기여가 비어 있으면 해당 블록을 표시하지 않는다', () => {
  render(
    <CompanyOverview
      role='Frontend Developer'
      overview={{ ...overview, contribution: '' }}
      language='ko'
    />
  );

  expect(screen.queryByText('전반적 기여')).not.toBeInTheDocument();
});

it('주요 성과가 비어 있으면 해당 블록과 목록 항목을 표시하지 않는다', () => {
  const { container } = render(
    <CompanyOverview
      role='Frontend Developer'
      overview={{ ...overview, achievements: [] }}
      language='ko'
    />
  );

  expect(screen.queryByText('주요 성과')).not.toBeInTheDocument();
  expect(container.querySelectorAll('li')).toHaveLength(0);
});

it('주요 성과 목록에 불릿 스타일을 적용한다', () => {
  const { container } = render(
    <CompanyOverview role='Frontend Developer' overview={overview} language='ko' />
  );

  expect(container.querySelector('ul')).toHaveClass('list-disc');
});
