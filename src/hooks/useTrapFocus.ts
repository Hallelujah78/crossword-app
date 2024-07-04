import { useEffect, useState } from "react";

const useTrapFocus = (elementRef: React.RefObject<HTMLElement | null>) => {
  const [firstEl, setFirstEl] = useState<HTMLElement | null>(null);
  const [lastEl, setLastEl] = useState<HTMLElement | null>(null);

  const setFocussable = () => {
    let focussableEls: NodeListOf<HTMLElement>;
    if (elementRef.current) {
      focussableEls = elementRef.current.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      );

      setFirstEl(focussableEls[0]);
      setLastEl(focussableEls[focussableEls.length - 1]);
      focussableEls[0].focus();
    }
  };

  const handleTabPress = (event: KeyboardEvent) => {
    const isTabPressed = event.key === "Tab" || event.code === "Tab";

    if (!isTabPressed) return;
    if (event.shiftKey) {
      // if activeel is firstel, set activeel to lastel
      if (document.activeElement === firstEl) {
        event.preventDefault();

        lastEl?.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        event.preventDefault();
        firstEl?.focus();
      }
    }
  };

  useEffect(() => {
    const currentRefElement = elementRef.current;
    setFocussable();

    currentRefElement?.addEventListener("keydown", handleTabPress);
    return () => {
      currentRefElement?.removeEventListener("keydown", handleTabPress);
    };
  });
};
export default useTrapFocus;
