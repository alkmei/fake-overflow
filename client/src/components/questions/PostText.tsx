export default function PostText({ text }: { text: string }) {
  const getHyperlinks = (text: string) => {
    const linkFormat = /\[([^\]]*)]\(([^)]*)\)/g;
    let match;
    const matches = [];

    while ((match = linkFormat.exec(text)) !== null) {
      const url = match[2];

      if (
        url.trim() !== "" &&
        (url.startsWith("http://") || url.startsWith("https://"))
      ) {
        matches.push({
          text: match[1],
          url: url,
          index: match.index,
        });
      }
    }

    return matches;
  };

  const matches = getHyperlinks(text);
  let lastIndex = 0;
  const elements = [];

  for (const match of matches) {
    const textBeforeLink = text.slice(lastIndex, match.index);
    elements.push(textBeforeLink);

    elements.push(
      <a key={match.url} href={match.url} target="_blank" rel="noreferrer">
        {match.text}
      </a>,
    );

    lastIndex = match.index + match.text.length + match.url.length + 4;
  }

  const textAfterLastLink = text.slice(lastIndex);
  elements.push(textAfterLastLink);

  return <div>{elements}</div>;
}
