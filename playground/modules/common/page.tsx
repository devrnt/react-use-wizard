import * as React from 'react';
import styled from 'styled-components';

import githubLogoPath from '../../assets/images/githubLogo.svg';
import logoPath from '../../assets/images/logo.svg';

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  background: var(--dark);
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Body = styled.div`
  margin-top: 2rem;
`;

const Description = styled.div`
  font-size: 1.1rem;
  font-weight: 200;
`;

const Divider = styled.div`
  height: 2px;
  width: 7%;
  background-image: linear-gradient(48.66deg, var(--purple), var(--blue));
  margin: 2.5rem 0;
  display: flex;
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  background-color: var(--nav);
  backdrop-filter: blur(20px);
  z-index: 1000;
`;

const Logo = styled.img`
  height: 3rem;
  width: 3rem;
`;

const GithubLogo = styled.img`
  width: 2rem;
`;

const MaxWidth = styled('div')`
  max-width: 53rem;
  padding: 0 2rem;
  margin: 0 auto;
  justify-content: space-between;
  width: 100%;
`;

const Page = ({ title, description, children }: Props) => {
  return (
    <Container>
      <Wrapper>
        <TopBar>
          <MaxWidth
            style={{
              display: 'flex',
            }}
          >
            <Logo src={logoPath} />
            <a
              href="https://github.com/devrnt/react-use-wizard"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GithubLogo src={githubLogoPath} />
            </a>
          </MaxWidth>
        </TopBar>
        <MaxWidth>
          <h1>{title}</h1>
          <Description>{description}</Description>
          <Divider />
          <Body>{children}</Body>
        </MaxWidth>
      </Wrapper>
    </Container>
  );
};

export default Page;
