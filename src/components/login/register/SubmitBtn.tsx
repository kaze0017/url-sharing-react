import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

interface Props {
  isLoading: boolean;
  isDisabled: boolean;
  title: string;
}
export default function SubmitBtn({ isDisabled, isLoading, title }: Props) {
  return (
    // <Button
    //   type="submit"
    //   disabled={isDisabled || isLoading}
    //   variant="contained"
    //   color="primary"
    //   startIcon={
    //     isLoading ? (
    //       <img
    //         src="/images/assets/Spinner.svg"
    //         alt="loading"
    //         width={25}
    //         height={25}
    //       />
    //     ) : null
    //   }
    // >
    //   {title}
    // </Button>
    <LoadingButton
      color="primary"
      // onClick={handleClick}
      loading={isLoading}
      loadingPosition="start"
      // startIcon={<SaveIcon />}
      startIcon={isLoading ? null : null}
      variant="contained"
      type="submit"
      disabled={isDisabled}
    >
      <span>{title}</span>
    </LoadingButton>
  );
}
