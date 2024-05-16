import { useEffect } from "react";
import { SharedLinkType } from "../../../lib/interfaces";
import ProfilePictureSm from "../../profilePictures/ProfilePictureSm";
import { LuDownload } from "react-icons/lu";
import { LuUpload } from "react-icons/lu";
import Type from "./body/Type";
import PublicationDate from "./body/PublicationDate";
import ExpirationDate from "./body/ExpirationDate";
import Count from "./body/Count";
import QrCode from "./body/QrCode";
import ShortLink from "./body/ShortLink";
import NotFound from "../../NotFound";

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
  const linkIds = selectedLinks.map((link) => link.id);
  const linkIndex = linkIds.indexOf(sharedLink.id);
  const newSelectedLinks =
    linkIndex !== -1
      ? selectedLinks.filter((_, index) => index !== linkIndex)
      : [...selectedLinks, sharedLink];
  setSelectedLinks(newSelectedLinks);
}


  useEffect(() => {}, [columnsWidth]);

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
              selectedLinks.some((link) => link.id === sharedLink.id)
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
                            src={
                              sharedLink.thumbnail ||
                              "/images/defaults/imageDefaultThumbnail.jpg"
                            }
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
                            <ProfilePictureSm person={sharedLink.owner} />
                            <p className="text-3xs">
                              {sharedLink.owner.first_name +
                                " " +
                                sharedLink.owner.last_name}
                            </p>
                          </div>
                        );
                      case "SUGGESTEDBY":
                        return (
                          <div className="flex flex-col items-center justify-center">
                            {sharedLink.suggestedby ? (
                              <>
                                <ProfilePictureSm
                                  person={sharedLink.suggestedby}
                                />
                                <p className="text-3xs">
                                  {sharedLink.owner.first_name +
                                    " " +
                                    sharedLink.owner.last_name}{" "}
                                </p>
                              </>
                            ) : (
                              <NotFound title="NA" size="text-xl" />
                            )}
                          </div>
                        );

                      case "SHARED":
                        return sharedLink.sharedby !== sharedLink.owner ? (
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
                        // return <Status linkUrls={sharedLink.linkUrls} />;
                        return <NotFound title="Status" size="text-xl" />;
                      case "AUDIENCE":
                        return (
                          <div className="flex">
                            <p className="text-3xs uppercase">
                              {sharedLink.audience}
                            </p>
                          </div>
                        );
                      case "TYPE":
                        return <Type type={sharedLink.url_type} />;

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
