import { Category, Productofinal, Sede } from '@/interfaces/interfaces';
import { prisma } from "@/config/db";
import type { NextApiRequest, NextApiResponse } from "next";


type Data = {
  data?: Category[] | Category;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return await getCategorias(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getCategorias = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const result = await prisma.categoria.findMany();
    return res.status(200).json({ data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: message });
  }
};