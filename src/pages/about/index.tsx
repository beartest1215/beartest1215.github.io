import {
  SiReact,
  SiTailwindcss,
  SiVite,
  SiTypescript,
  SiShadcnui,
  SiLucide,
  SiAntdesign,
  SiSimpleicons,
  SiGithubactions,
} from "@icons-pack/react-simple-icons";
import { SectionTitle } from "@/components/section-title";
import { TechCard, type Tech } from "./tech-card";

/** 技术分类 */
interface TechCategory {
  /** 分组标题，如"前端"、"构建"、"图标库" */
  title: string;
  /** 该分组下的所有技术条目 */
  items: Tech[];
}

/** 站点技术栈，按类别分组 */
const techStack: TechCategory[] = [
  {
    title: "前端",
    items: [
      {
        name: "React",
        version: "19",
        description: "UI 构建库",
        url: "https://react.dev",
        icon: SiReact,
      },
      {
        name: "Tailwind CSS",
        version: "4",
        description: "原子化 CSS 框架",
        url: "https://tailwindcss.com",
        icon: SiTailwindcss,
      },
      {
        name: "shadcn/ui",
        version: "4",
        description: "UI 组件集合",
        url: "https://ui.shadcn.com",
        icon: SiShadcnui,
      },
    ],
  },
  {
    title: "构建",
    items: [
      {
        name: "Vite",
        version: "8",
        description: "构建工具与开发服务器",
        url: "https://vite.dev",
        icon: SiVite,
      },
      {
        name: "TypeScript",
        version: "6",
        description: "类型安全的 JavaScript",
        url: "https://www.typescriptlang.org",
        icon: SiTypescript,
      },
      {
        name: "GitHub Actions",
        description: "CI/CD 自动构建部署",
        url: "https://docs.github.com/en/actions",
        icon: SiGithubactions,
      },
    ],
  },
  {
    title: "图标库",
    items: [
      {
        name: "lucide-react",
        version: "1",
        description: "通用图标库",
        url: "https://lucide.dev",
        icon: SiLucide,
      },
      {
        name: "@ant-design/icons",
        version: "6",
        description: "Ant Design 图标",
        url: "https://ant.design/components/icon",
        icon: SiAntdesign,
      },
      {
        name: "@icons-pack/react-simple-icons",
        version: "13",
        description: "Simple Icons 的 React 封装",
        url: "https://github.com/icons-pack/react-simple-icons",
        icon: SiSimpleicons,
      },
    ],
  },
];

function About() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-6">
      <section>
        <SectionTitle className="mb-4">关于本站</SectionTitle>
        <article className="prose prose-sm">
          <p>虽然会写点CSS，但美术水平相当有限，美观程度不足请见谅。</p>
          <p>这个网站也是建了拆拆了建，2023年心血来潮搞了一版完全自己编写组件的，随便塞了点小玩具进去；现在又完全推倒用 shadcn/ui 重做，也是一波三折。估计从这个版本开始就会真的往里面放一些文章之类的东西了。</p>
        </article>
      </section>

      <section>
        <SectionTitle className="mb-6">技术栈</SectionTitle>
        {techStack.map((category) => (
          <div key={category.title} className="mb-6 last:mb-0">
            <SectionTitle as="h3" variant="accent" className="mb-4">
              {category.title}
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default About;
