// import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient;
// declare global{
//     namespace NodeJS{
//         interface Global{
//             prisma:PrismaClient
//         }
//     }
// }

// if(process.env.NODE_ENV === "production"){
//     prisma = new PrismaClient();
// }else{
//     if (!global.prisma){
//         global.prisma = new PrismaClient()
//     }
//     prisma = global.prisma
// }

// export default prisma
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
