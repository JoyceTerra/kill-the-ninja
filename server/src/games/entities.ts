import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type Symbol = 'nA' | 'nB'
export type Row = [ 
  Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null,
  Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null,
  Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null,
  Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null,
  Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null,
  Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null,
  Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null,
  Symbol | null, Symbol | null, Symbol | null, Symbol | null, Symbol | null
]
export type Board = [ 
  Row, Row, Row, Row, Row, 
  Row, Row, Row, Row, Row
]

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null,
  null, null, null, null, null
]
const emptyBoard: Board = [
  emptyRow, emptyRow, emptyRow, emptyRow, emptyRow,
  emptyRow, emptyRow, emptyRow, emptyRow, emptyRow
]

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:2, default: 'nA'})
  turn: Symbol

  @Column('char', {length:2, nullable: true})
  winner: Symbol

  @Column('text', {default: 'pending'})
  status: Status
  
  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'symbol'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column('char', {length: 2})
  symbol: Symbol

  @Column('char', {length: 5, default: '0-0'})
  currentPosition: string
}
