type Basic = 'plane' | 'bullet' | 'number';
type ElementType =
  | Basic
  | 'title'
  | 'text'
  | 'box'
  | 'tirangle'
  | 'media'
  | 'note'
  | 'code-block';

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
