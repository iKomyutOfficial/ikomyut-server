import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { VersionsService } from './versions.service';
import { Versions } from '../schemas/versions.schema';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

@ApiTags('Versions') // Group in Swagger UI
@Controller('versions')
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new app version' })
  @ApiResponse({
    status: 201,
    description: 'Version successfully created.',
    type: Versions,
  })
  @ApiBody({ type: CreateVersionDto })
  create(@Body() createVersionDto: CreateVersionDto): Promise<Versions> {
    return this.versionsService.create(createVersionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all app versions' })
  @ApiResponse({
    status: 200,
    description: 'List of all versions.',
    type: [Versions],
  })
  findAll(): Promise<Versions[]> {
    return this.versionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a version by ID' })
  @ApiParam({ name: 'id', description: 'Version ID' })
  @ApiResponse({ status: 200, description: 'Version found.', type: Versions })
  @ApiResponse({ status: 404, description: 'Version not found.' })
  findOne(@Param('id') id: string): Promise<Versions> {
    return this.versionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a version by ID' })
  @ApiParam({ name: 'id', description: 'Version ID' })
  @ApiBody({ type: UpdateVersionDto })
  @ApiResponse({ status: 200, description: 'Version updated.', type: Versions })
  @ApiResponse({ status: 404, description: 'Version not found.' })
  update(
    @Param('id') id: string,
    @Body() updateVersionDto: UpdateVersionDto,
  ): Promise<Versions> {
    return this.versionsService.update(id, updateVersionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a version by ID' })
  @ApiParam({ name: 'id', description: 'Version ID' })
  @ApiResponse({ status: 200, description: 'Version deleted.', type: Versions })
  @ApiResponse({ status: 404, description: 'Version not found.' })
  remove(@Param('id') id: string): Promise<Versions> {
    return this.versionsService.remove(id);
  }
}
