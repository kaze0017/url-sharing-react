import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
  message: string;
}

export default function FormSuccess({ message }: FormSuccessProps) {
  return (
    <>
      {message ? (
        <div className="flex items-center gap-x-2 text-green-500">
          <FaCheckCircle />
          <p>{message}</p>
        </div>
      ) : null}
    </>
  );
}
