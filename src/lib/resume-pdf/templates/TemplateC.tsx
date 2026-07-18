import { Link, Text, View } from '@react-pdf/renderer';

import { pdfStyles as s } from '../styles';
import type { ResumePdfDocumentData } from '../types';

export function TemplateC({ data }: { data: ResumePdfDocumentData }) {
  return (
    <View>
      <View style={s.compactHeader}>
        <View>
          <Text style={s.name}>{data.name}</Text>
          <Text style={s.title}>{data.title}</Text>
        </View>
        <Text style={s.contact}>
          {data.phone} · {data.email}
        </Text>
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>소개</Text>
        <Text style={s.text}>{data.bio}</Text>
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>기술 스택</Text>
        <View style={s.pills}>
          {data.skills.map(x => (
            <Text key={x} style={s.pill}>
              {x}
            </Text>
          ))}
        </View>
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>경력</Text>
        <View style={s.timeline}>
          {data.careers.map(c => (
            <View key={c.id} style={s.timelineItem}>
              <View style={s.careerHead}>
                <Link src={c.href} style={[s.careerName, s.link]}>
                  {c.name} ↗
                </Link>
                <Text style={s.muted}>{c.period}</Text>
              </View>
              <Text>{c.role}</Text>
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
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>프로젝트</Text>
        <Link src={data.portfolio.href} style={s.link}>
          {data.portfolio.name} ↗
        </Link>
      </View>
    </View>
  );
}
