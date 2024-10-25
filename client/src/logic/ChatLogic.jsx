export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
  
// Function to get the name of the user who is not logged in
export const getSender = (loggedUser, users) => {
  // Check if inputs are valid
  if (!loggedUser || !users || users.length < 2) {
    return "Unknown User"; // Fallback if users array is invalid
  }

  // Find the user who is not the logged-in user
  const otherUser = users.find(user => user._id.toString() !== loggedUser._id.toString());

  // Return the other user's name or fallback
  return otherUser ? otherUser.name : "Unknown User";
};

// Function to get the full details of the user who is not logged in
export const getSenderFull = (loggedUser, users) => {
  // Check if inputs are valid
  if (!loggedUser || !users || users.length < 2) {
    return null; // Return null if users array is invalid
  }

  // Find the user who is not the logged-in user and return their full details
  const otherUser = users.find(user => user._id.toString() !== loggedUser._id.toString());

  return otherUser || null; // Return the other user or null if not found
};

