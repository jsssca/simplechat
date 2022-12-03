//selectAvatar
// generate random avatar string
// called when registering

// gettimelabel

// Component: Add Chat
// display model
// select user to chat with

//TODO
// Responsive Design
// Show online users
// Group Chats
// Allow user to select an avatar

//to snippet

const toSnippet = (text) => {
  if (text.length > 120) {
    text = text.slice(0, 120).concat("...");
  }
  return text;
};

//chatListTime
// chatBoxTime

export { toSnippet };
