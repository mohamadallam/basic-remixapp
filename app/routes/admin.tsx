import type { MetaFunction } from "@remix-run/node";

// import ex from "antd/dist/ex.css";
import AdminLayout from "~/components/Admin/Layout";
export default function App() {
  return <AdminLayout></AdminLayout>;
}

export const meta: MetaFunction = () => ({
  title: "Admin",
});
// export const links = () => [{ href: ex, rel: "stylesheet" }];
