import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const dist = resolve("dist/index.html");
const html = readFileSync(dist, "utf8");
const serverBundle = new URL("../dist-ssr/prerender.js", import.meta.url);
const { renderPath } = (await import(serverBundle.href)) as {
  renderPath: (path: string) => string;
};

const pages = [
  {
    route: "/ar/",
    path: "ar/index.html",
    lang: "ar",
    dir: "rtl",
    title: "الورشة",
    description: "ورشة مفتوحة لبناء منتجات حقيقية على مدى تمانية أسابيع.",
  },
  {
    route: "/en/",
    path: "en/index.html",
    lang: "en",
    dir: "ltr",
    title: "ElWarsha",
    description: "An open workshop for building real products over eight weeks.",
  },
  {
    route: "/ar/initiative/",
    path: "ar/initiative/index.html",
    lang: "ar",
    dir: "rtl",
    title: "المبادرة — الورشة",
    description: "الورشة مبادرة عملية تحاكي الانضمام إلى فريق برمجي حقيقي.",
  },
  {
    route: "/en/initiative/",
    path: "en/initiative/index.html",
    lang: "en",
    dir: "ltr",
    title: "Initiative — ElWarsha",
    description: "A practical initiative that simulates joining a real software team.",
  },
  {
    route: "/ar/roadmap/",
    path: "ar/roadmap/index.html",
    lang: "ar",
    dir: "rtl",
    title: "الخطة — الورشة",
    description: "خطة الورشة التعليمية على مدار تمانية أسابيع.",
  },
  {
    route: "/en/roadmap/",
    path: "en/roadmap/index.html",
    lang: "en",
    dir: "ltr",
    title: "Roadmap — ElWarsha",
    description: "The eight-week ElWarsha learning roadmap.",
  },
  {
    route: "/ar/participation/",
    path: "ar/participation/index.html",
    lang: "ar",
    dir: "rtl",
    title: "المشاركة — الورشة",
    description: "اعرف دورة المشاركة الأسبوعية في الورشة.",
  },
  {
    route: "/en/participation/",
    path: "en/participation/index.html",
    lang: "en",
    dir: "ltr",
    title: "Participation — ElWarsha",
    description: "Learn how the weekly ElWarsha participation cycle works.",
  },
  {
    route: "/ar/faq/",
    path: "ar/faq/index.html",
    lang: "ar",
    dir: "rtl",
    title: "الأسئلة — الورشة",
    description: "إجابات الأسئلة المتكررة عن مبادرة الورشة.",
  },
  {
    route: "/en/faq/",
    path: "en/faq/index.html",
    lang: "en",
    dir: "ltr",
    title: "FAQ — ElWarsha",
    description: "Answers to common questions about ElWarsha.",
  },
];

for (const page of pages) {
  const target = resolve("dist", page.path);
  const content = renderPath(page.route);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(
    target,
    html
      .replaceAll('lang="ar"', `lang="${page.lang}"`)
      .replaceAll('dir="rtl"', `dir="${page.dir}"`)
      .replaceAll("<title>الورشة</title>", `<title>${page.title}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
        `<meta name="description" content="${page.description}" />`,
      )
      .replace('<div id="root"></div>', `<div id="root">${content}</div>`),
  );
}

rmSync(resolve("dist-ssr"), { recursive: true, force: true });
