import React, { FC } from 'react';

import Cell from 'components/Cell';

interface Props {
  stage: any;
}

const Stage: FC<Props> = () => (
  <div>
    <Cell />
  </div>
);

export default Stage;
