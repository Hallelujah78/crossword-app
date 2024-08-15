import { useState } from "react";

const useModal = (openState: boolean | (() => boolean)) => {
  const [isVisible, setIsVisible] = useState(openState);

  const show = () => {
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };
  return { isVisible, show, close };
};
export default useModal;
