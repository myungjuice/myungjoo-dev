import { Link, Text, View } from '@react-pdf/renderer';

import { pdfStyles as s } from '../styles';
import { resumeLabels, type ResumePdfDocumentData } from '../types';

export function TemplateC({ data }: { data: ResumePdfDocumentData }) {
  const l = resumeLabels[data.language];
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
        <Text style={s.sectionTitle}>{l.intro}</Text>
        <Text style={s.text}>{data.bio}</Text>
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>{l.skills}</Text>
        <View style={s.pills}>
          {data.skills.map(x => (
            <Text key={x} style={s.pill}>
              {x}
            </Text>
          ))}
        </View>
      </View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>{l.careers}</Text>
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
              {data.format === 'detailed' && c.contribution ? (
                <Text style={s.text}>{c.contribution}</Text>
              ) : null}
              {data.format === 'detailed' && c.achievements.length > 0
                ? c.achievements.map(a => (
                    <Text key={a} style={s.project}>
                      • {a}
                    </Text>
                  ))
                : null}
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
        <Text style={s.sectionTitle}>{l.projects}</Text>
        <Link src={data.portfolio.href} style={s.link}>
          {data.portfolio.name} ↗
        </Link>
        <Link src={data.portfolio.githubUrl} style={s.link}>
          GitHub ↗
        </Link>
      </View>
    </View>
  );
}
