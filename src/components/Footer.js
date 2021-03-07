import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  align-self: flex-end;
  margin-right: 0.2em;

  p, a {
    color: #8a8a8a;
  }

  p {
    font-size: 0.7em;
    margin: 0;
  }

  :last-child {
    margin-bottom: 0.5em;
  }

  /* Hide background photo info */
  .photoInfo {
    display: none;
  }

  @media (min-width: 550px) {
    padding: 1em;
    text-align: right;

    .photoInfo {
      display: inline;
    }
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <p>Data: HSL 2020 /
        {` `}
        <a href="https://creativecommons.org/licenses/by/4.0/"
           target="_blank"
           rel="noreferrer noopener">
          CC BY 4.0
        </a>
      </p>
      <p className='photoInfo'>Kuva:
      {` `}
        <a href="https://unsplash.com/@juliusjansson?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
           target="_blank"
           rel="noreferrer noopener">
          Julius Jansson
        </a> (
        <a href="https://unsplash.com/s/photos/keilaniemi?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
           target="_blank"
           rel="noreferrer noopener">
          Unsplash
        </a>
        )
      </p>
    </StyledFooter>
  );
}

export default Footer;
