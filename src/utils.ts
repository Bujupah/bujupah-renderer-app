import { config } from '@grafana/runtime';
import { RenderUrlParams } from 'types';

export const constructURL = (params: RenderUrlParams) => {
  const dashboard = (window as any).grafanaRuntime.getDashboardSaveModel();
  const timeRange = (window as any).grafanaRuntime.getDashboardTimeRange();
  const runtimePanels = (window as any).grafanaRuntime.getPanelData();
  const _constructURL = ({
    type,
    uid = dashboard.uid,
    panels = Object.keys(runtimePanels),
    orgId = config.bootData.user.orgId,
    title = dashboard.title,
    description = '',
    logo,
    from = timeRange.from,
    to = timeRange.to,
    height,
    width,
    tz = dashboard.timezone,
    landscape,
    encoding,
  }: RenderUrlParams) => {
    tz = tz || tz === 'browser' ? Intl.DateTimeFormat().resolvedOptions().timeZone : tz;
    const { appUrl, appSubUrl } = config;
    const panelIds = panels.join(',');
    return `${appUrl}${appSubUrl}render/${type}/${uid}/${title}?orgId=${orgId}&from=${from}&to=${to}&panelId=${panelIds}&width=${width}&height=${height}&tz=${tz}&encoding=${encoding}&landscape=${landscape}&title=${title}&description=${description}&logo=${logo}`;
  };

  return _constructURL(params);
};
