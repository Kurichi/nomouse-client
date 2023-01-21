type ElementType =
  | 'plane'
  | 'bullet'
  | 'number'
  | 'title'
  | 'text'
  | 'box'
  | 'triangle'
  | 'media'
  | 'note'
  | 'code-block'
  | 'item'

type YPositionType = 'top' | 'bottom' | 'center'
type XPositionType = 'left' | 'right' | 'center'

interface Size {
  width?: string
  height?: string
}

interface Position {
  x?: string | XPositionType
  y?: string | YPositionType
}

export interface SlideElement {
  type: ElementType | null
  text: string

  color?: string
  size?: Size | string
  position?: Position
}

interface SlideInfo {
  title: string
  author: User
  theme: string
  createdAt: Date
  updatedAt: Date
}

interface Slide {
  id: string;
  thumbnail: string;
  code: string;
  compiled_data: string;
  google_uid: string;
  created_at: Data;
  updated_at: Data;
}
