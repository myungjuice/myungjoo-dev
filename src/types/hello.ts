import type { Language } from './language';

export type FetchHelloParams = {
  lang: Language;
};

export type HelloResponse = {
  lang: string;
  text01: string;
  name: string;
  text02: string;
  code: {
    title: string;
    text01: string;
    text02: string;
    email_text: string;
    github_text: string;
    email_button_text: string;
  };
};
