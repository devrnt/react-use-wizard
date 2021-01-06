import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Wizard } from '../../../../dist';
import { Footer } from '../../../components';
import Section from '../../common/section';
import LazyQueryStep from './lazyQuery';
import QueryStep from './queryStep';

const queryClient = new QueryClient();

const ReactQuerySection: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Section
        title="React query"
        description="integration with react-query"
        showDivider={false}
      >
        <Wizard footer={<Footer />}>
          <QueryStep number={1} />
          <LazyQueryStep number={2} />
          <QueryStep number={3} />
          <LazyQueryStep number={4} />
          <QueryStep number={5} />
        </Wizard>
      </Section>
    </QueryClientProvider>
  );
};

export default ReactQuerySection;
