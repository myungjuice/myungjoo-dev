import React from 'react';

type PrimitiveProps = React.PropsWithChildren<Record<string, unknown>>;

function primitive(name: string) {
  const Component = ({ children, ...props }: PrimitiveProps) =>
    React.createElement(name, props, children);
  Component.displayName = name;
  return Component;
}

export const Document = primitive('div');
export const Page = primitive('div');
export const Link = primitive('a');
export const Text = primitive('span');
export const View = primitive('div');

export const PDFViewer = ({ children, ...props }: PrimitiveProps) =>
  React.createElement('div', { 'data-testid': 'pdf-viewer', ...props }, children);

export const StyleSheet = {
  create: <T,>(styles: T): T => styles,
};

export const Font = {
  register: () => undefined,
};

export const pdf = () => ({
  toBlob: async () => new Blob(['pdf'], { type: 'application/pdf' }),
});
