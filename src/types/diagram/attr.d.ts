export type DiagramAttr =
  NodeLabelAttr
  & NodeUnitAttr
  & ButtonLinkAttr
  & NodeColorAttr
  & NodeColor2Attr
  & NodeBackgroundColorAttr
  & NodeBackground2ColorAttr
  & NodeBorderWidthAttr
  & NodeBorderColorAttr
  & NodeDirectionVerticalAttr
  & NodeDirectionHorizontalAttr
  & NodeDirectionAttr
  & NodeTagAttr
  & NodeTypeSwitchReverseAttr
  & NodeMaxMinAttr
  & NodeTagCBAttr
  & NodeTagCTMPAttr
  & TableAttr
  ;

export interface NodeLabelAttr {
  'node.label'?: string;
}

export interface NodeUnitAttr {
  'node.unit'?: string;
}

export interface ButtonLinkAttr {
  'button.link'?: string;
}

export interface NodeColorAttr {
  'node.color'?: string;
}

export interface NodeColor2Attr {
  'node.color2'?: string;
}

export interface NodeBackgroundColorAttr {
  'node.background.color'?: string;
}

export interface NodeBackground2ColorAttr {
  'node.background.color2'?: string;
}

export interface NodeBorderWidthAttr {
  'node.border.width'?: number;
}

export interface NodeBorderColorAttr {
  'node.border.color'?: string;
}

export interface NodeDirectionVerticalAttr {
  'node.direction.vertical'?: 'up' | 'down';
}

export interface NodeDirectionHorizontalAttr {
  'node.direction.horizontal'?: 'right' | 'left';
}

export interface NodeDirectionAttr {
  'node.direction'?: 'up' | 'right' | 'down' | 'left';
}

export interface NodeTagAttr {
  'node.tag'?: string;
}

export interface NodeTypeSwitchReverseAttr {
  'node.type.switch.reverse'?: boolean;
}

export interface NodeMaxMinAttr {
  'node.value.min'?: number;
  'node.value.max'?: number;
}

export interface NodeTagCBAttr {
  'node.tag.CB'?: string;
  'node.tag.drawout'?: string;
}

export interface NodeTagCTMPAttr {
  // Closing Measurement Point
  'node.tag.cmp'?: string;
  // Trip Measurement Point
  'node.tag.tmp'?: string;
}

export interface TableAttr {
  'node.table.columns': string;
  'node.table.dataSource': string;
  'node.table.head.background': string;
  'node.table.body.background': string;
  'node.table.border.width': number;
  'node.table.border.color': string;
  'node.table.head.height': number;
  'node.table.body.height': number;
  'node.table.head.show': boolean;
  'node.table.head.merge': boolean;
}
