import { renderHook, act } from '@testing-library/react';

import { techList } from '@/constants/projects';
import { useProjectsPageStore, projectsPageStore } from '@/store/use-projects-page-store';

describe('ProjectsPageStore 테스트', () => {
  beforeEach(() => {
    projectsPageStore.setState({
      selectedTechs: [...Object.keys(techList)] as (keyof typeof techList)[],
    });
  });

  it('초기 상태에서 모든 tech가 선택되어 있어야 함', () => {
    const { result } = renderHook(() => useProjectsPageStore(state => state.selectedTechs));

    expect(result.current).toEqual(Object.keys(techList));
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

  it('toggleTech 두 번 호출 시 다시 추가되어야 함', () => {
    const tech = 'python';

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

    act(() => {
      result.current.toggleTech(tech);
    });

    expect(result.current.selectedTechs).toContain(tech);
  });
});
