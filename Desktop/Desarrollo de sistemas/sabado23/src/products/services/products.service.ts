import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';
import { ProductImage } from '../entities/product-image.entity';
@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,

        @InjectRepository(ProductImage)
        private productImageRepo: Repository<ProductImage>,

        private readonly dataSource: DataSource,
    ){}

    // async create(createProductDto:CreateProductDto){
    //     const product = this.productRepo.create(createProductDto);
    //     await  this.productRepo.save(product);
    //     return product;
    // }

    async create (productDto: CreateProductDto){
        const {images = [], ...detailProducts} = productDto;
        const product = await this.productRepo.create({
            ...detailProducts,
            images:images.map((image) => this.productImageRepo.create({url:image}))
        })

        await this.productRepo.save(product);
        return product;
    }

    //Encontrar un registro
    findOne(id: number){
        return this.productRepo.findOne({
            where:{id},
            relations:{
                autor:true,
                categoria:true,
                proveedor:true
            }
        });
    }
    //mostrar todos los registros
    findAll(){
        return   this.productRepo.find({
            order: {id: 'ASC'},
                relations:{
                autor:true,
                categoria:true,
                proveedor:true,
                images:true
            }
        });
    }
    //eliminar un registro
    async remove(id:number){
        const product =await this.findOne(id);
        await this.productRepo.remove(product);
        return 'Producto eliminado';
    }

    //actualizar un registro
    // async update(id: number, cambios: CreateProductDto){
    //     const oldProduct = await this.findOne(id);
    //     const updateProduct = await this.productRepo.merge(oldProduct, cambios);
    //     return this.productRepo.save(updateProduct);
    // }

    async update(id: number, productDto: CreateProductDto){
        const {images, ...updateAll} = productDto
        const product = await this.productRepo.preload({
            id:id,
            ... updateAll
        });

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        if(images){
            await queryRunner.manager.delete(ProductImage, {product: {id}});

            product.images = images.map((image)=>
                this.productImageRepo.create({url: image}),
            )

        }else{
            product.images =await this.productImageRepo.findBy({ product: {id}});
        }

        await queryRunner.manager.save(product);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        return product;
    }

}