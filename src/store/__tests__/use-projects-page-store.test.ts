import { renderHook, act } from '@testing-library/react';

import { useProjectsPageStore, projectsPageStore } from '@/store/use-projects-page-store';

const techList: string[] = ['react'];

describe('ProjectsPageStore 테스트', () => {
  beforeEach(() => {
    projectsPageStore.setState({
      selectedTechs: techList,
    });
  });

  it('초기 상태에서 모든 tech가 선택되어 있어야 함', () => {
    const { result } = renderHook(() => useProjectsPageStore(state => state.selectedTechs));

    expect(result.current).toEqual(techList);
  });

  it('toggleTech 호출 시 tech가 제거되어야 함', () => {
    const tech = 'react';

    const { result } = renderHook(() =>
      useProjectsPageStore(state => ({
        selectedTechs: state.selectedTechs,
        toggleTech: state.toggleTech,
      }))
    );

    act(() => {
      result.current.toggleTech(tech);
    });

    expect(result.current.selectedTechs).not.toContain(tech);
  });
});
