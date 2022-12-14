const toSnippet = (text) => {
  if (text.length > 120) {
    text = text.slice(0, 120).concat("...");
  }
  return text;
};

// TODO -- Use internationalisation
const getChatTime = (timestamp) => {
  const ts = new Date(timestamp);
  const tsDateString = ts.toDateString();
  const todayDateString = new Date().toDateString();

  if (new Date(todayDateString) > new Date(tsDateString)) {
    return tsDateString;
  }
  return ts
    .toTimeString()
    .split(" ")[0]
    .toString()
    .split(":")
    .slice(0, 2)
    .join(":");
};

export { toSnippet, getChatTime };
