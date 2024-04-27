
interface LoginBtnProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  anChild?: boolean;
}

export const LoginBtn = ({
  children,
  mode = "redirect",
  anChild,
}: LoginBtnProps) => {

    // const router = useRouter();



  const onClick = () => {
  //   router.push("/auth/login")
  // };
  // if (mode === "modal") {
  //   return (
  //     <button
  //       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //       onClick={onClick}
  //     >
  //       <span>TODO: IMPLEMENT MODAl</span>{" "}
  //     </button>
  //   );
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
