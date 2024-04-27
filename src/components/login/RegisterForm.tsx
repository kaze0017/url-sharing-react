import BackBtn from "./BackBtn";
import Social from "./Social";
import { useRef } from "react";
import { USER_REGEX } from "../../constants";
import { PASSWORD_REGEX } from "../../constants";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { set, z } from "zod";
// import { RegisterSchema } from "@/schemas/index";
// import FormError from "../FormError";
// import FormSuccess from "../FormSuccess";
// import { register } from "@/actions/register";
import { useTransition, useState, useEffect } from "react";
// import Link from "next/link";

export function RegisterForm() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidMatch(result);

    const match = pwd === matchPwd;
    console.log(match);
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setError("");
  }, [user, email, pwd, matchPwd]);

  // const form = useForm<z.infer<typeof RegisterSchema>>({
  //   resolver: zodResolver(RegisterSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //     name: "",
  //   },
  // });

  // function onSubmit(data: z.infer<typeof RegisterSchema>) {
  //   setError("");
  //   setSuccess("");

  //   startTransition(() => {
  //     register({ values: data }).then((response: any) => {
  //       console.log(response);
  //       setError(response.error || "");
  //       setSuccess(response.success || "");
  //     });
  //   });
  // }

  const mainWrapperClass =
    "flex flex-row items-center justify-center gap-4 min-h-[70%] bg-white  uppercase w-[600px] rounded-lg";

  return (
    <div className={mainWrapperClass}>
      <div className="flex h-full flex-col w-1/3">
        <div className="flex flex-col grow"></div>
        <div className="flex flex-col text-xs">
          <p>Already have an account?</p>
          <a href="/auth/login">
            <h2 className="text-blue-950 text-bold text-2xl">Sign In</h2>
          </a>
        </div>
        <div className="flex flex-col grow"></div>
        <div className="flex justify-center">
          <img src="/logo/URLSHARE.png" className="w-[150px]" alt="" />
        </div>
      </div>
      <div className="flex flex-col h-full w-2/3 gradientBorder p-4 gap-3 rounded-lg">
        <form className="flex flex-col gap-2  max-w-md p-4 rounded-md">
          <p ref={errRef} aria-live="assertive" className="text-red-500"></p>
          <h1 className="text-xl font-semibold text-gray-500">Register</h1>
          {/* with z message */}

          <input
            id="name"
            className="rounded-md border-gray-300"
            type="text"
            placeholder="Name"
            disabled={isPending}
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p id="uidnote" className="text-xs text-gray-500">
            {userFocus && !validName ? "Invalid name" : ""}
          </p>

          <input
            className="rounded-md border-gray-300"
            type="password"
            placeholder="Password"
            disabled={isPending}
          />

          <input
            className="rounded-md border-gray-300"
            type="password"
            placeholder="Confirm password"
            disabled={isPending}
          />

          {/* <FormSuccess message={success} />
          <FormError message={error} /> */}
          <button
            className="btn w-full bg-navy-800 text-white rounded-xl p-2 bg-blue-950"
            type="submit"
            disabled={isPending}
          >
            Create account
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-800">Or Register with</p>

        <Social />
        <BackBtn message="Back to login" backToHref="/auth/login" />
      </div>
    </div>
  );
}
