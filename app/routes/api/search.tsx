import { json } from "@remix-run/node";

import { LoaderFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const take = url?.searchParams.get("take") ?? 20;
  const search = url?.searchParams.get("q") ?? "";
  const products = await db.product.findMany({
    where: {
      title: { contains: search },
    },
    take: +take,
    orderBy: { createdAt: "desc" },
  });
  return json({ products });
};
