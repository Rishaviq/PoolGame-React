export const setToken = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Strict; Secure`;
};

export const getToken = (): string | null => {
  const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  return match ? match[2] : null;
};

export const clearToken = () => {
  document.cookie = `token=; path=/; max-age=0`;
};

export const setUserId = (userId: number) => {
  document.cookie = `userId=${userId}; path=/; max-age=86400; SameSite=Strict; Secure`;
};

export const getUserId = (): string | null => {
  const match = document.cookie.match(new RegExp("(^| )userId=([^;]+)"));
  return match ? match[2] : null;
};

export const clearUserId = () => {
  document.cookie = `userId=; path=/; max-age=0`;
};
