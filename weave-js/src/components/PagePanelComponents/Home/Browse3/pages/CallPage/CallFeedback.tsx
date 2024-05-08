import {Box} from '@mui/material';
import React from 'react';

import {Alert} from '../../../../../Alert';
import {Loading} from '../../../../../Loading';
import {useWFHooks} from '../wfReactInterface/context';
import {CallSchema} from '../wfReactInterface/wfDataModelHooksInterface';
import * as traceServerClient from '../wfReactInterface/traceServerClient';
import {Timestamp} from '../../../../../Timestamp';
import {CopyableId} from '../common/Id';
import {Icon} from '../../../../../Icon';
import {UserLink} from '../../../../../UserLink';
import {Tooltip} from '../../../../../Tooltip';

type FeedbackProps = traceServerClient.Feedback;

type JsonProps = {
  value: Record<string, any>;
};

const Json = ({value}: JsonProps) => {
  return <pre className="text-xs">{JSON.stringify(value, null, 4)}</pre>;
};

// created_at, wb_user_id
const Feedback = ({
  id,
  call_id,
  wb_user_id,
  created_at,
  feedback_type,
  notes,
  feedback,
}: FeedbackProps) => {
  // TODO: Handle thumbs
  const dump = JSON.stringify(feedback, null, 4);

  let type = (
    <Tooltip trigger={<span>{feedback_type}</span>} content="Feedback type" />
  );

  if (feedback_type === 'wandb.thumbs.1') {
    const icon = feedback['value'] === 'up' ? 'thumbs-up' : 'thumbs-down';
    type = <Icon name={icon} />;
  }

  return (
    <div className="flex items-center gap-8 rounded bg-moon-100 p-8">
      <div className="w-96 flex-none">
        <Timestamp value={created_at} format="relative" />
      </div>
      <div className="flex w-32 flex-none justify-center">
        <UserLink username={wb_user_id} />
      </div>
      <div className="flex w-32 flex-none justify-center">
        <CopyableId id={id} type="Feedback" />
      </div>
      <div className="flex w-32 flex-none justify-center">
        <CopyableId id={call_id} type="Call" />
      </div>
      <div className="flex w-96 flex-none justify-center">{type}</div>
      <div className="flex-auto">{notes}</div>
      <div className="flex-auto">
        <Json value={feedback} />
      </div>
    </div>
  );
};

export const CallFeedback: React.FC<{
  call: CallSchema;
}> = ({call}) => {
  const {entity, project, callId} = call;
  const {useCallFeedback} = useWFHooks();
  const query = useCallFeedback({
    entity,
    project,
    callId,
  });
  console.log('in CallFeedback');
  console.dir(query);

  if (query.loading) {
    return (
      <Box
        sx={{
          height: '38px',
          width: '100%',
        }}>
        <Loading centered size={25} />
      </Box>
    );
  }

  if (!query.result || !query.result.length) {
    return (
      <div className="m-16 flex flex-col gap-8">
        <Alert>No feedback added to this call.</Alert>
      </div>
    );
  }

  return (
    <div className="m-16 flex flex-col gap-8">
      {query.result.map(f => (
        <Feedback key={f.id} {...f} />
      ))}
    </div>
  );
};
