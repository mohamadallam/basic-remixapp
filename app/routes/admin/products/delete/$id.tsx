import type { LoaderFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { redirect } from "@remix-run/node"; // or cloudflare/deno

export const loader: LoaderFunction = async ({ params }) => {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });
  if (!product) throw new Error("Product not found");

  await db.product.delete({
    where: { id: params.id },
  });
  return redirect(`/admin/products`);
};

export default function New() {
  return <></>;
}
