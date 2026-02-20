import { useEffect, useState } from "react";

const useTrapFocus = (elementRef: React.RefObject<HTMLElement | null>) => {
  const [firstEl, setFirstEl] = useState<HTMLElement | null>(null);
  const [lastEl, setLastEl] = useState<HTMLElement | null>(null);

  // Get all the focussable elements and focus the first one
  const setFocussable = () => {
    let focussableEls: NodeListOf<HTMLElement>;
    if (elementRef.current) {
      focussableEls = elementRef.current.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
      );

      setFirstEl(focussableEls[0]);
      setLastEl(focussableEls[focussableEls.length - 1]);
      focussableEls[0]?.focus();
    }
  };

  // Handle wrapping to the first or last focussable element if the shift key is/isn't pressed
  const handleTabPress = (event: KeyboardEvent) => {
    const isTabPressed = event.key === "Tab" || event.code === "Tab";

    if (!isTabPressed) return;
    // If tab is pressed with shift held down, tab backwards
    if (event.shiftKey) {
      // If first element is focussed, focus the last element
      if (document.activeElement === firstEl) {
        event.preventDefault();

        lastEl?.focus();
      }
    } else {
       // If the last focussable element is focussed, wrap to the first
      if (document.activeElement === lastEl) {
        event.preventDefault();
        firstEl?.focus();
      }
    }
  };

  // 
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
