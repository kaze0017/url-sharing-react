import { Outlet } from "react-router-dom";

import { SnackbarProvider } from "notistack";

export default function Layout() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div className="flex w-full h-full items-center justify-center">
        <Outlet />
      </div>
    </SnackbarProvider>
  );
}
