// TODO: implement generic repository

// import { PrismaClient,Prisma, User } from '@prisma/client';
// import { Injectable } from "@nestjs/common";
// import { IGenericRepository } from "src/core/abstracts";


// @Injectable()
// export class PosgreSQLGenericRepository<T> implements IGenericRepository<T> {
//   private _repository: Prisma.Args<'user', any>


//   async get(id: number): Promise<T> {
//     try {
//       return await this._repository.user.findUnique({ where: { id } }) as T
//     } catch (err) {
//       return err
//     }
//   }

//   async update(id: number, item: T): Promise<T> {
//     try {
//       return await this._repository.user.update({ where: { id }, data: item }) as T
//     } catch (err) {
//       return err
//     }
//   }

//   async create(item: T): Promise<T> {
//     try {
//       return await this._repository.user.create({ data: item }) as T
//     } catch (err) {
//       return err
//     }
//   }
// }