import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import {
  Meta,
  Schema,
  Column,
  Heading,
  HeadingNav,
  Row,
  Text,
  SmartLink,
  Media
} from "@once-ui-system/core";
import { baseURL, about, work, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";
import { formatDate } from "@/utils/formatDate";

// ─────────────────────────────
//  GENERATE STATIC PARAMS
// ─────────────────────────────
export async function generateStaticParams() {
  const works = getPosts(["src", "app", "work", "posts"]);
  return works.map((item) => ({ slug: item.slug }));
}

// ─────────────────────────────
//  GENERATE METADATA
// ─────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const works = getPosts(["src", "app", "work", "posts"]);
  const item = works.find((i) => i.slug === slug);

  if (!item) return {};

  return Meta.generate({
    title: item.metadata.title,
    description: item.metadata.summary,
    baseURL,
    image:
      item.metadata.image ||
      `/api/og/generate?title=${encodeURIComponent(item.metadata.title)}`,
    path: `${work.path}/${item.slug}`,
  });
}

// ─────────────────────────────
//  WORK PAGE
// ─────────────────────────────
export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const works = getPosts(["src", "app", "work", "posts"]);
  const item = works.find((i) => i.slug === slug);

  if (!item) return notFound();

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column
          as="section"
          maxWidth="m"
          horizontal="center"
          gap="l"
          paddingTop="24"
        >
          <Schema
            as="creativeWork"
            baseURL={baseURL}
            path={`${work.path}/${item.slug}`}
            title={item.metadata.title}
            description={item.metadata.summary}
            datePublished={item.metadata.publishedAt}
            dateModified={item.metadata.publishedAt}
            image={
              item.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(item.metadata.title)}`
            }
            author={{
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />

          {/* Header */}
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/work">
              <Text variant="label-strong-m">Work</Text>
            </SmartLink>

            {item.metadata.publishedAt && (
              <Text
                variant="body-default-xs"
                onBackground="neutral-weak"
                marginBottom="12"
              >
                {formatDate(item.metadata.publishedAt)}
              </Text>
            )}

            <Heading variant="display-strong-m">
              {item.metadata.title}
            </Heading>
          </Column>

          {/* Featured Image */}
          {item.metadata.image && (
            <Media
              src={item.metadata.image}
              alt={item.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}

          {/* Content */}
          <Column as="article" maxWidth="s">
            <CustomMDX source={item.content} />
          </Column>

          <ScrollToHash />
        </Column>
      </Row>

      {/* Side Navigation */}
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
