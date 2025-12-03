import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}


/**
 * Obtiene todos los posts en formato MDX, leyendo metadata (front-matter)
 * y devolviendo el contenido limpio sin YAML.
 *
 * Se usa en:
 * - generateStaticParams
 * - generateMetadata
 * - render del Blog con <CustomMDX source={post.content} />
 */
export function getPosts(postPath: string[]) {
  const basePath = path.join(process.cwd(), ...postPath);
  const files = fs.readdirSync(basePath);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(basePath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Extrae metadata + contenido limpio
      const { data: metadata, content } = matter(fileContent);

      return {
        slug: file.replace(/\.mdx$/, ""),
        metadata,
        content: content.trim(), // 👈 solo MDX, sin front-matter
      };
    });
}

