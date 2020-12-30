import styled from 'styled-components';

const StyledFooter = styled.footer`
  align-self: flex-end;
  margin-right: 0.2em;

  p, a {
    color: #C0C0DC;
  }

  p {
    font-size: 0.7em;
    margin: 0;
  }

  :last-child {
    margin-bottom: 0.5em;
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
      <p>Kuva:
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