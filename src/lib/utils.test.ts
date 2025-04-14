import { cn } from './utils';

describe('cn 함수 (className 유틸리티)', () => {
  it('문자열 클래스들을 공백으로 잘 병합한다', () => {
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
  });

  it('중복된 Tailwind 클래스는 가장 마지막 것이 적용된다', () => {
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('falsy 값은 무시된다', () => {
    expect(cn('text-sm', null, undefined, false, '', 'font-bold')).toBe('text-sm font-bold');
  });

  it('객체 형태의 조건부 클래스도 올바르게 병합된다', () => {
    expect(cn({ 'text-sm': true, 'text-lg': false }, 'font-medium')).toBe('text-sm font-medium');
  });

  it('tailwind-merge에 의해 충돌 클래스는 병합된다 (예: px-2 + px-4 → px-4)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
