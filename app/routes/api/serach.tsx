import { json } from "@remix-run/node";

import { LoaderFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const products = await db.product.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
  });
  return json({ q: url?.searchParams.get("q"), products });
};
