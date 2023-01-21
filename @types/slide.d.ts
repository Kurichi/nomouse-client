type Basic = 'plane' | 'bullet' | 'number';
type ElementType =
  | Basic
  | 'title'
  | 'text'
  | 'box'
  | 'triangle'
  | 'media'
  | 'note'
  | 'code-block'
  | 'item';

interface Size {
  width?: number | string;
  height?: number | string;
}

interface Position {
  x?: number | string;
  y?: number | string;
}

interface SlideElement {
  type: ElementType | null;
  text: string;

  color?: string;
  size?: Size | string;
  position?: Position | string;
}

interface SlideInfo {
  title: string;
  author: User;
  theme: string;
  createdAt: Date;
  updatedAt: Date;
}
