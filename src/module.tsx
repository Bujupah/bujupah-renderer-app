
import React from 'react';

import { AppPlugin, PluginExtensionPanelContext, PluginExtensionEventHelpers, PluginExtensionPoints } from '@grafana/data';
import { ExtensionModal, AppConfig } from 'components';
import { constructURL } from 'utils';
import { RenderEncoding, RenderType } from 'types';

import { getTemplateSrv } from '@grafana/runtime'

export const plugin = new AppPlugin<{}>()
  .configureExtensionLink({
    title: 'Export Dashboard',
    description: 'Export panel or dashboard as a file',
    category: 'Yet another renderer',
    extensionPointId: PluginExtensionPoints.CommandPalette,
    onClick(_, helpers: PluginExtensionEventHelpers<PluginExtensionPanelContext>) {
      helpers.openModal({
        title: 'Export Panel/Dashboard',
        width: 400,
        body: (props) => <ExtensionModal onDismiss={() => props.onDismiss?.()} />,
      })
    },
  })
  .configureExtensionLink({
    title: 'Export Dashboard to PNG',
    description: 'Export panel or dashboard as a file',
    category: 'Yet another renderer',
    extensionPointId: PluginExtensionPoints.CommandPalette,
    onClick(_, __) {
      const url = constructURL({
        type: RenderType.Dashboard,
        encoding: RenderEncoding.PNG,
        width: '1280',
        height: '720',
        landscape: true,
      })
      window.open(url, '_blank')

    },
  })
  .configureExtensionLink({
    title: 'Export Dashboard to PDF',
    description: 'Export panel or dashboard as a file',
    category: 'Yet another renderer',
    extensionPointId: PluginExtensionPoints.CommandPalette,
    onClick(_, __) {
      const url = constructURL({
        type: RenderType.Dashboard,
        encoding: RenderEncoding.PDF,
        logo: 'https://grafana.com/media/grafanacon/2024/banners/graphic-banner-logo.png',
        width: '1280',
        height: '720',
        landscape: true,
      })
      window.open(url, '_blank')

    },
  })
  .configureExtensionLink({
    title: 'Export to PNG',
    category: 'Export',
    description: 'Export panel as a PNG file',
    extensionPointId: PluginExtensionPoints.DashboardPanelMenu,
    onClick(_, helpers: PluginExtensionEventHelpers<PluginExtensionPanelContext>) {
      const title = getTemplateSrv().replace(helpers.context?.title, helpers.context?.scopedVars)
      const url = constructURL({
        type: RenderType.Panel,
        encoding: RenderEncoding.PNG,
        title: title,
        panels: [helpers.context!.id],
        width: '1280',
        height: '720',
        landscape: true,
        tz: helpers.context?.timeZone,
      })
      window.open(url, '_blank')
    }
  })
  .configureExtensionLink({
    title: 'Export to PDF',
    category: 'Export',
    description: 'Export panel as a PDF file',
    extensionPointId: PluginExtensionPoints.DashboardPanelMenu,
    onClick(_, helpers: PluginExtensionEventHelpers<PluginExtensionPanelContext>) {
      const url = constructURL({
        type: RenderType.Panel,
        encoding: RenderEncoding.PDF,
        panels: [helpers.context!.id],
        width: '1280',
        height: '720',
        landscape: true,
        tz: helpers.context?.timeZone,
      })
      window.open(url, '_blank')
    },
  })
  .configureExtensionLink({
    title: 'Export to CSV',
    category: 'Export',
    description: 'Export panel as a CSV file',
    extensionPointId: PluginExtensionPoints.DashboardPanelMenu,
    onClick(_, helpers: PluginExtensionEventHelpers<PluginExtensionPanelContext>) {
      const url = constructURL({
        type: RenderType.Panel,
        encoding: RenderEncoding.PDF,
        panels: [helpers.context!.id],
        width: '1280',
        height: '720',
        landscape: true,
        tz: helpers.context?.timeZone,
      })
      window.open(url, '_blank')
    },
  })
  .addConfigPage({
    title: 'Configuration',
    icon: 'cog',
    body: AppConfig,
    id: 'configuration',
  })
