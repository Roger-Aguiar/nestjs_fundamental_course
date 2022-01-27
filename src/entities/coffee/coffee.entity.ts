import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()//It creates a table called 'coffee'
export class Coffee{
    @PrimaryGeneratedColumn()//It sets this column as primary key and increments the values automatically
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    brand: string;
    
    @Column('json', {nullable: true})
    flavors: string[];
}