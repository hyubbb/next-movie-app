import { useEffect } from "react";

/**
 * 외부 클릭 감지를 위한 훅
 * @param {React.RefObject} ref - DOM 요소의 참조
 * @param {Function} callback - 외부 클릭 시 실행할 콜백 함수
 */
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
