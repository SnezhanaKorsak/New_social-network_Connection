import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import s from "./ErrorSnackBar.module.css";


type ErrorSnackBarPropsType = {
    error: string | null;
    setError: (error: string | null) => void
}

export const ErrorSnackBar: React.FC<ErrorSnackBarPropsType> = ({error, setError}) => {

 /* const dispatch = useDispatch();*/

 /* useEffect(() => {
    setTimeout(() => {
      dispatch(setError(null));
    }, 3000);
  }, []);
*/
  const handleClose = () => {
    setError(null)
  };

  return (
    <div className={s.errorContainer}>
      <FontAwesomeIcon icon={faExclamationCircle} size={"lg"} />
      <div className={s.errorMessage}>Error: {error}</div>
      <div className={s.exitIcon}>
        <FontAwesomeIcon icon={faTimes} onClick={handleClose} size={"lg"} />
      </div>
    </div>
  );
};
