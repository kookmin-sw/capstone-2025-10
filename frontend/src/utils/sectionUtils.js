export const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsla(${hue}, 70%, 70%, 0.4)`; // pastel tone with transparency
};

export const getSectionFromCampaign = (campaign) => {
  console.log(campaign);
  return campaign?.sections?.map((section) => {
    return {
      id: section.id,
      name: section.name,
      color: generateRandomColor(),
      cells: Array.from(section.positionList).map((item) => Number(item)),
    };
  });
};
