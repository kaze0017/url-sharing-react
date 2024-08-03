import { Button } from "@mui/material";
interface Props {
  isLoading: boolean;
  isDisabled: boolean;
  title: string;
}
export default function SubmitBtn({ isDisabled, isLoading, title }: Props) {
  return (
    <Button
      type="submit"
      disabled={isDisabled || isLoading}
      variant="contained"
      color="primary"
      startIcon={
        isLoading ? (
          <img
            src="/images/assets/Spinner.svg"
            alt="loading"
            width={25}
            height={25}
          />
        ) : null
      }
    >
      {title}
    </Button>
  );
}
