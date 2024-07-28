// Function to split an amount equally among participants
export const splitEqually = (amount, participants) => {
  const equalAmount = amount / participants.length; // Calculate equal amount per participant
  participants.forEach((participant) => {
    participant.amount = equalAmount; // Assign equal amount to each participant
  });
};

// Function to split an amount exactly as specified in participants' amounts
export const splitExact = (amount, participants) => {
  const totalAmount = participants.reduce(
    (total, participant) => total + participant.amount,
    0
  );
  // Calculate total specified amount
  if (totalAmount != amount) {
    throw new Error("Error at splitExactly"); // Throw error if total specified amount does not match the given amount
  }
};

// Function to split an amount based on specified percentages for each participant
export const splitPercentage = (amount, participants) => {
  participants.forEach((participant) => {
    if (typeof participant.percentage === "string") {
      participant.percentage = parseFloat(
        participant.percentage.replace("%", "")
      );
    }
  });

  // Calculate total percentage
  let percent = 0;
  participants.forEach((participant) => {
    percent += participant.percentage;
  });

  // Throw error if total percentage is not 100
  if (percent !== 100) {
    throw new Error("Percentage is invalid. Not 100");
  }

  // Assign amount to each participant based on their percentage
  participants.forEach((participant) => {
    participant.amount = (participant.percentage / 100) * amount;
  });
};
