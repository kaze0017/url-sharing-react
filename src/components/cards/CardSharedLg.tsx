import { CiGrid41 } from "react-icons/ci";
import ActionBtns from "./actionBtns/ActionBtns";
import ProfilePicture from "../profilePictures/ProfilePicture";
import { SharedLinkType } from "../../lib/interfaces";
import FeaturedImage from "./featuredImages/FeaturedImage";
import { useNavigate } from "react-router-dom";
import { EventType } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";

// import { Shrikhand } from "../../lib/interfaces";
interface CardSharedLgProps {
  sharedLink: SharedLinkType;
}

export default function CardSharedLg({ sharedLink }: CardSharedLgProps) {
  const navigate = useNavigate();
  const ownerFullName =
    sharedLink.owner.first_name + " " + sharedLink.owner.last_name;
  const mainWrapperClass = `flex flex-col gap-2 p-2 h-[200px] w-[600px] mx-auto panel-light cursor-pointer`;
  const imgUrl = sharedLink.thumbnail || "";
  const tags = sharedLink.tags === null ? [] : sharedLink.tags;

  function showTheLink(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    navigate(`/sharedLink/${sharedLink.id}`);
  }

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%", // Make the width responsive
          maxWidth: "600px", // Set a max width for the paper
          height: "auto", // Allow height to adjust based on content
          padding: "10px",
        }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FeaturedImage sharedLink={sharedLink} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography component="div" variant="h5">
                  {sharedLink.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {sharedLink.contentDescription}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {sharedLink.publicationDate}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            alignItems="center"
            sx={{ marginTop: "10px" }}
          >
            <Grid item xs={12} sm={9}>
              <div className="flex gap-2 items-center stopPropagation">
                <CiGrid41 className="text-2xl" />
                <ProfilePicture
                  user={sharedLink.owner}
                  size="small"
                  clickable={false}
                  hoverAnimation={false}
                />
                <h4>{ownerFullName}</h4>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{ textAlign: { xs: "left", sm: "right" } }}
            >
              <ActionBtns
                rank={sharedLink.likeCount || 0}
                shared={sharedLink.sharedCount}
                saved={sharedLink.savedCount}
                id={sharedLink.id}
                link={sharedLink}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* <div className={mainWrapperClass} onClick={(event) => showTheLink(event)}>
        <div className="flex h-3/4 gap-2">
          <FeaturedImage sharedLink={sharedLink} twClass="w-[220px]" />
          <div className="flex flex-col">
            <div className="">
              <h2 className="font-bold">{sharedLink.title}</h2>
              <p>{sharedLink.contentDescription}</p>
            </div>
            <div className="flex grow"></div>
            <div className="">
              <p>{sharedLink.publicationDate}</p>
              <div className="text-xs flex w-full uppercase gap-1 stopPropagation">
                {tags?.map((tag: string, index: number) => {
                  return (
                    <p
                      key={index}
                      className="flex items-center text-xs bg-gray-500 text-white rounded-md px-1"
                    >
                      {tag}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="">
            <CiGrid41 className="text-2xl" />
          </div>
          <div className="flex gap-2 items-center stopPropagation">
            <ProfilePicture
              user={sharedLink.owner}
              size="small"
              clickable={false}
              hoverAnimation={false}
            />
            <h4>{ownerFullName}</h4>
          </div>
          <div className="flex grow"></div>
          <div className="w-1/3 stopPropagation">
            <ActionBtns
              rank={sharedLink.likeCount || 0}
              shared={sharedLink.sharedCount}
              saved={sharedLink.savedCount}
              id={sharedLink.id}
              link={sharedLink}
            />
          </div>
        </div>
      </div> */}
    </>
  );
}
