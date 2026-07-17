import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { careerMockData } from '@/constants/career';
import i18n from '@/lib/i18n/client';
import { careerPageStore } from '@/store/use-career-page-store';

import CareerSummaryCaseStudy from '../career-summary-case-study';
import CareerSummaryCompany from '../career-summary-company';
import CareerSummaryDialog from '../career-summary-dialog';

describe('CareerSummaryDialog', () => {
  beforeEach(async () => {
    careerPageStore.setState({ selectedFilter: ['cdri', 'supertree', 'd.dive', 'ellen'] });
    await i18n.changeLanguage('ko');
  });

  it('부분 필터는 선택된 회사만 기준 순서대로 모달에 표시한다', async () => {
    careerPageStore.setState({ selectedFilter: ['supertree', 'cdri'] });
    const user = userEvent.setup();
    render(<CareerSummaryDialog />);

    await user.click(screen.getByRole('button', { name: '한 화면으로 보기' }));

    expect(screen.getByText('선택된 경력 2개')).toBeInTheDocument();
    expect(screen.getAllByTestId('career-summary-company')).toHaveLength(2);
    expect(screen.getAllByTestId('career-summary-company')[0]).toHaveTextContent('㈜ 씨디알아이');
    expect(screen.getAllByTestId('career-summary-company')[1]).toHaveTextContent('㈜ 수퍼트리');
  });

  it('빈 필터는 전체 회사 4개를 표시한다', async () => {
    careerPageStore.setState({ selectedFilter: [] });
    const user = userEvent.setup();
    render(<CareerSummaryDialog />);

    await user.click(screen.getByRole('button', { name: '한 화면으로 보기' }));

    expect(screen.getAllByTestId('career-summary-company')).toHaveLength(4);
  });

  it('영어 상태에서는 영어 트리거와 모달 문구를 표시한다', async () => {
    await i18n.changeLanguage('en');
    const user = userEvent.setup();
    render(<CareerSummaryDialog />);

    await user.click(screen.getByRole('button', { name: 'View in one screen' }));

    expect(screen.getByRole('heading', { name: 'Career Summary' })).toBeInTheDocument();
    expect(screen.getByText('4 selected careers')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('요약 모달 문구는 career 번역 리소스에서 제공한다', () => {
    expect(i18n.t('career:summary.trigger')).toBe('한 화면으로 보기');
    expect(i18n.t('career:summary.close')).toBe('닫기');
    expect(i18n.t('career:summary.caseStudy.context')).toBe('상황');
  });

  it('닫기 버튼을 클릭하면 모달 내용을 숨긴다', async () => {
    const user = userEvent.setup();
    render(<CareerSummaryDialog />);

    await user.click(screen.getByRole('button', { name: '한 화면으로 보기' }));
    const closeButton = screen.getByRole('button', { name: '닫기' });

    expect(closeButton).toHaveClass('size-6');
    await user.click(closeButton);

    expect(screen.queryByRole('heading', { name: '경력 요약' })).not.toBeInTheDocument();
  });

  it('ESC 키를 누르면 모달 내용을 숨긴다', async () => {
    const user = userEvent.setup();
    render(<CareerSummaryDialog />);

    await user.click(screen.getByRole('button', { name: '한 화면으로 보기' }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('heading', { name: '경력 요약' })).not.toBeInTheDocument();
  });

  it('배경을 클릭하면 모달 내용을 숨긴다', async () => {
    const user = userEvent.setup();
    render(<CareerSummaryDialog />);

    await user.click(screen.getByRole('button', { name: '한 화면으로 보기' }));
    const overlay = document.querySelector('[data-state="open"].inset-0');

    expect(overlay).toBeInTheDocument();
    await user.click(overlay!);

    expect(screen.queryByRole('heading', { name: '경력 요약' })).not.toBeInTheDocument();
  });
});

describe('CareerSummaryCompany', () => {
  it('회사 개요와 케이스 스터디의 상세 항목을 표시한다', () => {
    render(<CareerSummaryCompany company={careerMockData.ko.cdri} />);

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
    render(<CareerSummaryCaseStudy project={project} />);

    expect(screen.queryByText('Context')).not.toBeInTheDocument();
    expect(screen.queryByText('Actions')).not.toBeInTheDocument();
  });
});
