import  { useEffect } from "react";
import { SharedLinkType } from "../../../lib/interfaces";
import ProfilePicture from "../../ProfilePicture";
import { LuDownload } from "react-icons/lu";
import { LuUpload } from "react-icons/lu";
import Status from "./body/Status";
import Type from "./body/Type";
import PublicationDate from "./body/PublicationDate";
import ExpirationDate from "./body/ExpirationDate";
import Count from "./body/Count";
import QrCode from "./body/QrCode";
import ShortLink from "./body/ShortLink";

interface BodyProps {
  columns: Array<{
    id: string;
    title: string;
    icon?: React.ReactNode;
    display: boolean;
    width: number;
    grow: number;
  }>;
  columnsWidth: { [key: string]: number };
  sharedLinks: Array<SharedLinkType>;
  setSelectedLinks: React.Dispatch<SharedLinkType[]>;
  selectedLinks: SharedLinkType[];
}

const Body: React.FC<BodyProps> = ({
  columns,
  columnsWidth,
  sharedLinks,
  setSelectedLinks,
  selectedLinks,
}) => {
  function toggleSelectedLink(sharedLink: SharedLinkType) {
    const newSelectedLinks = selectedLinks.includes(sharedLink)
      ? selectedLinks.filter((link) => link !== sharedLink)
      : [...selectedLinks, sharedLink];
    setSelectedLinks(newSelectedLinks);
  }

  useEffect(() => {
    console.log("columnsWidth from body", columnsWidth);
  }, [columnsWidth]);

  const mainWrapperClass = "mt-1 flex  flex-col z-0";

  return (
    <div className={mainWrapperClass}>
      {sharedLinks.map((sharedLink, index) => (
        <div
          key={index}
          className="relative flex flex-grow items-center "
          onClick={() => toggleSelectedLink(sharedLink)}
        >
          <div
            className={`absolute top-0 left-0 w-full h-full ${
              selectedLinks.includes(sharedLink)
                ? "bg-green-200 opacity-20"
                : ""
            }`}
          ></div>
          <div className="flex  border-b-2 border-indigo-500 h-16 py-1">
            {columns.map((column, columnIndex) =>
              column.display ? (
                <div
                  key={columnIndex}
                  className={`td-${column.id} text-center  overflow-hidden p-1 flex items-center justify-center`}
                  style={
                    column.id in columnsWidth
                      ? {
                          width: columnsWidth[column.id] + "px",
                          minWidth: columnsWidth[column.id] + "px",
                        }
                      : {}
                  }
                >
                  {(() => {
                    switch (column.id) {
                      case "THUMBNAIL":
                        return (
                          <img
                            src={sharedLink.thumbnail}
                            alt="thumbnail"
                            className="max-w-32 object-cover aspect-video mx-auto"
                          />
                        );
                      case "NAME":
                        return (
                          <div className="flex flex-col p-1 overflow-hidden">
                            <h2 className="uppercase text-2xs font-semibold w-full">
                              {sharedLink.title}
                            </h2>
                            <p className="text-2xs truncate">
                              {sharedLink.description}
                            </p>
                          </div>
                        );
                      case "OWNER":
                        return (
                          <div className="flex flex-col items-center justify-center">
                            <ProfilePicture
                              size={22}
                              imageUrl={sharedLink.owner.photo}
                              alt={sharedLink.owner.name}
                            />
                            <p className="text-3xs">{sharedLink.owner.name}</p>
                          </div>
                        );
                      case "SUGGESTEDBY":
                        return (
                          <div className="flex flex-col items-center justify-center">
                            <ProfilePicture
                              size={22}
                              imageUrl={sharedLink.owner.photo}
                              alt={sharedLink.owner.name}
                            />
                            <p className="text-3xs">{sharedLink.owner.name}</p>
                          </div>
                        );
                      case "SHARED":
                        return sharedLink.sharedBy !== "user" ? (
                          <div className="flex flex-col items-center justify-center">
                            <LuDownload className="text-xl text-indigo-700" />
                            <p className="text-3xs uppercase">For Me</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <LuUpload />
                            <p className="text-3xs uppercase">By me</p>
                          </div>
                        );
                      case "STATUS":
                        return <Status linkUrls={sharedLink.linkUrls} />;
                      case "AUDIENCE":
                        return (
                          <div className="flex">
                            <p className="text-3xs uppercase">
                              {sharedLink.audience}
                            </p>
                          </div>
                        );
                      case "TYPE":
                        return <Type type={sharedLink.type} />;

                      case "PUBLICATIONDATE":
                        return (
                          <PublicationDate
                            publicationDate={sharedLink.publicationDate}
                          />
                        );
                      case "EXPIRATIONDATE":
                        return (
                          <ExpirationDate
                            expirationDate={sharedLink.expirationDate || ""}
                          />
                        );
                      case "RANK":
                        return <Count count={sharedLink.rankCount || 0} />;
                      case "SAVEDCOUNT":
                        return <Count count={sharedLink.savedCount || 0} />;
                      case "SHAREDCOUNT":
                        return <Count count={sharedLink.sharedCount || 0} />;
                      case "QRCODE":
                        return <QrCode />;
                      case "SHORTLINK":
                        return <ShortLink />;

                      default:
                        return null;
                    }
                  })()}
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
