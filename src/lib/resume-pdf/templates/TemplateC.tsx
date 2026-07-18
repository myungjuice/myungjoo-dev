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
        <Link src={`${data.baseUrl}/career`} style={s.link}>
          {l.detailCta} ↗
        </Link>
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
              {c.slogan ? <Text style={s.text}>{c.slogan}</Text> : null}
              {c.contribution ? <Text style={s.text}>{c.contribution}</Text> : null}
              {c.achievements.length > 0
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
                  {data.format === 'detailed' && p.caseStudy ? (
                    <View>
                      {p.caseStudy.context ? (
                        <Text style={s.text}>{p.caseStudy.context}</Text>
                      ) : null}
                      {p.caseStudy.problem ? (
                        <Text style={s.text}>{p.caseStudy.problem}</Text>
                      ) : null}
                      {p.caseStudy.action?.map(item => (
                        <Text key={item} style={s.project}>
                          • {item}
                        </Text>
                      ))}
                      {p.caseStudy.impact?.map(item => (
                        <Text key={item} style={s.project}>
                          • {item}
                        </Text>
                      ))}
                      {p.caseStudy.reflection ? (
                        <Text style={s.text}>{p.caseStudy.reflection}</Text>
                      ) : null}
                    </View>
                  ) : null}
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
        {data.links.map(link => (
          <Link key={link.label} src={link.href} style={s.link}>
            {link.label} ↗
          </Link>
        ))}
      </View>
    </View>
  );
}
