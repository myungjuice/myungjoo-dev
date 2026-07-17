import { render, screen } from '@testing-library/react';

import { careerMockData } from '@/constants/career';

import CareerSummaryCaseStudy from '../career-summary-case-study';
import CareerSummaryCompany from '../career-summary-company';

describe('CareerSummaryCompany', () => {
  it('회사 개요와 케이스 스터디의 상세 항목을 표시한다', () => {
    render(<CareerSummaryCompany company={careerMockData.ko.cdri} language='ko' />);

    expect(screen.getByText('전반적 기여')).toBeInTheDocument();
    expect(screen.getByText('주요 성과')).toBeInTheDocument();
    expect(screen.getByText('사전과제 AI 검토 자동화')).toBeInTheDocument();
    expect(screen.getAllByText('상황').length).toBeGreaterThan(0);
    expect(screen.getAllByText('문제').length).toBeGreaterThan(0);
    expect(screen.getAllByText('실행').length).toBeGreaterThan(0);
    expect(screen.getAllByText('성과').length).toBeGreaterThan(0);
    expect(screen.getAllByText('회고').length).toBeGreaterThan(0);
  });
});

describe('CareerSummaryCaseStudy', () => {
  it('값이 없는 개요와 케이스 스터디 항목의 라벨을 표시하지 않는다', () => {
    const project = { id: 99, title: '빈 항목', description: '설명', caseStudy: {} };
    render(<CareerSummaryCaseStudy project={project} language='en' />);

    expect(screen.queryByText('Context')).not.toBeInTheDocument();
    expect(screen.queryByText('Actions')).not.toBeInTheDocument();
  });
});
