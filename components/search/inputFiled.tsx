// InputField 컴포넌트
import { IoIosSearch } from "react-icons/io";
import styles from "./search.module.scss";

const InputField = ({ inputProps }) => {
  return (
    <label>
      <input
        type='text'
        {...inputProps}
        placeholder='찾으시는 작품을 입력해보세요.'
        className={styles.input}
      />
      <IoIosSearch />
    </label>
  );
};

export default InputField;
