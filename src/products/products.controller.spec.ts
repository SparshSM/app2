/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { ProductsService } from "./products.service";
import { getModelToken } from "@nestjs/mongoose";
import { ProductSchema, Product } from "./products.model";
import {ProductAlreadyExists} from "./product_exists.exception";
import {ProductDTOStub} from "./Product.dto.stub";



describe("ProductsController", () => {
    let ProdController: ProductsController;
    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;
    let ProdModel: Model<Product>;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoConnection = (await connect(uri)).connection;
        ProdModel = mongoConnection.model(Product.name, ProductSchema);
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                ProductsService, { provide: getModelToken(Product.name), useValue: ProdModel },
            ],
        }).compile();
        ProdController = app.get<ProductsController>(ProductsController);
    });
    afterAll(async () => {
        await mongoConnection.dropDatabase();
        await mongoConnection.close();
        await mongod.stop();
    });

    afterEach(async () => {
        const collections = mongoConnection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    });
    describe("addProds", () => {
        it("device", async () => {
          const prod_added = await ProdController.addProds(ProductDTOStub());
        expect(ProdController.prod_added()).toBe(ProductDTOStub());
        });
        it("should return (Bad Request - 400) exception", async () => {
          await (new ProdModel(ProductDTOStub()).save());
          await expect(ProdController.addProds(ProductDTOStub()))
            .rejects
            .toThrow(ProductAlreadyExists);
        });
       });
    describe("getAllProds", () => {
        it("should return the corresponding saved object", async () => {
          await (new ProdModel(ProductDTOStub()).save());
          const prod = await ProdController.getAllProds();
          expect(prod).toStrictEqual(ProductDTOStub());
        });
      });
});
