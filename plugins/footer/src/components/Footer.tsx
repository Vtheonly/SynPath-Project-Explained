import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { classNames } from "../util/lang";
import style from "./styles/footer.scss";

export interface FooterOptions {
  links: Record<string, string>;
}

/**
 * SynPath-Project-Explained footer.
 * Local plugin (vendored) so the site attribution reads "SynPath-Project-Explained |
 * Created by vtheonly" instead of the default template credit.
 */
export default ((opts?: FooterOptions) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear();
    const links = opts?.links ?? [];
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          <a href="https://github.com/Vtheonly/SynPath-Project-Explained">
            SynPath-Project-Explained
          </a>{" "}
          | Created by <a href="https://github.com/Vtheonly">vtheonly</a> &copy; {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    );
  };

  Footer.css = style;
  return Footer;
}) satisfies QuartzComponentConstructor;

// re-export for type parity with the upstream footer plugin
export { classNames };
