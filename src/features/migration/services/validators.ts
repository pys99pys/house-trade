export const validateSavedDataFormat = (data: string): boolean => {
  try {
    const result = JSON.parse(data);

    return !!result.savedRegions && !!result.savedAparts;
  } catch {
    return false;
  }
};

export const parseSavedData = (data: string): { savedRegions: string[]; savedAparts: string[] } => {
  const result = JSON.parse(data);

  return { savedRegions: result.savedRegions, savedAparts: result.savedAparts };
};
