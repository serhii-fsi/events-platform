export function convertToHtml(text: string): string {
  if (!text) return '';

  return (
    text
      // Replace newline followed by spaces with <br> and non-breaking spaces
      .replace(/\n(\s+)/g, (match, spaces) => {
        // Convert each space after newline to &nbsp;
        const nonBreakingSpaces = '&nbsp;'.repeat(spaces.length);
        return '<br>' + nonBreakingSpaces;
      })
      // Replace remaining single newlines with <br>
      .replace(/\n/g, '<br>')
  );
}
