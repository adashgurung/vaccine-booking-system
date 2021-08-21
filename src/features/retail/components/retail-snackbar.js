import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { retailSnackClose, selectRetailSnackOptions } from "../slice";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const RetailSnackBar = () => {
  const {
    open,
    severity,
    message,
    vertical = "top",
    horizontal = "center",
  } = useSelector(selectRetailSnackOptions);
  const dispatch = useDispatch();
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => dispatch(retailSnackClose())}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <Alert onClose={() => dispatch(retailSnackClose())} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
