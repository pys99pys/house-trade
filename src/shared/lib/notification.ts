export const registNotifyPermission = async (): Promise<void> => {
  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }
};

export const notification = async (title: string, body: string): Promise<void> => {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
};
