import React from "react";

interface ExpirationDateProps {
  expirationDate: string;
}

export default function ExpirationDate({
  expirationDate,
}: ExpirationDateProps) {
  return (
    <div>
      {expirationDate ? (
        <div className="text-gray-500 text-2xs font-medium">
          {expirationDate}
        </div>
      ) : (
        <div className="text-gray-500 text-2xs font-medium"> --- </div>
      )}
    </div>
  );
}
