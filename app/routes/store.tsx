import { Outlet } from "@remix-run/react";
import ClientLayout from "~/components/Layout";
export default function Shop() {
  return (
    <ClientLayout>
      <Outlet />
    </ClientLayout>
  );
}
