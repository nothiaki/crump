import { CrumpEntity } from '../entities/crump.entity';

export class ResponseCrumpDto {
  content: string;
  id: number;
  uncrumps: number;
  createdAt: Date;
  from: {
    email: string;
    name: string;
  };

  constructor(crump: Partial<CrumpEntity>) {
    this.content = crump.content;
    this.id = crump.id;
    this.uncrumps = crump.uncrumps;
    this.createdAt = crump.createdAt;
    this.from = {
      email: crump.from.email,
      name: crump.from.name,
    };
  }
}
