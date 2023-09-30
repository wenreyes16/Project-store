import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Marca } from './marca.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Modelo {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id?: number;

  @Column({ type: 'int8', nullable: false })
  marca_id: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'int8', nullable: false })
  user_id: string;

  @ManyToOne(()=> Marca)
  @JoinColumn({
    name:'narca_id',
    referencedColumnName:'id'

  })
  marca:Marca;

  @ManyToOne(()=> User)
  @JoinColumn({
    name: 'user_id', 
    referencedColumnName: 'id'

  })
  autor: User;
}
