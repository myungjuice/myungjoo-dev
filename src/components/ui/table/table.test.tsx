import { render, screen, within } from '@testing-library/react';

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';

describe('Table 컴포넌트', () => {
  it('헤더와 셀 포함한 테이블이 렌더링된다', () => {
    render(
      <Table>
        <TableCaption>회원 목록</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>홍길동</TableCell>
            <TableCell>hong@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText('회원 목록')).toBeInTheDocument();
    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByText('이메일')).toBeInTheDocument();
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();
  });

  it('Table 컴포넌트가 div로 감싸져 있다', () => {
    render(<Table />);
    const wrapper = screen.getByTestId('table-container');
    expect(within(wrapper).getByRole('table')).toBeInTheDocument();
  });
});
