declare module "*.css";

declare module "petite-vue" {
  export function createApp(app: any): {
    mount(selector: string): void;
  };
}

declare module "couleurs" {
  const couleurs: {
    fg: (text: string, r: number, g: number, b: number) => string;
  };
  export = couleurs;
}

declare module "terminal-char-width" {
  const terminalCharWidth: number;
  export = terminalCharWidth;
}

declare module "window-size" {
  const windowSize: {
    width: number;
    height: number;
  };
  export = windowSize;
}
