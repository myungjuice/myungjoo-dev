import { Link, Text, View } from '@react-pdf/renderer';

import { pdfStyles as s } from '../styles';
import type { ResumePdfDocumentData } from '../types';

export function TemplateB({ data }: { data: ResumePdfDocumentData }) {
  return (
    <View style={s.panelPage}>
      <View style={s.panel}>
        <Text style={s.name}>{data.name}</Text>
        <Text style={s.title}>{data.title}</Text>
        <Text style={s.contact}>{data.phone}</Text>
        <Text style={s.contact}>{data.email}</Text>
        <Link src={data.baseUrl} style={s.link}>
          {data.baseUrl}
        </Link>
        <View style={s.section}>
          <Text style={s.sectionTitle}>기술 스택</Text>
          {data.skills.map(x => (
            <Text key={x} style={s.pill}>
              {x}
            </Text>
          ))}
        </View>
      </View>
      <View style={s.panelBody}>
        <Text style={s.text}>{data.bio}</Text>
        <View style={s.section}>
          <Text style={s.sectionTitle}>경력</Text>
          {data.careers.map(c => (
            <View key={c.id} style={s.career}>
              <Link src={c.href} style={[s.careerName, s.link]}>
                {c.name} ↗
              </Link>
              <Text style={s.muted}>
                {c.period} · {c.role}
              </Text>
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
    </View>
  );
}
