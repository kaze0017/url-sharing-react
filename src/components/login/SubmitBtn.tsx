interface Props {
  isDisabled: boolean;
  title: string;
}
export default function SubmitBtn({ isDisabled, title }: Props) {
  return (
    <button
      type="submit"
      className="uppercase btn w-full bg-navy-800 text-white rounded-xl bg-blue-950  min-h-10 max-h-10 flex items-center justify-center hover:bg-blue-900 transition duration-200"
      disabled={isDisabled}
    >
      {isDisabled ? (
        <img
          src="/images/assets/Spinner.svg"
          alt="loading"
          width={25}
          height={25}
        />
      ) : (
        title
      )}
    </button>
  );
}
