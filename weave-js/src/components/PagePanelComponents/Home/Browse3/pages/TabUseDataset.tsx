import {Alert, Box} from '@mui/material';
import React from 'react';

import {CopyableText} from '../../../../CopyableText';
import {DocLink} from './common/Links';

type TabUseDatasetProps = {
  name: string;
  uri: string;
};

export const TabUseDataset = ({name, uri}: TabUseDatasetProps) => {
  return (
    <Box m={2}>
      <Alert severity="info" variant="outlined">
        See{' '}
        <DocLink
          path="guides/tracking/objects#getting-an-object-back"
          text="Weave docs on refs"
        />{' '}
        and <DocLink path="guides/core-types/datasets" text="datasets" /> for
        more information.
      </Alert>

      <Box mt={2}>
        The ref for this dataset version is:
        <CopyableText text={uri} />
      </Box>
      <Box mt={2}>
        Use the following code to retrieve this dataset version:
        <CopyableText
          text={`${name} = weave.ref("<ref_uri>").get()`}
          copyText={`${name} = weave.ref("${uri}").get()`}
        />
      </Box>
    </Box>
  );
};