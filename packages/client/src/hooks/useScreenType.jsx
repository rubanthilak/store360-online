import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {
  const xs = useMediaQuery({ minWidth: 0 });
  const sm = useMediaQuery({ minWidth: 640 });
  const md = useMediaQuery({ minWidth: 768 });
  const lg = useMediaQuery({ minWidth: 1024 });

  if (lg) {
    return "desktop";
  }

  if (md) {
    return "laptop";
  }

  if (sm) {
    return "tablet";
  }

  if (xs) {
    return 'mobile'
  }

  return "fullscreen";
};

export default useScreenType;