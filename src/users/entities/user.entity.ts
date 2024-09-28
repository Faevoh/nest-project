import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'User Id',
        example: 'f2b440a9-2a00-41c0-bafc-dbdbbb354fc1'
    })
    id: string;

    @Column()
    @ApiProperty({
        description: 'User first name',
        example: 'Daniel'
    })
    firstName: string;

    @Column()
    @ApiProperty({
        description: 'User last name',
        example: 'Fola'
    })
    lastName: string;

    @Column({unique: true})
    @ApiProperty({
        description: 'User email',
        example: 'danielfola@gmail.com'
    })
    email: string;

    @Column()
    @ApiProperty({
        description: 'User password',
        example: '$2a$10$xwaiklQ/PYDd1YsjZULwTuHymlp/cwYTIXRChVAt3dxaVR0P1gfDi'
    })
    password: string;

    @Column()
    phone: string

    @Column({default: "user"})
    @ApiProperty({
        description: 'User role by default',
        example: 'user'
    })
    role: "admin" | "user";

    @OneToMany( () => ProductEntity, (ProductEntity) => ProductEntity.user)
    product: ProductEntity[];

    @CreateDateColumn({type: 'timestamp'})
    @ApiProperty({
        description: 'when user was created'
    })
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    @ApiProperty({
        description: 'when user was updated'
    })
    updatedAt: Date;
}

