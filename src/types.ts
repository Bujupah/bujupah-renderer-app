import { DateTime } from '@grafana/data';

export enum RenderType {
  Dashboard = 'd',
  Panel = 'd-solo',
}
export enum RenderEncoding {
  PDF = 'pdf',
  PNG = 'png',
}

export enum RenderOrientation {
  Portrait = 'portrait',
  Landscape = 'landscape',
}

export interface RenderUrlParams {
  type: RenderType;
  encoding: RenderEncoding;

  title?: string;
  description?: string;
  logo?: string;

  uid?: string;
  orgId?: any;
  from?: string | DateTime | undefined;
  to?: string | DateTime | undefined;
  panels?: any[];
  width?: string;
  height?: string;
  landscape?: boolean;
  tz?: string;
}
