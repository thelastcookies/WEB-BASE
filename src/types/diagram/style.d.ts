export type DiagramStyle = TextStyle & EdgeStyle & ShapeStyle & LabelStyle;

export interface TextStyle {
  text: string;
  'text.vertical': boolean;
  'text.align': 'left' | 'center' | 'right';
  'text.vAlign': 'top' | 'middle' | 'bottom';
  'text.color': string;
  'text.font': string;
}

export interface ShapeStyle {
  'shape.background': string | null;
  'shape.border.color': string;
  'shape.border.width': number;
  'shape.dash'?: boolean;
  'shape.dash.pattern'?: number[];
  'shape.dash.color'?: string;
}

export interface EdgeStyle {
  'edge.type': 'points' | 'h.v' | 'v.h';
  'edge.width': number;
  'body.color': string;
  'edge.dash'?: boolean;
  'edge.dash.pattern'?: number[];
  'edge.dash.color'?: string;
}

export interface LabelStyle {
  label: string;
  'label.color': string;
  'label.font': string;
  'label.offset.y': number;
  'label.position': number;
}
