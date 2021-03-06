import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";

@Entity()//It creates a table called 'coffee'
export class Coffee{
    @PrimaryGeneratedColumn()//It sets this column as primary key and increments the values automatically
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    brand: string;

    @Column()
    recommendations: number;
    
    @JoinTable()
    @ManyToMany(type => Flavor, flavor => flavor.coffees, { cascade: true,})
    flavors: Flavor[];
}