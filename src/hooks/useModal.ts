import { useState } from "react";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => {
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };
  return { isVisible, show, close };
};
export default useModal;
