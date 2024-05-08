import {Box} from '@mui/material';
import React from 'react';

import {Alert} from '../../../../Alert';
import {CopyableText} from '../../../../CopyableText';
import {DocLink} from './common/Links';
import {CallSchema} from './wfReactInterface/wfDataModelHooksInterface';

type TabUseCallProps = {
  call: CallSchema;
};

export const TabUseCall = ({call}: TabUseCallProps) => {
  const {entity, project, callId} = call;
  let fetch = `import weave
client = weave.init("${entity}/${project}")
call = client.call("${callId}")`;

  const backend = (window as any).CONFIG.TRACE_BACKEND_BASE_URL;
  if (backend.endsWith('.wandb.test')) {
    fetch =
      `import os
os.environ["WF_TRACE_SERVER_URL"] = "http://127.0.0.1:6345"

` + fetch;
  }

  return (
    <Box m={2}>
      <Alert icon="lightbulb-info">
        See{' '}
        <DocLink path="guides/tracking/tracing" text="Weave docs on tracing" />{' '}
        for more information.
      </Alert>

      <Box mt={2}>
        Use the following code to retrieve this call:
        <CopyableText text={fetch} copyText={fetch} />
      </Box>
    </Box>
  );
};
