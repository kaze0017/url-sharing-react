import { useState } from "react";
import SubmenuTitle from "../SubmenuTitle";
import EditableField from "../EditableField";

export default function OrganizationInformation() {
  const [organizationName, setOrganizationName] =
    useState<string>("Organization Name");
  const [organizationType, setOrganizationType] =
    useState<string>("Organization Type");
  const [organizationField, setOrganizationField] =
    useState<string>("Organization Field");

  return (
    <div className="flex flex-col w-full">
      <SubmenuTitle title="Organization Information" />
      <div className="flex gap-2">
        <div className="flex flex-col">
          <EditableField
            title="Name"
            value={organizationName}
            setValue={setOrganizationName}
          />
          <EditableField
            title="Type"
            value={organizationType}
            setValue={setOrganizationType}
          />
          <EditableField
            title="Field"
            value={organizationField}
            setValue={setOrganizationField}
          />
        </div>
      </div>
    </div>
  );
}
