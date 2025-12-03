import BrandLogo from "@/components/BrandLogo";
import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Alexia",
  lastName: "Aurrecochea",
  name: `Alexia Aurrecochea`,
  role: "Ingeniera en Datos Jr.",
  avatar: "/images/yo.jpg",
  email: "alexiaurrecochea@gmail.com",
  location: "America/Montevideo",
  languages: ["Español", "Inglés", "Alemán"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Acceso al portafolio de {person.firstName}</>,
  description: <>Recibe novedades sobre mis proyectos, aprendizajes y avances en Ingeniería en IA y Ciencia de Datos.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/aleaurre",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/alexia-aurrecochea/?locale=es_ES",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/aleaurre/",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Inicio",
  title: `${person.name} – Portafolio`,
  description: `Portafolio ilustrativo de proyectos como ${person.role}`,
  headline: <>Datos, ingeniería e inteligencia para resolver problemas reales.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">UCU</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Estudiante de Ingeniería en IA y Ciencia de Datos
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      Soy Alexia, estudiante de Ingeniería en IA y Ciencia de Datos. Me apasiona diseñar y mejorar pipelines,
      exploración de datos, modelado y automatización de procesos.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Sobre mí",
  title: `Sobre mí – ${person.name}`,
  description: `Conoce a ${person.name}, ${person.role} en ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introducción",
    description: (
      <>
        Alexia es una estudiante uruguaya enfocada en transformar datos en soluciones inteligentes.
        Trabaja con pipelines, bases de datos y machine learning,
        integrando ingeniería, negocio y analítica avanzada.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experiencia Laboral",
    experiences: [
      {
        company: "Practia",
        timeframe: "2024",
        role: "Desarrolladora e Investigación en IA (Pasantía)",
        achievements: [
          <>Implementación de soluciones de Inteligencia Artificial aplicadas a casos reales.</>,
          <>Desarrollo, pruebas y puesta en producción de modelos predictivos.</>,
          <>Trabajo colaborativo bajo metodologías ágiles y buenas prácticas de ingeniería.</>,
        ],
        images: [],
      },
      {
        company: "Universidad de la República (UDELAR)",
        timeframe: "2023 - Actualidad",
        role: "Investigación y desarrollo en Ciencia de Datos",
        achievements: [
          <>Participación en proyectos vinculados a automatización, limpieza y análisis de datos.</>,
          <>Colaboración interdisciplinaria en soluciones tecnológicas para investigación científica.</>,
        ],
        images: [],
      },
    ],
  },

  studies: {
    display: true,
    title: "Formación Académica",
    institutions: [
      {
        name: "Universidad Católica del Uruguay",
        description: <>Ingeniería en Inteligencia Artificial y Ciencia de Datos</>,
      },
      {
        name: "Github Education",
        description: <>Micro-Mentorship Program</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Habilidades Técnicas",
    skills: [
      {
        title: "Python & Machine Learning",
        description: <>Entrenamiento de modelos, análisis de datos y automatización de flujos.</>,
        tags: [
          { name: "Python", icon: "python" },
          { name: "Pandas", icon: "database" },
          { name: "Scikit-learn", icon: "database" },
        ],
        images: [],
      },
      {
        title: "Data Engineering",
        description: <>ETL, SQL, orquestación y calidad de datos.</>,
        tags: [
          { name: "SQL", icon: "database" },
          { name: "Prefect", icon: "database" },
          { name: "Docker", icon: "docker" },
        ],
        images: [],
      },
         {
      title: "Visualización de Datos",
      description: (
        <>Diseño de dashboards profesionales y comunicación efectiva de insights.</>
      ),
      tags: [
        { name: "Power BI", icon: "powerbi" },
        { name: "Tableau", icon: "tableau" },
        { name: "Excel", icon: "excel" },
      ],
      images: [],
    },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Portafolio",
  title: "Aplicaciones en Entornos Reales",
  description: `Explora los últimos proyectos y prácticas desarrolladas por ${person.name}`,
};

const work: Work = {
  path: "/work",
  label: "Proyectos",
  title: `Proyectos – ${person.name}`,
  description: `Aplicaciones y trabajos desarrollados por ${person.name}`,
};


export { person, social, newsletter, home, about, blog, work};
