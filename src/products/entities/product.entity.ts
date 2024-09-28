import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'Product Id',
        example: 'f2b440a9-2a00-41c0-bafc-dbdbbb354fc1'
    })
    id: string;

    @Column()
    @ApiProperty({
        example: 'Stick Notes'
    })
    name: string;

    @Column()
    @ApiProperty({
        example: '100 pieces of coloured sticky notes'
    })
    description: string

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    @ApiProperty({
        example: '3500.00'
    })
    price: string

    @Column()
    userId: string

    @ManyToOne( () => UserEntity, (UserEntity) => UserEntity.product, {onDelete: "CASCADE"})
    user: UserEntity

    @CreateDateColumn({type: 'timestamp'})
    @ApiProperty({
        description: 'when product was added'
    })
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    @ApiProperty({
        description: 'when product was updated'
    })
    updatedAt: Date;
}
