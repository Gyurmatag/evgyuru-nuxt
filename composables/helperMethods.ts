export const splitHoursAndMinutesTime = (time: string): string[] =>
  time.split(":");

export const removeBaseUrlFromImageUrl = (url: string): string => {
  const config = useRuntimeConfig();
  console.log(url.replace(config.public.cloudinaryBaseUrl, ""));
  return url.replace(config.public.cloudinaryBaseUrl, "");
};
