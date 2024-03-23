import React, { FC, useState } from 'react';

import { Button, HorizontalGroup, InlineLabel, RadioButtonGroup, Spinner } from '@grafana/ui';
import { RenderEncoding, RenderOrientation, RenderType } from 'types';
import { constructURL } from 'utils';
import { config } from '@grafana/runtime';

interface Props {
  onDismiss: () => void;
}
export const ExtensionModal: FC<Props> = ({ onDismiss }) => {
  // const [type, setType] = useState<RenderType>(RenderType.Panel);
  const [encoding, setEncoding] = useState<RenderEncoding>(RenderEncoding.PNG);
  const [orientation, setOrientation] = useState<RenderOrientation>(RenderOrientation.Portrait);

  const [loading, setLoading] = useState(false);

  const onExport = () => {
    const { title, uid, timezone } = (window as any).grafanaRuntime.getDashboardSaveModel()
    const { from, to } = (window as any).grafanaRuntime.getDashboardTimeRange()
    const runtimePanels = (window as any).grafanaRuntime.getPanelData()
    const url = constructURL({
      type: RenderType.Dashboard,
      encoding: encoding,
      title: title,
      logo: 'https://grafana.com/media/grafanacon/2024/banners/graphic-banner-logo.png',
      orgId: config.bootData.user.orgId,
      uid: uid,
      from: from,
      to: to,
      panels: Object.keys(runtimePanels),
      width: orientation === RenderOrientation.Landscape ? '1280' : '720',
      height: orientation === RenderOrientation.Landscape ? '720' : '1280',
      landscape: orientation === RenderOrientation.Landscape,
      tz: timezone,
    })
    window.open(url, '_blank')
    onDismiss();
  }

  const onDownload = () => {
    setLoading(true);

    const url = constructURL({
      type: RenderType.Dashboard,
      encoding: encoding,
      logo: 'https://grafana.com/media/grafanacon/2024/banners/graphic-banner-logo.png',
      width: orientation === RenderOrientation.Landscape ? '1280' : '720',
      height: orientation === RenderOrientation.Landscape ? '720' : '1280',
      landscape: orientation === RenderOrientation.Landscape,
    })

    // file name is dashboard title but sanitized
    const { title } = (window as any).grafanaRuntime.getDashboardSaveModel()
    const fileName = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.' + encoding;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const type = encoding === RenderEncoding.PDF ? 'application/pdf' : 'image/png';
        const file = new Blob([blob], { type });
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }).finally(() => {
        setLoading(false);
      });
  }

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      flexDirection: 'column',
      alignItems: 'flex-start',
    }}>
      {/* Todo: Show dashboards list maybe */}

      <HorizontalGroup>
        <InlineLabel width={12}>Report Type</InlineLabel>
        <RadioButtonGroup
          options={encodingOptions}
          onChange={setEncoding}
          value={encoding}
          fullWidth={true}
        />
      </HorizontalGroup>
      {/* {encoding === RenderEncoding.PDF && ( */}
      <HorizontalGroup>
        <InlineLabel width={12}>Orientation</InlineLabel>
        <RadioButtonGroup
          options={orientationOptions}
          onChange={setOrientation}
          value={orientation}
          fullWidth={true}
        />
      </HorizontalGroup>
      {/* )} */}
      <br />
      <HorizontalGroup>
        <Button onClick={onDownload} variant='primary' disabled={loading}>
          <HorizontalGroup>
            <span>Download</span>
            {loading && <Spinner />}
          </HorizontalGroup>
        </Button>
        <Button onClick={onExport} variant='secondary' disabled={loading}>
          Preview
        </Button>
      </HorizontalGroup>
    </div>
  );
};

// const typeOptions = [
//   { label: 'Dashboard', value: RenderType.Dashboard, icon: 'apps' },
//   { label: 'Panel', value: RenderType.Panel, icon: 'square-shape' },
// ]

const encodingOptions = [
  { label: 'PNG', value: RenderEncoding.PNG, icon: 'book' },
  { label: 'PDF', value: RenderEncoding.PDF, icon: 'file-alt' },
]

const orientationOptions = [
  { label: 'Portrait', value: RenderOrientation.Portrait, icon: 'gf-portrait' },
  { label: 'Landscape', value: RenderOrientation.Landscape, icon: 'gf-landscape' },
]
