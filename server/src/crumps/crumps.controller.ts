import { Controller } from '@nestjs/common';
import { CrumpsService } from './crumps.service';

@Controller('crumps')
export class CrumpsController {
  constructor(private readonly crumpsService: CrumpsService) {}
}
