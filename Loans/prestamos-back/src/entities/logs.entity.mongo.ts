import {
    Entity,
    Column,
    BaseEntity,
    ObjectID,
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('logs')
export class Logs extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ type: 'varchar', length: 150, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    description: string;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date;
}
