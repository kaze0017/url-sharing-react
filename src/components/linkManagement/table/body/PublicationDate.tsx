import React from "react";

interface PublicationDateProps {
  publicationDate?: string;
}
export default function PublicationDate({
  publicationDate,
}: PublicationDateProps) {
  return (
    <div className="text-gray-500 text-2xs font-medium">{publicationDate}</div>
  );
}
