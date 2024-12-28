import { Fragment } from 'react';

export const Description = ({ text }: { text: string }) => {
  if (!text) return null;

  const processText = (input: string) => {
    return input
      .replace(/[ ]{2,}/g, (match) => '\u00A0'.repeat(match.length))
      .split('\n');
  };

  const lines = processText(text);

  return (
    <div>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </div>
  );
};
