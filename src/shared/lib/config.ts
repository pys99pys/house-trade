export const setisMobile = (): void => {
  if (window && window.innerWidth <= 640) {
    document.body.classList.add("mobile");
  }
};

export const getIsMobile = (): boolean => {
  return document.body.classList.contains("mobile");
};
