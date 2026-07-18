import { Link, Text, View } from '@react-pdf/renderer';

import { pdfStyles as s } from '../styles';
import type { ResumePdfDocumentData } from '../types';

export function TemplateA({ data }: { data: ResumePdfDocumentData }) {
  return (
    <View>
      <View style={s.header}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.title}>{data.title}</Text>
        <Text style={s.contact}>
          {data.phone} · {data.email} ·{' '}
          <Link style={s.link} src={data.baseUrl}>
            {data.baseUrl}
          </Link>
        </Text>
      </View>
      <Text style={s.text}>{data.bio}</Text>
      <View style={s.section}>
        <Text style={s.sectionTitle}>기술 스택</Text>
        <View style={s.pills}>
          {data.skills.map(skill => (
            <Text key={skill} style={s.pill}>
              {skill}
            </Text>
          ))}
        </View>
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>경력</Text>
        {data.careers.map(c => (
          <View key={c.id} style={s.career}>
            <View style={s.careerHead}>
              <Link src={c.href} style={[s.careerName, s.link]}>
                {c.name} ↗
              </Link>
              <Text style={s.muted}>{c.period}</Text>
            </View>
            <Text>{c.role}</Text>
            {c.achievements.map(a => (
              <Text key={a} style={s.project}>
                • {a}
              </Text>
            ))}
            {c.projects.map(p => (
              <View key={p.id} style={s.project}>
                <Link src={p.href} style={[s.projectName, s.link]}>
                  {p.title} ↗
                </Link>
                <Text>{p.description}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>프로젝트</Text>
        <Link src={data.portfolio.href} style={s.link}>
          {data.portfolio.name} ↗
        </Link>
        <Text>{data.portfolio.description}</Text>
      </View>
    </View>
  );
}
