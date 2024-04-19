import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isSearchTerm } from "../state/atom";

/**
 * 인풋 값 핸들링과 디바운스 처리
 * @param {string} initialValue - 초기값 설정
 */

export default function useInput(initialValue) {
  // const [value, setValue] = useState(initialValue);
  const [value, setValue] = useRecoilState(isSearchTerm);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const reset = () => {
    setValue(initialValue);
    setDebouncedValue(initialValue);
  };

  return {
    value,
    onChange: handleChange,
    debouncedValue, // 디바운스된 값을 반환
    reset,
  };
}
