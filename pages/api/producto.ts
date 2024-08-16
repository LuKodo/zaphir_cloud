import { Productofinal } from '@/interfaces/interfaces';
import { prisma } from "@/config/db";
import type { NextApiRequest, NextApiResponse } from "next";


type Data = {
  data?: Productofinal[] | Productofinal;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return await getProducts(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const sede = req.query.sede || 'SB';
    const categoria = req.query.categoria || 'all';
    
    const result = await prisma.productofinal.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: {
        prefijo: sede as string,
        nuevo: { gt: 0 },
        estado: 'true',
        ...(categoria !== 'all' && { categoria: categoria as string }),
      },
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: message });
  }
};