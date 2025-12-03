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
  Media,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, work, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { Metadata } from "next";
import { formatDate } from "@/utils/formatDate";

// ─────────────────────────────
//  GENERATE STATIC PARAMS
// ─────────────────────────────
export async function generateStaticParams() {
  const works = getWorks(["src", "app", "work", "posts"]);
  return works.map((work) => ({ slug: work.slug }));
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

  const works = getWorks(["src", "app", "work", "posts"]);
  const workItem = works.find((w) => w.slug === slug);

  if (!workItem) return {};

  return Meta.generate({
    title: workItem.metadata.title,
    description: workItem.metadata.summary,
    baseURL,
    image:
      workItem.metadata.image ||
      `/api/og/generate?title=${encodeURIComponent(
        workItem.metadata.title
      )}`,
    path: `${work.path}/${workItem.slug}`,
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

  const works = getWorks(["src", "app", "work", "posts"]);
  const workItem = works.find((w) => w.slug === slug);

  if (!workItem) return notFound();

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
            path={`${work.path}/${workItem.slug}`}
            title={workItem.metadata.title}
            description={workItem.metadata.summary}
            datePublished={workItem.metadata.publishedAt}
            dateModified={workItem.metadata.publishedAt}
            image={
              workItem.metadata.image ||
              `/api/og/generate?title=${encodeURIComponent(
                workItem.metadata.title
              )}`
            }
            author={{
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />

          {/* Header */}
          <Column
            maxWidth="s"
            gap="16"
            horizontal="center"
            align="center"
          >
            <SmartLink href="/work">
              <Text variant="label-strong-m">Work</Text>
            </SmartLink>

            {workItem.metadata.publishedAt && (
              <Text
                variant="body-default-xs"
                onBackground="neutral-weak"
                marginBottom="12"
              >
                {formatDate(workItem.metadata.publishedAt)}
              </Text>
            )}

            <Heading variant="display-strong-m">
              {workItem.metadata.title}
            </Heading>
          </Column>

          {/* Featured Image */}
          {workItem.metadata.image && (
            <Media
              src={workItem.metadata.image}
              alt={workItem.metadata.title}
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
            <CustomMDX source={workItem.content} />
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
