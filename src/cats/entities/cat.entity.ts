import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Cat {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @ManyToOne(() => Breed, (breed) => breed.id, {
        // Cascade: true
        eager: true,
    })
    breed: Breed;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;
}
