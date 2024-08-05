import { IconType } from "react-icons";
import { Button, Paper, Box } from "@mui/material";
import { BottomNavigationAction, BottomNavigation } from "@mui/material";

interface Props {
  icon: IconType;
  title: string;
  callBacFunc?: () => void;
}

export default function MenuBtnCard({ icon: Icon, title, callBacFunc }: Props) {
  const mainWrapperClass =
    "flex flex-col gap-2 items-center justify-center w-36 h-36 panel-light text-center text-blue-950 uppercase cursor-pointer";
  const titleClass = "text-xs font-semibold";
  const iconSize = 44;
  return (
    // <div className={mainWrapperClass} onClick={callBacFunc}>
    //   <Button  fullWidth className="h-full flex flex-col items-center justify-center g-1">
    //     <div className="h-1/2 flex flex-col  w-full items-center justify-end">
    //       <Icon size={iconSize} />
    //     </div>
    //     <div className="h-1/2 flex flex-col  w-full items-center">
    //       <p className={titleClass}>{title}</p>
    //     </div>
    //   </Button>
    // </div>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={5}>
        <Button
          fullWidth
          className="h-full flex flex-col items-center justify-center gap-1"
          color="primary"
          onClick={callBacFunc}
        >
          <Icon size={iconSize} />
          <p className={titleClass}>{title}</p>
        </Button>
      </Paper>
    </Box>
  );
}
